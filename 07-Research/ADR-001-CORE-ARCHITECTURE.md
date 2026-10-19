# Architecture Decision Record (ADR-001): Core Extension Architecture

- **Ticket Reference:** [[RES-016-approve-architecture-decision-record|RES-016]]
- **Status:** Approved / Accepted
- **Decider:** Hermes Agent / Lead Developer
- **Date:** 2026-10-19
- **Supersedes:** N/A (Foundational)

---

## 1. Context and Problem Statement

Automating media generation workflows across Google Gemini Chat and Google Flow requires coordinating user prompts, parameter configuration, DOM element interaction, progress tracking, and file downloads. The solution must run reliably in modern Chromium browsers, strictly comply with Chrome Web Store MV3 policies, protect user credentials, avoid duplicate paid credit deductions, and handle service worker sleep/termination gracefully.

---

## 2. Decision Drivers

1. **Manifest V3 Compliance:** Ephemeral event-driven background service worker with zero persistent in-memory background pages.
2. **Platform & Extension Safety:** No Chrome DevTools Protocol (`debugger`), no session cookie or token interception, and no private API reverse engineering.
3. **Financial Protection:** Google Flow deducts real user credits upon generation dispatch; duplicate submissions or blind retry loops are fatal errors.
4. **Reliable State Persistence:** Queue state, run logs, and asset metadata must survive browser restarts, tab crashes, and background worker sleeps.
5. **Developer Experience & Maintainability:** Strict static typing, modular adapter boundaries, and decoupled UI components capable of running against offline mock fixtures.

---

## 3. Evaluated Alternatives

### Option A: External Node.js / Python CLI Daemon with Puppeteer/Playwright
- **Pros:** Full headless automation, unrestricted filesystem access.
- **Cons:** Requires exporting Google cookies or credentials outside the browser (critical security risk); triggers Google bot-detection algorithms immediately; complex local installation for non-technical creators.
- **Verdict:** **Rejected** (Violates safety baseline and local-first browser companion posture).

### Option B: Chrome Extension using Chrome Debugger API (`chrome.debugger` / CDP)
- **Pros:** Simulates OS-level trusted input events.
- **Cons:** Displays permanent intrusive browser banner ("AI Media Automator is debugging this browser"); rejected by Chrome Web Store security reviews; introduces account ban risks.
- **Verdict:** **Rejected** (Prohibited anti-pattern).

### Option C: Vanilla JavaScript Manifest V3 Extension
- **Pros:** Zero bundle dependencies, minimal build tooling.
- **Cons:** Unmaintainable state synchronization across dual surfaces (Side Panel + Workspace); fragile ad-hoc message passing without schema guarantees; error-prone DOM rendering.
- **Verdict:** **Rejected** (High maintenance and bug risk).

### Option D (Chosen): Chrome MV3 Extension + React 18 / TypeScript / Vite + CRXJS
- **Pros:** Industry-standard reactive component architecture; strict TypeScript interfaces across IPC boundaries; instant HMR development via Vite/CRXJS; isolated world content scripts; robust transactional state management via IndexedDB.
- **Verdict:** **Approved / Selected**.

---

## 4. Key Architectural Decisions

### 4.1. Core Tech Stack
- **Extension Platform:** Chrome Manifest V3 (Chrome 116+ minimum for `chrome.sidePanel`).
- **Build System:** Vite 5 + `@crxjs/vite-plugin`.
- **UI Framework:** React 18 + Tailwind CSS + Lucide React Icons.
- **Type Safety & Validation:** TypeScript 5.x + Zod (for runtime validation of all IPC messages and stored schemas).
- **Persistence:**
  - `chrome.storage.local`: Lightweight settings, active tab locks, user presets (<10 MB).
  - `IndexedDB` (via `idb` wrapper): Transactional job queue, execution history ledger, asset metadata catalog.
  - Zero raw video/image binary storage in IndexedDB (prevents browser memory pressure).

