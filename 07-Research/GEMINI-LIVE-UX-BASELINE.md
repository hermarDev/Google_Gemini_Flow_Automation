# Google Gemini Live UX Baseline and Selector Mapping

- **Ticket Reference:** [[RES-007-capture-google-gemini-live-ux-baseline|RES-007]]
- **Auditor:** Hermes Agent / Lead Developer
- **Audit Date:** 2026-10-19
- **Platform:** Google Gemini Web App (`https://gemini.google.com/app/*`)
- **Privacy Standard:** Redacted baseline; zero credentials, cookies, or user chat data recorded.

---

## 1. Conversation Identity and URL Architecture

- **Host Scope:** `https://gemini.google.com`
- **Canonical Conversation URL:** `https://gemini.google.com/app/<conversation_id>`
  - Account prefix variation: `https://gemini.google.com/u/<account_index>/app/<conversation_id>`
- **Uncontrolled Entry Path:** `https://gemini.google.com/app` (generic root)
- **Locking Rule:**
  - Automation must strictly require a specific `<conversation_id>`.
  - Submitting prompts at the generic `/app` endpoint risks creating new fragmented chats, losing prompt context, and cross-thread pollution.
  - The content script must continuously verify `location.href` matches the locked conversation URL before and during every prompt injection.

---

## 2. Input Prompt Controls and Typing Lifecycle

Gemini uses a rich contenteditable Quill-based text composer (`rich-textarea`).

### Candidate Selectors (Resilient Fallback Ladder)
1. `.ql-editor.textarea[contenteditable="true"]`
2. `.ql-editor[contenteditable="true"]`
3. `div[role="textbox"][contenteditable="true"]`
4. `rich-textarea .ql-editor[contenteditable="true"]`
5. `[aria-label="Enter a prompt here"]`
6. `[data-placeholder="Describe your image"]`

### Injection and Input Event Handling
- Direct `element.textContent = prompt` or `element.innerText = prompt` is insufficient; Quill's internal Delta store does not update without synthetic input events.
- **Required DOM sequence:**
  1. Focus the element: `inputEl.focus()`.
  2. Select all existing text: `document.execCommand('selectAll', false, null)`.
  3. Insert text cleanly: `document.execCommand('insertText', false, promptText)`.
  4. Dispatch standard events: `inputEl.dispatchEvent(new Event('input', { bubbles: true }))` and `change`.
  5. Verify non-empty state in editor before proceeding to submit.

---

## 3. Submission and Stream State Indicators

### Send Button Candidates
1. `button[aria-label="Send message"]`
2. `button.send-button`
3. `button.submit`
4. `button[mattooltip="Send message"]`

### Stream & Processing State
- When active, Gemini replaces or toggles the send button to a "Stop responding" button:
  - `button[aria-label="Stop responding"]`
  - `button[mattooltip="Stop responding"]`
- In-progress generation indicators:
  - `[aria-busy="true"]`
  - `.loading-spinner`
  - `.skeleton-loader`
  - `.mat-progress-spinner`
- **Completion Gate:**
  - Generation is considered complete when "Stop responding" disappears, `aria-busy` clears, and the target response container contains a settled media element.

---

## 4. Generated Image DOM Discovery and Full-Size Download

### Generated Image Elements
- Within the model response container (`model-response`, `.response-container`):
  - `single-image img`
  - `generated-image img`
  - `img[src*="googleusercontent"]`
  - Ignore non-generated thumbnails or UI icons (`height/width <= 100px`).

### High-Resolution Download Trigger
- Gemini provides a dedicated client-side download action:
  - `download-generated-image-button button`
  - `button[aria-label*="Download"]`
  - `button[mattooltip*="Download"]`
  - `button[data-test-id*="download"]`
- Clicking this native button triggers the browser's download manager for the raw 1024x1024 / full-resolution asset.

---

## 5. Pre-Flight History Settle Gate (Anti-False-Positive Guard)

To avoid mistaking an existing historical image for a newly requested image:
1. **Pre-flight count:** Before prompt insertion, query `querySelectorAll('single-image img, generated-image img')` to establish baseline count $N$.
2. **Post-submission gate:** After submission, wait until generation indicators settle AND image count reaches $\ge N + 1$.
3. **Anchor binding:** Associate the new image with the unique timestamp or text marker of the submitted prompt card (`user-query`).

---

## 6. Error & Safety Refusal Patterns

- Toast notifications / Error cards:
  - Content safety refusal: `"I can't generate images of..."`, `"policy"`, `"safety filter"`
  - Rate limit refusal: `"You've reached your limit"`, `"try again later"`
- When detected, the adapter halts and classifies the item as `policy-refusal` or `rate-limit`, without retrying.
