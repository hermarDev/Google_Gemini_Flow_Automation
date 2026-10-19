# Upstream Audit: OmniImageAutoGen (fangwangme)

- **Ticket Reference:** [[RES-002-audit-omniimageautogen-repository|RES-002]]
- **Repository:** `https://github.com/fangwangme/OmniImageAutoGen` (formerly `GeminiAutoGen`)
- **Inspected Commit SHA:** `0e5cea3a3710129a3114422de03736776053f518` (Date: 2026-10-07)
- **Auditor:** Hermes Agent / Lead Developer
- **Audit Date:** 2026-10-19

---

## 1. Manifest V3 Permissions and Host Boundaries

Declared in `manifest.json`:
- `permissions`: `["activeTab", "scripting", "storage", "downloads", "tabs", "sidePanel"]`
- `host_permissions`: `["https://gemini.google.com/*"]`
- `web_accessible_resources`: `content.js`, `chunks/*.js` scoped to `https://gemini.google.com/*`
- `background`: Service worker module (`background.ts`)

### Security Evaluation
- **No Debugger Permission:** Unlike Flow Automator, OmniImageAutoGen does **not** request `debugger` or CDP privileges.
- **Strict Host Scope:** Restricted strictly to `gemini.google.com`, minimizing cross-origin exposure.
- **Side Panel Pattern:** Uses standard Chrome MV3 `side_panel` with an auxiliary options page.

---

## 2. Gemini Chat Locking and Context Isolation

- **File Reference:** `src/content/lockedUrl.ts`, `src/sidepanel/urlLock.ts`
- **Mechanism:**
  - Validates URL against regex `^https://gemini\.google\.com(/u/\d+)?/app/([a-zA-Z0-9_-]+)$`.
  - Rejects generic root path `gemini.google.com/app` to avoid uncontrolled prompt submission in ephemeral or default sessions.
  - Locks execution to an explicit conversation ID. If the user navigates away or switches chats, execution halts immediately with `validation.lockedUrl.mustSpecificConversation`.
- **Valuable Adoption:** This conversation locking pattern directly satisfies our requirement for thread safety and preventing cross-chat contamination.

---

## 3. History Settling and Generation Detection

- **File Reference:** `src/content/historySettle.ts`, `src/content/generationWait.ts`, `src/content/pageSelectors.ts`
- **Pre-Execution Baseline (History Settle):**
  - Before typing a new prompt, queries the DOM to record the count and hashes/keys of already-present generated image containers.
  - Ensures that older images in the chat history are not mistaken for the output of the current prompt.
- **Generation Observation:**
  - Waits for Gemini's prompt submission state to transition from sending -> thinking -> streaming -> settled.
  - Detects completion when the response element settles and a new image card appears exceeding the prior baseline count.
  - Implements watchdog timeouts (`watchdogPolicy.js`) to recover if the DOM gets stuck.

---

## 4. Full-Size Download and File Renaming Architecture

- **Mechanism:**
  - Triggers Gemini's native full-resolution download button directly in the web page DOM.
  - To achieve organized naming and target subfolders without browser download path restrictions, it combines:
    1. `showDirectoryPicker()` (File System Access API) stored in IndexedDB (`idb.js`) for source and output folders.
    2. Background polling worker that observes the downloaded file in the source directory, calculates file hash, verifies file size stabilization over time, and moves/writes it to the destination handle via `FileSystemFileHandle.createWritable()`.
- **Assessment for AI Media Automator:**
  - While creative, File System Access API handles in extension background workers can lose permission across browser restarts, prompting user re-authorization.
  - Our primary download architecture will use Chrome's standard `chrome.downloads` API with relative subfolder paths (e.g. `AI-Media-Automator/Gemini/...`), monitoring download events via `chrome.downloads.onChanged` for rock-solid reliability without external file handle prompts.

---

## 5. Build System, Type Safety, and Testing

- **Pipeline:**
  - Vite 5 + TypeScript 5.4 (`tsc --noEmit`).
  - Native Node.js test runner for BDD specifications (`node --test tests/bdd/**/*.test.mjs`).
  - Static asset copy script (`scripts/copy-static.mjs`).
- **Code Quality:** High modularity; strict domain separation across `content/`, `sidepanel/`, and `utils/`.

---

## 6. Licensing and Legal Status

- **`package.json` Status:** Declares `"private": true`.
- **Repository Root:** No `LICENSE` or `COPYING` file present in root or distribution files.
- **Legal Clearance:** Unverified. Direct code copying is strictly prohibited. Architectural lessons, state machines, and selector heuristics will be implemented in clean-room TypeScript.

---

## 7. Comparative Matrix: Reusable Concepts vs. Rejected Patterns

| Component / Technique | Upstream Pattern (OmniImageAutoGen) | AI Media Automator Policy | Decision |
|---|---|---|---|
| **Chat Locking** | Locks to `gemini.google.com/app/<id>` | Mandatory chat locking before prompt entry | **Adopt Concept** |
| **History Settling Gate** | Counts pre-existing images before generation | Pre-flight history snapshot to avoid false matches | **Adopt Concept** |
| **Download Trigger** | Clicks native high-res download button | Clicks native download button + direct asset URL fetch fallback | **Adopt & Enhance** |
| **File Persistence** | File System Access API (`showDirectoryPicker`) | `chrome.downloads` relative subfolder + event lifecycle | **Refine Architecture** |
| **Permissions** | Minimal MV3 permissions (`activeTab`, `storage`, `downloads`, `sidePanel`) | Minimal MV3 permissions, zero `debugger` | **Adopt Standard** |
| **Testing Harness** | Node native BDD tests + strict TypeScript | Vitest / Playwright + TypeScript strict | **Adopt Concept** |
| **Code Reuse** | Missing LICENSE, marked private | Clean-room implementation under project MIT | **Reject Code** |