### 4.2. Dual-Surface UI Separation
- **Side Panel (`sidepanel.html`):** Compact, context-aware co-pilot running beside active Gemini/Flow tabs. Optimized for single jobs, active queue monitoring, and immediate pause/resume.
- **Full-Page Workspace (`workspace.html`):** Multi-prompt bulk editor, CSV importer, asset gallery, audit reports, and advanced settings.

### 4.3. DOM Adapter Boundary and Selector Ladders
- Content scripts run in Chrome's **Isolated World**.
- DOM access is encapsulated in provider-specific adapters (`GeminiAdapter`, `FlowAdapter`).
- Every DOM query uses resilient fallback selector ladders (minimum 4 fallback candidates per interactive target).
- DOM inputs use synthetic trusted-like event sequences (`focus` -> `input` -> `change` -> `blur`) and settle gates before clicking triggers.

### 4.4. State Machine and Idempotency
- Queue state transitions strictly follow:
  `draft -> ready -> pending -> generating -> verifying -> downloaded`
- Fail-safe terminal states:
  - `needs-review`: Unverified DOM response, ambiguity, network drop, or CAPTCHA detected.
  - `policy-refusal`: Google safety/content moderation block.
  - `failed`: Terminal unrecoverable error prior to generation dispatch.
- **Strict Rule:** Any job that transitioned to `generating` will **never** be automatically retried. If state is ambiguous, it transitions to `needs-review`.

---

## 5. Architectural Sequence Diagrams

### Sequence A: Normal Video Generation & Monitored Download

```text
Creator         SidePanel/UI          Service Worker          Content Script (Flow)        Google Flow DOM
   │                  │                      │                         │                         │
   ├── Start Batch ──>│                      │                         │                         │
   │   (Pre-flight)   ├── Check Balance ────>│                         │                         │
   │                  │<── Balance OK ───────┤                         │                         │
   │                  ├── Send Job ─────────>│                         │                         │
   │                  │                      ├── Dispatch Task ───────>│                         │
   │                  │                      │                         ├── Fill Prompt & Settings>
   │                  │                      │                         ├── Click Generate ──────>│
   │                  │                      │                         │<── Generation Started ──┤
   │                  │                      │<── Status: generating ──┤                         │
   │                  │<── Update: gen ──────┤                         │                         │
   │                  │                      │                         │   [Async Server Render] │
   │                  │                      │                         │<── Video Rendered ──────┤
   │                  │                      │                         ├── Trigger Native DL ───>│
   │                  │                      │<── Status: dl_triggered ┤                         │
   │                  │                      ├── chrome.downloads.onChanged                      │
   │                  │                      │   [Track until complete]                          │
   │                  │                      ├── Save Asset Metadata to IDB                      │
   │                  │<── Update: complete ─┤                         │                         │
   │<─ Chime & Done ──┤                      │                         │                         │
```

### Sequence B: Interruption & Safe Recovery (`needs-review`)

```text
Creator         SidePanel/UI          Service Worker          Content Script (Flow)        Google Flow DOM
   │                  │                      │                         │                         │
   │                  │                      ├── Dispatch Task ───────>│                         │
   │                  │                      │                         ├── Click Generate ──────>│
   │                  │                      │                         │<── Tab Crashes / Closes ┼ [X]
   │                  │                      │ [Heartbeat Timeout]     │                         │
   │                  │                      ├── Mark Job: needs-review│                         │
   │                  │                      ├── Suspend Queue Cursor  │                         │
   │                  │<── Alert: Review ────┤                         │                         │
   │<─ Prompt User ───┤                      │                         │                         │
   │   "Check Flow tab. Did Job 3 spend credits?"                      │                         │
```

---

## 6. Consequences and Tradeoffs

- **Positive:**
  - 100% compliant with Chrome Web Store security guidelines.
  - Zero risk of exfiltrating Google account credentials or session cookies.
  - Reliable recovery across browser restarts and MV3 worker termination.
  - Zero runaway credit deductions.
- **Negative / Constraints:**
  - DOM changes by Google can break selector ladders (mitigated by offline fixtures, selector health telemetry, and fast patch updates).
  - Automation requires an open, visible tab (cannot run in true hidden headless background).
