---
type: epic
id: EPIC-009
status: planned
sprint: "Sprint-08"
created: 2026-10-19
---
# EPIC-009 — Security, release readiness and maintenance

**Purpose:** Establish a testable, secure capability for security, release readiness and maintenance.  
**Proposed sprint:** [[Sprint-08]]  
**Ticket count:** 24

## Child tickets

- [[QA-001-review-extension-threat-model-against-implementation|QA-001]] — Review extension threat model against implementation
- [[QA-002-audit-manifest-and-optional-permissions|QA-002]] — Audit manifest and optional permissions
- [[QA-003-harden-content-script-isolation-and-input-handling|QA-003]] — Harden content-script isolation and input handling
- [[QA-004-review-extension-csp-and-remote-code-policy|QA-004]] — Review extension CSP and remote-code policy
- [[QA-005-audit-prompt-and-media-privacy|QA-005]] — Audit prompt and media privacy
- [[QA-006-validate-authentication-and-account-boundaries|QA-006]] — Validate authentication and account boundaries
- [[QA-007-validate-quotas-and-content-policy-safe-failures|QA-007]] — Validate quotas and content-policy safe failures
- [[QA-008-run-selector-compatibility-regression-suite|QA-008]] — Run selector-compatibility regression suite
- [[QA-009-run-model-duration-ratio-compatibility-tests|QA-009]] — Run model-duration-ratio compatibility tests
- [[QA-010-run-credit-and-budget-boundary-tests|QA-010]] — Run credit and budget boundary tests
- [[QA-011-run-exactly-once-and-crash-recovery-adversarial-tests|QA-011]] — Run exactly-once and crash recovery adversarial tests
- [[QA-012-run-downloads-and-file-safety-regression-tests|QA-012]] — Run downloads and file-safety regression tests
- [[QA-013-perform-performance-and-storage-profiling|QA-013]] — Perform performance and storage profiling
- [[QA-014-perform-accessibility-audit|QA-014]] — Perform accessibility audit
- [[QA-015-test-on-supported-chromium-fedora-environment|QA-015]] — Test on supported Chromium/Fedora environment
- [[QA-016-run-controlled-live-gemini-end-to-end-test|QA-016]] — Run controlled live Gemini end-to-end test
- [[QA-017-run-controlled-live-flow-image-end-to-end-test|QA-017]] — Run controlled live Flow image end-to-end test
- [[QA-018-run-controlled-live-omni-video-end-to-end-test|QA-018]] — Run controlled live Omni video end-to-end test
- [[QA-019-run-controlled-optional-veo-end-to-end-test|QA-019]] — Run controlled optional Veo end-to-end test
- [[QA-020-audit-dependency-vulnerabilities-and-attribution|QA-020]] — Audit dependency vulnerabilities and attribution
- [[QA-021-write-user-installation-and-operational-manuals|QA-021]] — Write user installation and operational manuals
- [[QA-022-prepare-release-packaging-and-version-discipline|QA-022]] — Prepare release packaging and version discipline
- [[QA-023-conduct-release-go-no-go-with-tracked-defects|QA-023]] — Conduct release go/no-go with tracked defects
- [[QA-024-create-post-release-compatibility-and-incident-playbook|QA-024]] — Create post-release compatibility and incident playbook

## Gate

Epic is complete only when child-ticket acceptance criteria, evidence and applicable sprint gate are met. Do not mark a parent Done for code-only or mock-only work when live verification was required.
