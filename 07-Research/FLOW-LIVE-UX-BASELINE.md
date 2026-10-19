# Google Flow Live UX Baseline and Selector Mapping

- **Ticket Reference:** [[RES-008-capture-google-flow-live-ux-baseline|RES-008]]
- **Auditor:** Hermes Agent / Lead Developer
- **Audit Date:** 2026-10-19
- **Platform:** Google Flow / Google Labs (`https://labs.google/fx/tools/flow` / `https://flow.google/*`)
- **Privacy Standard:** Redacted baseline; zero credentials, cookies, or user project data recorded.

---

## 1. Project Setup and URL Workspace Lifecycle

- **Entry URLs:**
  - `https://labs.google/fx/tools/flow`
  - `https://flow.google/*`
- **Project Structure:**
  - Generations occur inside a Project Canvas.
  - URL format: `https://labs.google/fx/tools/flow/project/<project_id>` or query parameter context.
- **Pre-flight Readiness:**
  - Verify that the active tab is at an open project canvas before attempting prompt injection.
  - Abort if on sign-in landing or projects directory without an active workspace.

---

## 2. Mode Architecture and Asset Inputs

Google Flow supports five distinct generative modes:
1. `t2v` (Text to Video): Prompt text -> Veo / Omni Flash video.
2. `i2v` (Frame to Video): Starting frame image (+ optional ending frame image) + prompt text.
3. `c2v` (Ingredients to Video): Reference character/asset images + prompt text.
4. `t2i` (Text to Image): Prompt text -> Nano Banana / Imagen image.
5. `i2i` (Image to Image): Source image + transformation prompt.

### Asset Attachment Mechanism
- Hidden file upload inputs: `input[type="file"]`.
- In standard DOM automation, files are attached by constructing `DataTransfer` objects containing `File` instances and dispatching `change` and `drop` events.
- Single versus First/Last Frame pairs require distinct input targets.

---

## 3. Prompt Composer and Model Controls

### Prompt Input Candidates
1. `textarea[aria-label*="prompt" i]`
2. `textarea[placeholder*="prompt" i]`
3. `textarea[placeholder*="Describe" i]`
4. `div[contenteditable="true"][role="textbox"]`
5. `div[data-slate-string="true"]` (Slate editor parent container)
6. Generic `textarea` within the composer panel

### Model Selector and Setting Buttons
- Mode and model options are rendered as button/tab groups or popup dropdowns:
  - Model options: `Gemini Omni Flash 1.1`, `Veo 3.1 Fast`, `Veo 3.1 Lite`, `Veo 3.1 Quality`, `Nano Banana Pro / 2.1`.
  - Aspect ratio toggles:
    - `16:9` (Landscape)
    - `9:16` (Portrait)
    - `1:1` (Square)
  - Duration selector: `4s`, `6s`, `8s`, `10s` (Note: 10s is valid ONLY for Omni Flash).
  - Variations / Output count: `1`, `2`, `3`, `4`.

---

## 4. Generation Lifecycle and Completion Gates

### Generate Button Identification
- Primary candidates:
  - `button[aria-label*="Generate" i]`
  - Buttons matching text `/^Generate/i`
- Disabled state checks:
  - `button:disabled`
  - `button[aria-disabled="true"]`
  - Class markers: `.disabled`, `.is-loading`

### Status Monitoring and Terminal States
1. **Generating:** Canvas shows progress spinners, rendering percentage, or skeleton cards.
2. **Success:** A new `video` element (with `<source>` or blob/CDN URL) or `img[src*="googleusercontent"]` card appears.
3. **Policy Error:** Toast/dialog with role `alert` containing "policy", "safety", or "terms".
4. **Quota / Credit Exhaustion:** Toast/modal containing "credit", "quota", or "insufficient".
5. **Timeout / Ambiguity:** If generation exceeds timeout without a clear error or output artifact, state transitions to `needs-review`.

---

## 5. Media Download Behavior

- Download triggers on output cards:
  - `a[download]`
  - `button[aria-label*="Download" i]`
  - Direct video source extraction: querying `video.currentSrc` or `source.src` and dispatching via `chrome.downloads.download`.
- Verification requires monitoring `chrome.downloads.onChanged` until `state === "complete"`.

---

## 6. Repeatable Test Checklist: 9:16 vs. 16:9 Verification

| Step | Aspect Ratio: 9:16 (Portrait) | Aspect Ratio: 16:9 (Landscape) | Acceptance Rule |
|---|---|---|---|
| **1. UI Toggle** | Click `9:16` / Portrait ratio button | Click `16:9` / Landscape ratio button | Verify button aria-pressed / active class updates |
| **2. Prompt Injection** | Input test prompt: `[TEST 9:16] A lone lighthouse` | Input test prompt: `[TEST 16:9] A wide mountain vista` | Verify editor content matches exact test string |
| **3. Pre-Click Verification** | Read back ratio label: must equal `9:16` | Read back ratio label: must equal `16:9` | Mismatch aborts before click |
| **4. Output Detection** | Card element dimensions: aspect ratio height > width | Card element dimensions: aspect ratio width > height | Verify rendered aspect ratio matches requested geometry |
| **5. Download Naming** | Filename contains `_9-16_` tag | Filename contains `_16-9_` tag | File saved in corresponding project subfolder |
| **6. Idempotency Check** | Generate button click recorded once with intent hash | Generate button click recorded once with intent hash | No duplicate submit permitted |
