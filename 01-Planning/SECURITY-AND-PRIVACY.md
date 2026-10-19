# Security, privacy and platform conduct

## Trust boundaries

- Third-party Gemini/Flow page content is **untrusted input** despite being operated by Google.
- Extension service worker/background controls privileged Chrome APIs; content scripts get only required capabilities.
- User prompts/references may be sensitive; minimize and retain locally by default.
- Media URLs and filenames may contain identifiable metadata; redact from logs and exports unless explicitly requested.

## Required controls

1. Least-privileged host and Chrome permissions; reason for each listed in manifest review.
2. Origin validation and typed schemas for all `chrome.runtime`/tab messages.
3. CSP-compliant static bundles; no eval, remote JavaScript, untrusted HTML rendering or CDN scripts.
4. No Google passwords, auth tokens, cookies, CAPTCHA solutions or undocumented internal request tokens collected or transmitted.
5. No evasion of rate limits, security challenges, policy refusal or subscription/quota restrictions.
6. Safe non-repeating paid submissions, preflight and explicit user approval.
7. Filename sanitization, relative Downloads paths, MIME/content verification and collision handling.
8. Safe export and wipe mechanisms; local diagnostics are opt-in, sanitized and visible.
9. No automatic deletion of user media/provider projects.
10. Security audit before publication and whenever permissions expand.

## Upstream research warning

`google-flow-automator` README describes `chrome.debugger` and 'anti-detection delays'. `google-flow-suite` README describes Bearer-token interception and challenge solving. **These are explicitly not approved architecture patterns for our extension.** Study conceptual state handling and interface separation only. See [[Open-Source-Audit]].

## User approval boundaries

A browser extension that clicks 'Generate' can spend credits. Explicit consent must bind the precise provider, project, model, duration, resolution, ratio and requested output count. Jobs may still complete after the user pauses the extension. Never claim to prevent all charges beyond what the actual service UI provides.

## Audit actions

- Run package vulnerability checks and inspect exact upstream license files.
- Test settings drift and unknown-submission crashes.
- Redact network tokens in screenshots, telemetry, log files and QA evidence.
- Review permissions/manifest updates in a code review, not agent-approved silently.
- Follow Google's current product policies before each provider automation feature is released.
