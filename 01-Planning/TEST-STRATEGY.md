# Test strategy and evidence standards

## Layers

1. **Unit:** Model capability matrix, pricing multiplication, filename/path sanitization, job transitions and migration validation.
2. **Component:** React controls, keyboard focus, errors, disabled combinations, theme and screen reader labels.
3. **Adapter fixtures:** Redacted synthetic Gemini/Flow DOM snapshots for ready/loading/complete/error/changed UI; no login required.
4. **Integration:** Content script ↔ background protocol, IndexedDB and Chrome downloads mock, simultaneous tab lock and crash/restart.
5. **E2E mock:** Extension loaded in Playwright local fixtures for no-credit user journeys.
6. **Live smoke:** Limited manual runs on owner-controlled Google accounts, only with prior explicit test-credit approval; redacted proof, real output metadata and browser version.
7. **Security/a11y/perf:** Manifest privilege audit, CVE checks, input/messaging fuzzing, 200% zoom, keyboard/screen reader, thousands of metadata records.

## Must-pass failure injections

- Kill service worker just before/after pressing Generate.
- Refresh provider tab mid-render and mid-download.
- Return multiple old media tiles before the new one.
- Invalid Veo 10-second request, stale price, changed resolution, output count > approved.
- Sign-out, account switch, quota exhausted, policy rejected, missing model.
- Duplicate click event, duplicate job in import, forged message origin.
- Bad media URL and browser download interrupted or canceled.

## Paid credits testing rule

No agent runs a credit-spending live test from assumption. The owner must approve a specific model, number of outputs and maximum credits for a session, and record approval in the test log. A skipped paid test is `not-tested`, **not passed**. Prefer mocks until the critical automation route is known safe.

## Evidence template

| Field | Record |
|---|---|
| Ticket / commit | — |
| Test commands | — |
| Browser / extension version | — |
| Google UI/account capability observed | — |
| Preflight settings and budget authorization | — |
| Observed outcomes | — |
| Failures and remaining uncertainties | — |
| Evidence links | — |
| QA reviewer and date | — |

No real email addresses, tokens, cookies or other secrets in evidence.
