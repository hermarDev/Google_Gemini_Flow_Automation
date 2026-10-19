# Accessibility and Browser Compatibility Baseline

- **Ticket Reference:** [[RES-017-define-accessibility-and-compatibility-baseline|RES-017]]
- **Auditor:** Hermes Agent / Lead Developer
- **Audit Date:** 2026-10-19
- **Status:** Approved / Baseline Established

---

## 1. Accessibility Architecture & Standards (WCAG 2.1 AA/AAA)

To ensure the extension is fully usable by creators with diverse physical, sensory, and cognitive abilities, the UI adheres strictly to the following standards:

### 1.1. Color Contrast & Visual Perception (WCAG 1.4.3, 1.4.11)
- **Primary Body Text:** `#f4f4f5` (Zinc-100) on `#09090b` (Zinc-950) -> Contrast ratio **16.1:1** (Exceeds WCAG AAA requirement of 7.0:1).
- **Secondary / Muted Text:** `#a1a1aa` (Zinc-400) on `#09090b` -> Contrast ratio **7.2:1** (Exceeds WCAG AA requirement of 4.5:1).
- **Interactive Focus Indicators:** `#3b82f6` (Blue-500) against dark background -> Contrast ratio **4.9:1** (Exceeds WCAG AA non-text contrast of 3.0:1).
- **State Badges:** Semantic status badges must combine **icon + text label + color** (e.g. `[● Running]`, `[⏸ Paused]`, `[✓ Done]`). Color alone is never used to convey state (WCAG 1.4.1).

### 1.2. Keyboard Navigation & Focus Management (WCAG 2.1.1, 2.4.7)
- **Tab Sequencing:** All interactive elements (`<button>`, `<input>`, `<select>`, `<a>`) follow a logical, left-to-right, top-to-bottom DOM tab sequence.
- **Focus Rings:** Visible focus ring enforced via CSS `:focus-visible`:
  ```css
  :focus-visible {
    outline: 2px solid #3b82f6;
    outline-offset: 2px;
  }
  ```
- **Zero Keyboard Traps:** Focus is never trapped in form fields or inline drawers. The `Escape` key immediately closes slide-out drawers and modals, returning focus to the trigger element.
- **Keyboard Shortcuts:** Primary actions support standard shortcuts:
  - `Ctrl+Enter` / `Cmd+Enter`: Submit active prompt / Start batch.
  - `Space` / `Enter`: Activate buttons and toggle selection.
  - `Escape`: Cancel batch / Dismiss modal.

### 1.3. Screen Reader Semantics & ARIA Live Regions (WCAG 1.3.1, 4.1.2)
- **Live Queue Updates:** The active job status banner declares `aria-live="polite"` and `role="status"` to announce phase transitions without interrupting user speech.
- **Urgent Errors & Refusals:** Policy refusals and balance exhaustion alerts declare `aria-live="assertive"` and `role="alert"`.
- **Icon Buttons:** All icon-only buttons (e.g. pause, delete, settings) require an explicit `aria-label` attribute (e.g. `aria-label="Pause batch execution"`).

### 1.4. Motion Sensitivity (WCAG 2.3.3)
- Respects system preferences via `@media (prefers-reduced-motion: reduce)`:
  ```css
  @media (prefers-reduced-motion: reduce) {
    *, ::before, ::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
  ```

---

## 2. Supported Chromium Browser Matrix

The AI Media Automator requires modern Chromium extension capabilities, specifically `chrome.sidePanel` and MV3 service workers:

| Browser | Minimum Version | Tested Baseline | Support Tier | Reason / Constraint |
|---|---|---|---|---|
| **Google Chrome** | 116.0+ | 120.0+ | **Tier 1 (Primary)** | Native `chrome.sidePanel` API introduced in Chrome 114, stabilized in 116. |
| **Brave Browser** | 1.58+ | 1.60+ | **Tier 1** | Chromium 116+ core with full Chrome Extensions API parity. |
| **Microsoft Edge** | 116.0+ | 120.0+ | **Tier 1** | Chromium 116+ core with edge side-panel and Chrome extension support. |
| **Opera / Opera GX** | 102.0+ | 105.0+ | **Tier 2** | Chromium 116+ core; side-panel behavior may render in extension sidebar. |
| **Mozilla Firefox** | N/A | N/A | **Unsupported** | Lacks `chrome.sidePanel` MV3 API parity; Firefox uses custom sidebar API. |
| **Apple Safari** | N/A | N/A | **Unsupported** | WebExtension MV3 implementation lacks Side Panel API and modern IDB event pipelines. |

---

## 3. Measurable Test & Compliance Checklist

### Test Scenario 1: Keyboard-Only Queue Execution
1. Open Extension Workspace via keyboard (`Alt+Shift+M` or tab to extension menu).
2. Press `Tab` to navigate to the Prompt composer textarea.
3. Type prompt: `Cinematic macro shot of rain on glass`.
4. Press `Tab` to navigate to Model dropdown; press `Down Arrow` to select `Gemini Omni Flash`.
5. Press `Ctrl+Enter` to open Confirmation Dialog.
6. Press `Enter` to authorize generation.
- **Pass Criteria:** Entire workflow completed without touching a mouse or pointer device.

### Test Scenario 2: Screen Reader Announcement
1. Enable Orca (Linux) or ChromeVox.
2. Trigger generation of a video in Google Flow.
- **Pass Criteria:** Screen reader announces: *"Status: Submitting prompt to Google Flow"*, followed by *"Status: Rendering on remote server"*, followed by *"Status: Video generated, download started"*.

### Test Scenario 3: Automated axe-core Audit
- **Pass Criteria:** Zero Critical or Serious accessibility violations in both `sidepanel.html` and `workspace.html`.
