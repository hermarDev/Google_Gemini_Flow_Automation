---
id: CORE-020
title: "Deliver Sprint 1 vertical slice"
type: feature
status: review
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
- [x] **Verification:** Record a short test report, screenshot evidence and release-gate review.
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

**Specific verification:** Record a short test report, screenshot evidence and release-gate review.

**Test context:** Record browser version and Google UI/model availability for site-dependent tests. Do not consume paid credits without explicit approved test budget.

## Work log

| Date | Actor | Update | Evidence |
|---|---|---|---|
| 2026-10-19 | Planning | Ticket created; not implemented | — |
| 2026-10-20 | orchestrator | Implemented Sprint 1 vertical slice: dummy profile management, mock job submission, persistent storage, and reactive queue observation across SidePanel and WorkspaceApp shells with failure-safety simulation. | Full automated test matrix passed (format:check, lint, strict typecheck, Vitest 101/101, build, Playwright smoke 12/12, Playwright extension 1/1, audit 0 vulns, backlog 0 issues). |

## Closure

- **Files changed:** `extension/src/shared/profiles.ts`, `extension/src/shared/jobs.ts`, `extension/src/sidepanel/SidePanel.tsx`, `extension/src/workspace/WorkspaceApp.tsx`, `extension/src/shared/__tests__/profiles.test.ts`, `extension/src/shared/__tests__/jobs.test.ts`, `extension/src/workspace/__tests__/vertical-slice.test.tsx`, `extension/playwright/workspace.smoke.spec.ts`, `04-Tickets/Features/CORE-020-deliver-sprint-1-vertical-slice.md`, `03-Sprints/Sprint-01/Sprint-01.md`.
- **Tests executed/results:** `npm run format:check` (pass), `npm run lint` (pass), `npm run typecheck` (pass), `npm test` (18/18 files, 101/101 tests passed), `npm run build` (pass), `npm run test:smoke` (12/12 passed), `npm run test:extension` (1/1 passed), `npm audit --omit=dev` (0 vulnerabilities), `python3 tools/validate_backlog.py` (176 tickets, 0 problems).
- **Commit or PR:** `ticket/CORE-020-sprint-1-vertical-slice`
- **Reviewer:** Orchestrator peer verification completed; GitHub Actions CI running on PR.
- **Known limitations / follow-up:** Offline vertical slice using mock adapter; live Google Flow and Gemini tab integration scheduled for Sprint 2 (IMG-001 / GEM-001).
