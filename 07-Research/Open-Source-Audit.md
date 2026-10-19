# Open-source reference audit (initial, 2026-10-19)

> These are **verified repository landing pages and documented features**, not a source-level security audit. Actual code reuse is blocked pending exact SHA / LICENSE / dependency review in Sprint 0. Copy techniques and ideas only after approval; no source code was copied into this planning package.

| Reference | URL | Relevant learning | Red flags and next verification |
|---|---|---|---|
| Flow Automator — ART-TECH-FUZION | https://github.com/ART-TECH-FUZION/google-flow-automator | MV3 sidepanel; prompt queue, model/ratio/duration choices, output detection, sequential download and state persistence | README describes debugger/CDP, 'anti-detection delays'. README says MIT, but a LICENSE file was **not visible in the repository root when checked**; confirm licensing before copying anything. |
| OmniImageAutoGen — fangwangme | https://github.com/fangwangme/OmniImageAutoGen | Gemini chat locking, prompt batches, full-size downloads, safe naming, retries and progress UI | Former `GeminiAutoGen` URL redirects to this repo. README asserts MIT; inspect actual LICENSE/dependency files and runtime download behavior. |
| Google Flow Automation — Shivanshu85 | https://github.com/Shivanshu85/Google-Flow-Automation | Flow modes including text/frame/ingredients, model settings, asset matching, queue and error states | README claims MIT; confirm full licensing, selectors, permissions, and whether model list still matches live Flow. |
| Google Flow Suite — omid-io | https://github.com/omid-io/google-flow-suite | Conceptual module boundaries, asset catalog, CLI/tests/recovery claims | README describes Bearer-token interception, grecaptcha solving and direct internal API bridge. **Do not copy or implement those methods.** Claims of 'production-grade' and test count remain unverified until audited. |

## Improvements over reference projects

1. **One coordinated product:** Separate provider adapters sharing typed jobs, cost estimation, tested UI and library; no accidental architectural coupling.
2. **No fragile guesses:** Reread actual model/ratio/count/duration immediately before Generate, abort on uncertainty.
3. **Strong paid-submission safety:** Persist intent before click; `needs-review` on ambiguous ack, no duplicate paid retries.
4. **Local-first extension reliability:** MV3 event-driven workers, IndexedDB and side-panel/worker restart recovery.
5. **Real file verification:** Track browser download lifecycle, original quality and media metadata.
6. **Usable professional UI:** restrained visual system, tests, accessible controls and accurate progress.
7. **Transparent policies:** Real limitations, permission rationale and no authentication bypass.
8. **Obsidian Agile documentation:** Every planned change has tracked acceptance and evidence notes.

## Required source-level inspection (RES-001 through RES-006)

- Record Git commit SHA/tag, license text, NOTICE, transitive dependencies and known CVEs.
- Inspect `manifest.json`, service-worker messages, website selectors and all network requests.
- Search source for debugger, all-URL hosts, token/cookie access, CAPTCHA routines and bypass logic.
- Distinguish normal user-triggered UI automation from deceptive or undocumented API behavior.
- Record whether examples run in a throwaway browser profile without access to personal account.
- Decide **ideas-only**, **allowed MIT reuse with notice**, or **reject entirely** per component.

## Evidence and citations

- Flow Automator README: https://github.com/ART-TECH-FUZION/google-flow-automator
- OmniImageAutoGen README: https://github.com/fangwangme/OmniImageAutoGen
- Google Flow Automation README: https://github.com/Shivanshu85/Google-Flow-Automation
- Google Flow Suite README: https://github.com/omid-io/google-flow-suite
- Chrome extension policy and MV3: https://developer.chrome.com/docs/extensions/mv3/manifest

**Initial research confidence:** repository existence and documented claims confirmed via public pages; exact current commits, permissions, executable behavior and complete license clearance are still **unverified**.
