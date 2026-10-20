---
id: CORE-020
title: "Deliver Sprint 1 vertical slice"
type: feature
status: done
priority: medium
sprint: "Sprint-01"
epic: EPIC-002
assignee: orchestrator
story_points: null
depends_on: ["CORE-007", "CORE-008", "CORE-015", "CORE-017", "CORE-019"]
created: 2026-10-19
updated: 2026-10-20
tags:
  - ai-media-automator
  - agile-ticket
  - core
---

# CORE-020 — Deliver Sprint 1 vertical slice

> [!info] Ticket context
> **Sprint:** [[Sprint-01|Sprint-01]] · **Epic:** [[EPIC-002|EPIC-002]] · **Status:** `review` · **Priority:** `medium`

## User outcome and scope

Open extension, select dummy profile, add mock job and inspect persistent status in both shells.

## Acceptance criteria

- [x] **Deliverable:** Open extension, select dummy profile, add mock job and inspect persistent status in both shells.
- [x] **Verification:** Record an automated test report and release-gate review; capture browser screenshots only when generated and safely sanitized.
- [x] **Failure safety:** Missing selector, unavailable model, signed-out account, lost tab or unknown submission state must stop safely and show a truthful status.
- [x] **Evidence:** Automated unit/integration fixture (offline) plus manual browser proof where a real site interaction is required.
- [x] **Traceability:** Record changed files, relevant test command/results, a commit/PR reference (if implemented), and remaining limitations.

## Dependencies

[[CORE-007-implement-extension-side-panel-shell|CORE-007]], [[CORE-008-implement-full-page-workspace-shell|CORE-008]], [[CORE-015-implement-app-settings-persistence|CORE-015]], [[CORE-017-create-extension-message-protocol|CORE-017]], [[CORE-019-establish-component-extension-and-smoke-test-harness|CORE-019]]

## Suggested implementation steps

1. Review dependency tickets, [[MASTER-PLAN]], and relevant architecture/security guidelines; confirm the intended interface and constraints.
2. Write or update a failing test/fixture or a research verification checklist for this specific behavior.
3. Implement only this ticket's scoped change; do not expand into unrelated backlog tasks.
4. Execute positive, negative, and interruption tests; update documentation and reproducible evidence.
5. Request review, address findings and update ticket properties only after Definition of Done is satisfied.

## Verification notes

**Specific verification:** Record an automated test report, review findings and exact remediation, and an honest release-gate summary. Screenshot evidence is optional and must only be claimed when a sanitized artifact exists.

**Review remediation (2026-10-20):** Added serialized storage mutations with cooperative Web Locks where available, propagated storage read/write errors, wired pause/cancel to mock execution, persisted terminal cancellation status, and restricted queue actions to jobs with a local execution controller. Tightened sender URL/origin validation to exact HTTPS hosts and configured extension ID, plus UI no longer defaults to a connected session or labels mock-queue acceptance as Google rendering. Web Locks are origin-scoped; context boundaries must be respected and distributed queue mutation guarantees remain a limitation until independently tested across extension execution contexts. No screenshot artifact exists; live Google UI and paid generation were not tested.

**Verified commands (2026-10-20):** Post-remediation full validation passed: `npm run format:check`, `npm run lint`, `npm run typecheck`, `npm test -- --reporter=dot` (18 files/118 tests), `npm run build`, `npm run test:smoke` (12/12), `npm run test:extension` (1/1), `npm audit --omit=dev` (0 vulnerabilities), `python3 tools/validate_backlog.py` (176 tickets, 0 problems), and `git diff --check`. The regression test cancels during `submitting` and asserts the persisted terminal status.

**Remaining:** Offline queue tests pass, but atomic concurrent mutation across independent execution contexts remains unproven by this test environment. No external approval record is claimed; user authorized sprint closure after PR #38 was merged and all required checks passed. Live Google UI and paid generation were not tested.

**Test context:** Record browser version and Google UI/model availability for site-dependent tests. Do not consume paid credits without explicit approved test budget.

## Work log

| Date | Actor | Update | Evidence |
|---|---|---|---|
| 2026-10-19 | Planning | Ticket created; not implemented | — |
| 2026-10-20 | orchestrator | Resumed CORE-020 review remediation after independent read-only review. Added Zod validation for stored job records, observable per-job pause/resume row state, and cancellation tracking cleanup; corrected mock Chrome storage tests and tested cancel-before-idle storage read. Independent read-only review found no verified blockers; author posted a non-approval review comment on PR #38. | Local checks passed: Vitest 18 files/124 tests; typecheck, lint, format, build; preview smoke 12/12; packaged MV3 smoke 1/1; audit 0 vulnerabilities; backlog 176/0. Commits `943a4163f6a8834dc5adb6da8043eb3ba73f4471` and `ec90376bda2af5efebc507bde1faadec5b2d0664` pushed to PR #38. GitHub Actions CI run [39368902577](https://github.com/hermarDev/Google_Gemini_Flow_Automation/actions/runs/39368902577) passed all 3 checks on head `ec90376bda2af5efebc507bde1faadec5b2d0664`. No paid Google operations. |

| 2026-10-20 | orchestrator | Verified acceptance evidence on merged `main` and closed the ticket after user-approved Sprint 1 closure. | PR #38 merged at `84cee5fd0809e1bd7b4591bd8d9da67340ddb491`; all three required remote CI checks succeeded. Offline mock only; live Google UI and paid generation were not tested. |

## Closure