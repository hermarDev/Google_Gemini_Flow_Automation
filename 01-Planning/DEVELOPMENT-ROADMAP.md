# Sprint roadmap and dependencies

| Sprint | Output | Exit evidence | Dependency |
|---|---|---|---|
| [[Sprint-00]] | Audited upstream projects, current Google specs, product constraints, architecture decisions | Research reports, risk gate | None |
| [[Sprint-01]] | Loading MV3 shell, UI foundation, mocks, CI | Screenshot, clean build and offline smoke test | Sprint 0 architecture |
| [[Sprint-02]] | Gemini chat image flow, verified downloads | Gemini fixture suite + permitted manual smoke | Core adapter + message protocol |
| [[Sprint-03]] | Flow image flow | Selectors/model verification and image download smoke | Core foundation |
| [[Sprint-04]] | Omni-default and optional Veo video flow | Capability/credit preflight, MP4 output verification | Flow adapter + model research |
| [[Sprint-05]] | Durable batch queue and crash recovery | Crash/replay/consent tests | Gemini/Flow workflows |
| [[Sprint-06]] | Local media library and chaining | Image-to-video E2E | Download records and queue |
| [[Sprint-07]] | Credit limits, presets, diagnostics | Budget drift and settings tests | Capabilities and local metadata |
| [[Sprint-08]] | Security and installable release | Full regression, licenses, manual gates, versioned bundle | All above |

## Execution cadence

- Plan based on real team capacity; 1–2 weeks per sprint is a starting idea, not a promise or a calendar commitment.
- Establish **Definition of Ready** and review time estimates at each planning meeting.
- Keep 1 owner per shared module; no two agents may concurrently control the same Google tab.
- A new provider UI or credit model may trigger a short research ticket before continuing feature work.
- Document demo, QA and retrospective after each sprint. Carry over unfinished ticket with its history intact.

## Milestone gates

- **Foundation:** [[Sprint-00]], [[Sprint-01]]. Confirm compliant automation feasibility.
- **Image MVP:** [[Sprint-02]], [[Sprint-03]]; original full-size files and provenance.
- **Video MVP:** [[Sprint-04]] + minimal [[Sprint-05]] guards; budget-default Omni and optional Veo.
- **Workflow V1:** [[Sprint-05]], [[Sprint-06]], [[Sprint-07]]; safe batch and library.
- **Release:** [[Sprint-08]], reviewed owner approval.

## Definition of Ready

Ticket must have precise observable outcome, testable criteria, dependency status, identified component owner, test fixture path or research evidence source, and budget/privilege impact. If any of these are unresolved, mark `blocked` or return to `backlog`.
