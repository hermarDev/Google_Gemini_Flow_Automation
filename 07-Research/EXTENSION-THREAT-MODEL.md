# Extension Security Threat Model

- **Ticket Reference:** [[RES-015-draft-extension-threat-model|RES-015]]
- **Auditor:** Hermes Agent / Lead Developer
- **Audit Date:** 2026-10-19
- **Status:** Approved / Security Gates Enforced

---

## 1. System Boundaries and Trust Architecture

The AI Media Automator operates across four distinct privilege domains:

```text
┌────────────────────────────────────────────────────────────────────────┐
│                        UNTRUSTED WEB DOMAIN                            │
│  Google Gemini (gemini.google.com)  |  Google Flow (flow.google.com)   │
│  [Main World JS, Google BFF APIs, Dynamic Ad/Tracking Scripts]         │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ (Isolated World Boundary)
┌───────────────────────────────────▼────────────────────────────────────┐
│                    EXTENSION CONTENT SCRIPT DOMAIN                     │
│  [Isolated World, Read/Write Host DOM, Strictly Typed Message Port]    │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ (chrome.runtime / Port IPC)
┌───────────────────────────────────▼────────────────────────────────────┐
│                 PRIVILEGED EXTENSION BACKGROUND DOMAIN                 │
│  MV3 Service Worker, IndexedDB, chrome.storage, chrome.downloads       │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ (Extension Internal IPC)
┌───────────────────────────────────▼────────────────────────────────────┐
│                       USER INTERFACE DOMAIN                            │
│  Side Panel (sidepanel.html)  |  Full Workspace (workspace.html)       │
│  [Strict CSP: script-src 'self', no eval, no remote assets]            │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 2. STRIDE Threat Analysis Matrix

| Threat Category | Attack Vector & Scenario | Impact | Inherent Risk | Mitigations & Architectural Controls | Residual Risk |
|---|---|---|---|---|---|
| **Spoofing** | Rogue tab or iframe attempts to connect to extension background port posing as active Google Flow session. | Unauthorized queue triggers or state inspection. | High | - Sender origin verification in `chrome.runtime.onConnect`: tab URL must strictly match `https://flow.google.com/project/*` or `https://gemini.google.com/app/*`.<br>- Handshake nonces validated against active user-selected tab ID. | Low |
| **Tampering** | Main-world Google scripts or compromised 3rd-party dependencies modify Content Script DOM bridge. | Injected arbitrary prompt text or hijacked download triggers. | High | - Content script runs in Chrome's **Isolated World** (no shared window scope with page scripts).<br>- All IPC messages validated via strict `Zod` schemas.<br>- No `window.postMessage` used for extension IPC. | Low |
| **Repudiation** | User disputes credit consumption or unrecorded batch generation. | Financial ambiguity and mistrust. | Medium | - Pre-flight cryptographic intent hash computed over prompt, parameters, and model.<br>- Append-only immutable run ledger stored in local IndexedDB. | Low |
| **Information Disclosure** | User prompt leakage, signed CDN media URL exposure, or Google session cookie theft. | Privacy violation and account risk. | Critical | - **Zero-Telemetry Policy:** No external network requests; zero analytics/tracking SDKs.<br>- **Zero-Cookie Access:** `cookies` permission is completely omitted from `manifest.json`.<br>- Sanitized diagnostic logs: regex scrubber strips tokens, emails, and sensitive keys prior to display. | Negligible |
| **Denial of Service** | Infinite generation retry loops or rapid-fire DOM submissions trigger Google account rate limits or bans. | Account suspension, IP throttling, credit exhaustion. | Critical | - Strict minimum inter-job delay: 5,000ms cooldown.<br>- **Zero Blind Retries:** Any ambiguous failure, network drop, or selector drift transitions immediately to `needs-review`.<br>- Hard batch ceiling: Maximum 50 items per queue run. | Low |
| **Elevation of Privilege** | Malicious content in prompt text escapes sandbox into background execution (e.g., prototype pollution). | Execution of privileged Chrome APIs (e.g. downloads, file access). | High | - Strict CSP: `script-src 'self'`. Zero `eval()`, zero `new Function()`, zero remote scripts.<br>- Safe DOM manipulation: Zero `innerHTML` usage; all elements created via `document.createElement()` and `textContent`.<br>- Download filenames sanitized against path traversal (`../`, absolute paths, control characters stripped). | Low |

---

## 3. Explicit Prohibited Behaviors & Hard Failure Gates

### Gate 1: No Secret or Credential Harvesting (Critical)
- The extension **never** reads, intercepts, caches, or transmits Google passwords, Bearer tokens, Authorization headers, or `__Secure-*` cookies.
- Authentication relies 100% on the user's existing, ambient browser session.

### Gate 2: No CAPTCHA / Bot Defense Evasion (Critical)
- If Google displays `grecaptcha`, Cloudflare challenge, or bot detection overlays:
  1. The automation engine immediately suspends all active queues.
  2. The current job is marked `needs-review (human-verification-required)`.
  3. The extension sounds an alert chime and displays a prominent user banner: *"Google security verification detected. Please complete the verification in your tab."*
  4. The extension **never** attempts automated clicking or solver bypasses.

### Gate 3: No Silent or Unapproved Submissions (Critical)
- Generating content in Google Flow costs real user credits (15–100 credits/output).
- Automation will **never** click Generate without:
  1. An explicit pre-run financial modal showing the exact credit equation: $\text{Items} \times \text{Variations} \times \text{Unit Cost} = \text{Total Credits}$.
  2. Explicit user click on the confirmation CTA.
  3. Active tab focus verification (confirming the user has not navigated away to another page).

### Gate 4: Path Traversal & Download Sanitization (High)
- Media downloads must never allow directory escape outside `Downloads/AI-Media-Automator/`.
- All filename inputs are sanitized with:
  ```typescript
  export function sanitizeFilename(name: string): string {
    return name
      .replace(/[/\\?%*:|"<>]/g, '_')
      .replace(/\.\.+/g, '_')
      .trim()
      .slice(0, 120);
  }
  ```
