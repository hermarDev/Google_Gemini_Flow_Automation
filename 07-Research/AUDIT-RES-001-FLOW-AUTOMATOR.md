# Upstream Audit: Flow Automator (ART-TECH-FUZION)

- **Ticket Reference:** [[RES-001-audit-flow-automator-repository|RES-001]]
- **Repository:** `https://github.com/ART-TECH-FUZION/google-flow-automator`
- **Inspected Commit SHA:** `25eecee86c25123dac6cd46871c37cf51bd0db5d` (Date: 2026-08-16)
- **Auditor:** Hermes Agent / Lead Developer
- **Audit Date:** 2026-10-19

---

## 1. Manifest V3 Permissions and Host Declarations

Declared in `manifest.json`:
- `permissions`: `["storage", "downloads", "tabs", "sidePanel", "debugger"]`
- `host_permissions`:
  - `https://labs.google/*`
  - `https://flow.google/*`
  - `https://*.googleusercontent.com/*`

### Architectural and Security Assessment
- **`debugger` permission (REJECTED):** The extension requests `debugger` in MV3 to attach the Chrome DevTools Protocol (`1.3`) to user tabs. This displays a persistent yellow debugging banner across the browser, creates significant security risks (potential arbitrary code/script injection into authenticated origins), and violates Web Store trust standards.
- **`host_permissions`:** Broad host permissions for Google domains allow direct content script injection and credentialed fetches.

---

## 2. UI Interaction Flow and Automation Mechanism

- **Side Panel (`sidepanel.html` / `sidepanel.js`):** Provides a prompt textarea, model select, aspect ratio buttons, variation count, and delay inputs. User triggers generation via UI button.
- **Message Protocol:** Sidepanel sends messages to `background.js` via `chrome.runtime.sendMessage`.
- **Background Worker (`background.js`):**
  - Manages `ensureAttached(tabId)` using `chrome.debugger.attach({ tabId }, '1.3')`.
  - Dispatches `Input.dispatchMouseEvent` (`mousePressed`, `mouseReleased`) on specified coordinates for `TRUSTED_CLICK`.
  - Dispatches `Input.dispatchKeyEvent` (`keyDown`, `keyUp`) for `TRUSTED_KEY`.
- **Content Script (`content.js`):**
  - Uses DOM scraping to calculate bounding client rects (`getBoundingClientRect`) of target elements.
  - Passes coordinates to `background.js` to execute CDP synthetic clicks.
  - Uses arbitrary `sleep(ms)` and `rand(min, max)` delays to pace requests.

---

## 3. Persistence Architecture

- Uses `chrome.storage.local` to store:
  - Prompt queue and index.
  - Configuration settings (min/max delays, aspect ratio, variations).
- **Flaws & Fragility:**
  - Lacks transactional state machine or event-driven recovery.
  - When the MV3 service worker goes inactive during long generation wait cycles, transient progress state can desynchronize.
  - No IndexedDB persistence or immutable audit log.

---

## 4. Download Handling Behavior

- **Implementation in `background.js`:**
  - Receives `DOWNLOAD_MEDIA` message with target media URL.
  - Attempts `fetch(url, { credentials: 'include' })` to obtain a Blob.
  - Converts Blob to object URL with `URL.createObjectURL(blob)`.
  - Calls `chrome.downloads.download({ url, filename, saveAs: false, conflictAction: 'uniquify' })`.
  - Sets an arbitrary timeout `setTimeout(() => URL.revokeObjectURL(url), 120000)` to revoke the blob.
- **Deficiencies:**
  - Does not monitor `chrome.downloads.onChanged` to verify that the download completed, was interrupted, or failed.
  - Blindly revokes the object URL after 2 minutes regardless of download state.
  - No checksum, MIME-type, or byte-size validation.

---

## 5. Selector Robustness and Failure Modes

The content script relies heavily on brittle heuristic matching:
- **Heuristic panel detection:**
  - `d.textContent.includes('Image') && d.textContent.includes('Video') && (d.textContent.includes('16:9') || d.textContent.includes('9:16')) && d.querySelectorAll('button').length >= 4`
- **Slate editor discovery:**
  - `box.querySelector('[data-slate-string="true"]')`
- **Icon matching:**
  - Regex test on icon text: `/crop_(16_9|9_16|square)/.test(...)`
- **Impact:** Any Google UI styling tweak, localized language string, or layout refactor immediately breaks the selector heuristics without graceful degradation.

---

## 6. Anti-Detection and Evasion Techniques (REJECTED)

- Relies on randomized sleep timers (`rand(15000, 30000)`) labeled "Anti-detection delays".
- Uses CDP debugger input events to simulate trusted human input.
- **Decision:** **Strictly Rejected.** In accordance with `AGENTS.md` and `MASTER-PLAN.md`, our extension will not perform anti-detection evasion, browser fingerprint manipulation, or CDP debugger attachment. All automation must use standard, supported DOM events on user-visible active tabs.

---

## 7. Licensing and Intellectual Property Audit

- **Repository Root Inspection:** Checked commit `25eecee86c25123dac6cd46871c37cf51bd0db5d`.
- **Finding:** While `README.md` states "License: MIT", there is **NO `LICENSE` or `COPYING` file present in the repository root or codebase**.
- **Legal Clearance:** Unverified. Under standard copyright law, absent a clear license grant file, code cannot be directly copied.
- **Disposition:** Ideas and structural lessons only. Zero code copied.

---

## 8. Comparative Matrix: Reusable Concepts vs. Rejected Patterns

| Component / Technique | Upstream Pattern (Flow Automator) | AI Media Automator Policy | Decision |
|---|---|---|---|
| **Extension Shell** | MV3 Side Panel (`sidePanel` API) | Side Panel + Full-page Workspace | **Adopt Concept** |
| **Input Automation** | `chrome.debugger` CDP Input dispatch | Standard DOM dispatch (`dispatchEvent`, user events) | **Reject CDP** |
| **Delays** | Randomized "anti-detection" timers | User-configured pacing & queue control | **Reject Evasion** |
| **Selectors** | Hardcoded text substring & button count checks | Semantic attributes, resilient fallback ladder | **Redesign** |
| **Downloads** | Credentialed fetch + unverified blob download | Managed `chrome.downloads` lifecycle with event tracking | **Redesign** |
| **State Storage** | Flat `chrome.storage.local` keys | Typed schema with IndexedDB durable queue | **Redesign** |
| **Licensing** | Missing LICENSE file | Clean-room implementation, MIT licensed | **Reject Upstream Code** |
