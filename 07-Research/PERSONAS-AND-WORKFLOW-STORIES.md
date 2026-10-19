# Personas and Workflow User Stories

- **Ticket Reference:** [[RES-011-define-personas-and-workflow-stories|RES-011]]
- **Auditor:** Hermes Agent / Lead Developer
- **Audit Date:** 2026-10-19
- **Status:** Complete / Baseline Established

---

## 1. Persona 1: Solo Content Creator (Maya)

- **Role & Profile:** Independent video creator producing short-form vertical content (TikTok, YouTube Shorts, Instagram Reels) on a strict monthly budget.
- **Primary Need:** Hands-off generation of short video batches (9:16 portrait, 10s Omni Flash) without manually waiting for each render or overspending credits.
- **Primary Outcome:** Submits a batch of 5–10 scripted scene prompts, receives organized video files in `Downloads/AI-Media-Automator/`, and consumes predictable credits.

### Normal Workflow Journey
1. **Setup:** Maya opens Google Flow in Chrome and signs into her project workspace.
2. **Launch:** Clicks extension icon to open the Chrome Side Panel.
3. **Queue Input:** Pastes 5 video scene descriptions into the queue manager.
4. **Configuration:** Selects Preset: **"Omni Flash 720p / 10s / 9:16"**.
5. **Cost Pre-Flight:** Extension calculates: `5 outputs × 15 credits = 75 credits`. Side panel displays total and checks against her balance of 250 credits.
6. **Execution:** Maya clicks "Start Batch". Extension sequences items one by one:
   - Sets prompt, confirms 9:16 ratio and 10s duration.
   - Triggers Generate, monitors progress until video element renders.
   - Automatically initiates download with structured filename (`Scene_01_Omni_9-16_10s.mp4`).
7. **Completion:** Batch finishes, sounds a gentle notification chime, and renders run summary.

### Interruption & Recovery Journey
- **Trigger:** Prompt #3 violates Google's automated moderation policy (e.g. sensitive keyword trigger).
- **Extension Reaction:**
  - Content script detects Google's policy alert toast (`[role="alert"]`).
  - Item #3 is immediately marked `policy-refusal`.
  - The batch execution **pauses automatically**; subsequent prompts are NOT submitted.
  - Maya receives an alert explaining the pause. She can edit prompt #3 or skip it and click "Resume".
  - Result: No credit loss on prompt #3; remaining batch preserved.

---

## 2. Persona 2: Batch Asset Producer (Carlos)

- **Role & Profile:** Creative director and digital artist generating concept artwork, character sheets, and animated B-roll.
- **Primary Need:** End-to-end Image-to-Video pipeline: generate character variants in Gemini Chat, curate the best output, and pipe it directly as a start frame into Google Flow `i2v`.
- **Primary Outcome:** High-volume image curation across Gemini Chat and Google Flow without manual file dragging or re-uploading.

### Normal Workflow Journey
1. **Gemini Image Batch:** Carlos opens a locked Gemini chat (`gemini.google.com/app/char-study-01`) and pastes 15 character concept prompts.
2. **Capture & Library:** Extension generates all 15 images in Gemini, triggers native full-size downloads, and records them in the local Media Library.
3. **Curation:** Carlos opens the extension's Full-Page Workspace (`chrome-extension://.../workspace.html`), reviews the thumbnails, and selects Image #4.
4. **Send to Motion Pipeline:** Clicks "Create Video from Asset". Extension automatically stages Image #4 as the starting frame for Google Flow Frame-to-Video (`i2v`).
5. **Flow Execution:** Extension opens Google Flow project tab, attaches Image #4 to the input frame dropzone, types motion prompt, verifies Omni Flash settings, and renders the video.

### Interruption & Recovery Journey
- **Trigger:** Browser tab crashes or WiFi disconnects while Google Flow is rendering Video #7.
- **Extension Reaction:**
  - The MV3 service worker recovers state from IndexedDB.
  - Job #7 is flagged as `needs-review` because the generation request was dispatched but terminal ack was never received.
  - The queue stops to prevent duplicate credit deduction.
  - Carlos is prompted: *"Job #7 was in-progress when connection was lost. Please check Google Flow canvas. Did the video complete?"*
  - Carlos clicks *"Mark Completed & Download"* or *"Retry Prompt"*.

---

## 3. Persona 3: AI Tooling Engineer / QA Tester (Alex)

- **Role & Profile:** Extension developer and automation engineer maintaining selector resilience, security baselines, and CI pipeline checks.
- **Primary Need:** Offline testability, deterministic error classification, mock adapters, and zero credential leakage.
- **Primary Outcome:** Verify extension state machine and DOM adapters without consuming real Google credits or touching live accounts.

### Normal Workflow Journey
1. **Mock Environment:** Alex opens Chrome with the development build.
2. **Adapter Toggle:** In Extension Settings, enables `Mock Adapter Mode` with recorded offline HTML fixtures.
3. **Queue Test Run:** Submits a 50-item synthetic stress-test queue.
4. **Verification:**
   - Validates that service worker suspends and resumes without losing IndexedDB queue pointers.
   - Exports the structured diagnostic JSON log.
   - Confirms that zero auth headers, cookies, or credentials were saved.

### Interruption & Recovery Journey
- **Trigger:** Google deploys an A/B test modifying the DOM class of the prompt textarea.
- **Extension Reaction:**
  - Resilient selector ladder attempts all 5 fallback candidates.
  - When all fail, the adapter halts cleanly with error `adapter-selector-drift`.
  - Extension captures a sanitized DOM snippet (excluding text/tokens) into the diagnostic log.
  - Alex inspects the log and updates `pageSelectors.ts` without runtime crash or unintended clicks.
