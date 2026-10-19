# Upstream Audit: Google Flow Automation (Shivanshu85)

- **Ticket Reference:** [[RES-003-audit-google-flow-automation-repository|RES-003]]
- **Repository:** `https://github.com/Shivanshu85/Google-Flow-Automation`
- **Inspected Commit SHA:** `f002984147d5475f15de6616f85dce15c22a8221` (Date: 2026-03-23)
- **Auditor:** Hermes Agent / Lead Developer
- **Audit Date:** 2026-10-19

---

## 1. Manifest V3 Permissions and Entry Architecture

Declared in `manifest.json`:
- `permissions`: `["storage", "downloads", "scripting", "activeTab", "tabs"]`
- `host_permissions`: `*://labs.google/*`, `*://*.labs.google/*`
- `background`: Service worker (`background.js`)
- `content_scripts`: `logic.js`, `content.js` injected at `document_idle` on `labs.google/fx/tools/flow*` and `labs.google/flow*`
- `action`: Browser action popup (`popup.html` / `popup.js`)
- `web_accessible_resources`: `styles.css`

### Structural Observations
- Relies on popup trigger rather than `sidePanel`. The popup opens an injected floating modal in the host DOM using `styles.css`.
- Injected DOM overlay pattern risks conflicting with Google Flow's internal styles and z-index layers. A native Chrome `sidePanel` is vastly superior for accessibility, layout stability, and user experience.

---

## 2. Multi-Mode Asset Matching and Generation Workflows

- **Supported Modes in `logic.js`:**
  - `t2v` (Text to Video)
  - `i2v` (Frame to Video / Start-End Frames)
  - `c2v` (Ingredients to Video / Asset Reference)
  - `t2i` (Text to Image)
  - `i2i` (Image to Image)
- **Asset Attachment:**
  - Dispatches files directly into Google Flow's hidden file inputs (`input[type="file"]`) via `DataTransfer` objects.
  - Distinguishes single image versus first/last frame pair (`imgOpt1` vs `imgOpt2`).
- **Reusability:** The mode classification (`t2v`, `i2v`, `c2v`, `t2i`, `i2i`) and file input drag/drop synthesis provide a valid reference for our Flow adapter.

---

## 3. Queue Controls and Dangerous Retry Logic

- **Queue Architecture:**
  - In-memory JavaScript array `queue = []` mirrored to `chrome.storage.local`.
  - Concurrency control defaults to 1 prompt at a time.
- **Dangerous Failure Pattern (REJECTED):**
  - Configured with `maxRetries: 20`.
  - When a prompt or generate action throws, the script automatically retries up to 20 times without verifying whether Google Flow deducted credits or queued the job in the background.
  - **Violation of Master Plan Rule #2 & #16:** "No duplicate paid submits: uncertain post-click state becomes needs-review for human reconciliation; no blind retries."
  - Blind retries in Google Flow can rapidly exhaust expensive Veo/Omni user credit budgets if the network acknowledgment is delayed.

---

## 4. Error Detection and Policy Monitoring

- **Error Detection Method in `content.js`:**
  - Inspects active alert elements: `document.querySelectorAll('[role="alert"], [role="status"], .toast, .snackbar, .error-box, .status-bar')`.
  - Matches keywords: `"policy" && "error"` -> flags "Policy Error", `"quota"` / `"credit"` -> flags "Out of Credits / Quota".
- **Limitation:**
  - Evaluates raw text on transient snackbars that may disappear before the poll tick.
  - Does not classify errors into recoverable vs fatal terminal states.

---

## 5. Download Handling Behavior

- **Mechanism in `background.js`:**
  - Background worker receives `{ action: "download", url, filename, projectName, quality }`.
  - Invokes `chrome.downloads.download({ url, filename: `${safeProject}/${filename}`, conflictAction: 'uniquify' })`.
  - Does not monitor `chrome.downloads.onChanged` for download progress or terminal success/failure.
- **Limitation:** Fails to verify MIME type or asset integrity on disk; premature UI completion before byte transfer finishes.

---

## 6. Licensing and Legal Audit

- **Repository Root Inspection:** Commit `f002984147d5475f15de6616f85dce15c22a8221`.
- **Finding:** While `README.md` states "License: MIT", there is **NO `LICENSE` or `COPYING` file present in the repository**.
- **Legal Clearance:** Unverified. Direct code copying prohibited. Workflow taxonomy and selector hints utilized for clean-room implementation.

---

## 7. Comparative Matrix: Reusable Concepts vs. Rejected Patterns

| Component / Technique | Upstream Pattern (Shivanshu85) | AI Media Automator Policy | Decision |
|---|---|---|---|
| **UI Surface** | Injected page floating overlay modal | Isolated Chrome MV3 Side Panel | **Reject Injected DOM UI** |
| **Workflow Modes** | Multi-mode (t2v, i2v, c2v, t2i, i2i) | Typed mode definitions and schemas | **Adopt Concept** |
| **Asset Matching** | File input injection via `DataTransfer` | Validated local asset attachment pipeline | **Adopt Concept** |
| **Error Handling** | Blind retry loop (up to 20 retries) | Strict idempotency guard; `needs-review` on ambiguity | **Reject Blind Retries** |
| **Error Scanning** | Alert role / snackbar keyword grep | Structured error classifier (Quota, Policy, Transient, Unknown) | **Adopt & Extend** |
| **Downloads** | Fire-and-forget `chrome.downloads.download` | Monitored `chrome.downloads.onChanged` lifecycle | **Redesign** |
| **Licensing** | Missing LICENSE file | Clean-room implementation under project MIT | **Reject Upstream Code** |
