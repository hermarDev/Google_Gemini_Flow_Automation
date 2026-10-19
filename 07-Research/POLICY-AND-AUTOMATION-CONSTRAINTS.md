# Policy Constraints and Permissible UI Automation Boundaries

- **Ticket Reference:** [[RES-006-review-google-ui-automation-and-policy-constraints|RES-006]]
- **Auditor:** Hermes Agent / Lead Developer
- **Audit Date:** 2026-10-19
- **Status:** Approved / Constraints Enforced

---

## 1. Regulatory and Policy Framework

The AI Media Automator extension operates under three overlapping regulatory frameworks:
1. **Chrome Web Store Developer Program Policies:**
   - Single Purpose Policy: Dedicated strictly to user-directed generative media batching and organization.
   - User Data Privacy & Minimal Permissions: Only declare permissions strictly required for core functionality; no credential harvesting, tracking, or unexpected data exfiltration.
   - Respect for Host Origins: No unauthorized modification of web service security controls, no bypassing paywalls, and no automated CAPTCHA solving.
2. **Google Terms of Service and Generative AI Additional Terms:**
   - Users are responsible for their generated content and prompt inputs.
   - Prohibits reverse engineering private APIs, evading rate limits, or bypassing account security controls.
   - Prohibits deceptive automation intended to disguise bot traffic as authentic human activity through debugger hooks or synthetic evasion scripts.
3. **Local-First Creator Autonomy:**
   - Automation acts solely as a productivity assistant (an "extended macro / queue manager") on behalf of the logged-in user in their own visible browser tab.

---

## 2. Permissible vs. Prohibited Automation Boundaries

| Dimension | Permissible Operational Boundaries (AI Media Automator) | Prohibited Mechanisms (Strictly Blocked) |
|---|---|---|
| **Authentication** | User logs into Google Gemini / Flow manually in standard browser tab. Extension accesses zero passwords or tokens. | Programmatic login, session hijacking, cookie extraction, OAuth Bearer token sniffing from network requests. |
| **DOM Interaction** | Standard DOM events (`click`, `input`, `change`) on user-visible elements in active tabs. | `chrome.debugger` attachment, low-level CDP event synthesis (`Input.dispatchMouseEvent`), synthetic evasion delays. |
| **Network Requests** | Direct user interaction with web page UI; media downloaded via official Google URLs through Chrome Downloads API. | Direct REST calls to undocumented/private internal endpoints (`aisandbox-pa.googleapis.com`), BFF session scraping. |
| **Security Challenges** | If Google presents a CAPTCHA, verification prompt, or policy block, the extension **pauses immediately** and alerts user. | Automated CAPTCHA solving, `grecaptcha` minting, third-party solving services, or invisible challenge bypass. |
| **Quota & Credits** | Re-reads available credits and model parameters from DOM before every generation; aborts if cost exceeds approved budget. | Silent model downgrade/upgrade, attempting to bypass credit deducts or quota gates. |
| **Error Handling** | Ambiguous generation outcomes halt to `needs-review` for user reconciliation; no automated repeated paid clicks. | Blind retry loops (e.g. retrying 20 times), hammering failed endpoints. |

---

## 3. Chrome Web Store Manifest V3 Permission Justification

To maintain compliance with the Chrome Web Store Minimal Permissions policy:

- `sidePanel`: Required to render the productivity queue, prompt manager, and settings alongside the user's active Google tab without injecting intrusive overlay DOM into the page.
- `storage`: Required to persist user presets, batch queues, and non-sensitive UI settings in `chrome.storage.local` and IndexedDB.
- `downloads`: Required to save completed full-resolution images and videos into an organized subfolder in the user's Downloads directory.
- `activeTab` / `tabs`: Required to detect whether the user is viewing a supported Gemini or Google Flow URL and handshake with the content adapter.
- `host_permissions` (`https://gemini.google.com/*`, `https://labs.google/*`): Scoped strictly to the target generative platforms; zero wildcards for all URLs (`<all_urls>`).

**Rejected Permissions:**
- `debugger`: Rejected. Triggers warning banner and violates security policy.
- `cookies`: Rejected. Eliminates risk of session token theft.
- `webRequest` / `declarativeNetRequest`: Rejected for credentials/interception.

---

## 4. Fail-Safe Behavior Specifications

When encountering unexpected conditions or provider changes, the extension must adhere to the following deterministic behaviors:
1. **Policy Refusal Detection:** If Google flags a prompt for content policy violation (e.g. toast alert or error dialog), the queue immediately marks that item `policy-refusal`, stops further submissions in that batch, and sounds an alert.
2. **Zero-Balance / Quota Exhaustion:** If credits drop to 0 or an out-of-credits modal appears, remaining batch items are transitioned to `paused-out-of-credits`.
3. **Ambiguous Ack (Crash / Reload / Drop):** If a generate request was dispatched but no confirmation or generation artifact is detected within the timeout window, the job is marked `needs-review`. Automated retries are prohibited.
4. **Selector Drift / Layout Mutation:** If expected DOM anchors are absent, the extension aborts execution gracefully, reporting `adapter-outdated` rather than clicking arbitrary elements.
