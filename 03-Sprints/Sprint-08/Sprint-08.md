---
type: sprint
sprint: "Sprint-08"
status: planned
created: 2026-10-19
planned_start: null
planned_end: null
capacity_points: null
---
# Sprint 8: Security, release readiness and maintenance

**Objective:** Security, release readiness and maintenance.  
**Prerequisites:** Prior sprint exit gate and dependency tickets.  
**Exit criteria:** QA gates, licensing, privacy, tested installable artifact and documented known limitations are approved.

## Scope (24 tickets)

- [ ] [[QA-001-review-extension-threat-model-against-implementation|QA-001]] — Review extension threat model against implementation (`high`)
- [ ] [[QA-002-audit-manifest-and-optional-permissions|QA-002]] — Audit manifest and optional permissions (`high`)
- [ ] [[QA-003-harden-content-script-isolation-and-input-handling|QA-003]] — Harden content-script isolation and input handling (`high`)
- [ ] [[QA-004-review-extension-csp-and-remote-code-policy|QA-004]] — Review extension CSP and remote-code policy (`high`)
- [ ] [[QA-005-audit-prompt-and-media-privacy|QA-005]] — Audit prompt and media privacy (`medium`)
- [ ] [[QA-006-validate-authentication-and-account-boundaries|QA-006]] — Validate authentication and account boundaries (`medium`)
- [ ] [[QA-007-validate-quotas-and-content-policy-safe-failures|QA-007]] — Validate quotas and content-policy safe failures (`medium`)
- [ ] [[QA-008-run-selector-compatibility-regression-suite|QA-008]] — Run selector-compatibility regression suite (`medium`)
- [ ] [[QA-009-run-model-duration-ratio-compatibility-tests|QA-009]] — Run model-duration-ratio compatibility tests (`medium`)
- [ ] [[QA-010-run-credit-and-budget-boundary-tests|QA-010]] — Run credit and budget boundary tests (`medium`)
- [ ] [[QA-011-run-exactly-once-and-crash-recovery-adversarial-tests|QA-011]] — Run exactly-once and crash recovery adversarial tests (`medium`)
- [ ] [[QA-012-run-downloads-and-file-safety-regression-tests|QA-012]] — Run downloads and file-safety regression tests (`medium`)
- [ ] [[QA-013-perform-performance-and-storage-profiling|QA-013]] — Perform performance and storage profiling (`medium`)
- [ ] [[QA-014-perform-accessibility-audit|QA-014]] — Perform accessibility audit (`medium`)
- [ ] [[QA-015-test-on-supported-chromium-fedora-environment|QA-015]] — Test on supported Chromium/Fedora environment (`medium`)
- [ ] [[QA-016-run-controlled-live-gemini-end-to-end-test|QA-016]] — Run controlled live Gemini end-to-end test (`medium`)
- [ ] [[QA-017-run-controlled-live-flow-image-end-to-end-test|QA-017]] — Run controlled live Flow image end-to-end test (`medium`)
- [ ] [[QA-018-run-controlled-live-omni-video-end-to-end-test|QA-018]] — Run controlled live Omni video end-to-end test (`medium`)
- [ ] [[QA-019-run-controlled-optional-veo-end-to-end-test|QA-019]] — Run controlled optional Veo end-to-end test (`medium`)
- [ ] [[QA-020-audit-dependency-vulnerabilities-and-attribution|QA-020]] — Audit dependency vulnerabilities and attribution (`medium`)
- [ ] [[QA-021-write-user-installation-and-operational-manuals|QA-021]] — Write user installation and operational manuals (`medium`)
- [ ] [[QA-022-prepare-release-packaging-and-version-discipline|QA-022]] — Prepare release packaging and version discipline (`medium`)
- [ ] [[QA-023-conduct-release-go-no-go-with-tracked-defects|QA-023]] — Conduct release go/no-go with tracked defects (`medium`)
- [ ] [[QA-024-create-post-release-compatibility-and-incident-playbook|QA-024]] — Create post-release compatibility and incident playbook (`medium`)

## Execution policy

- Start with unblocked tickets and set `status: in-progress`; retain file location.
- Track WIP: at most 2 implementation tickets per agent, and only 1 live UI automation ticket per Google tab/profile.
- Document evidence, failed tests, blockers and spending; never infer a paid submission failed because acknowledgement disappeared.
- New scope becomes a new ticket, not a hidden change to the current sprint goal.

## Sprint review and retrospective

- **Demo evidence:** Pending
- **Completed / carried forward:** Pending
- **Bugs and regressions:** Pending
- **Security/licensing/budget notes:** Pending
- **Retro: Keep / Improve / Try:** Pending
- **Go / no-go and approver:** Pending
