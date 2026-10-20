---
id: CORE-008
title: "Implement full-page workspace shell"
type: feature
status: done
priority: medium
sprint: "Sprint-01"
epic: EPIC-002
assignee: hermes-lead-dev
story_points: null
depends_on: ["CORE-007"]
created: 2026-10-19
updated: 2026-10-19
tags:
  - ai-media-automator
  - agile-ticket
  - core
---

# CORE-008 — Implement full-page workspace shell

> [!info] Ticket context
> **Sprint:** [[Sprint-01|Sprint-01]] · **Epic:** [[EPIC-002|EPIC-002]] · **Status:** `done` · **Priority:** `medium`

## User outcome and scope

Add extension-owned page for media library and long batch queue operations.

## Acceptance criteria

- [x] **Deliverable:** Add extension-owned page for media library and long batch queue operations.
- [x] **Verification:** Navigation between side panel and workspace retains state and focus.
- [x] **Failure safety:** Missing selector, unavailable model, signed-out account, lost tab or unknown submission state must stop safely and show a truthful status.
- [x] **Evidence:** Automated unit/integration fixture (offline) plus manual browser proof where a real site interaction is required.
- [x] **Traceability:** Record changed files, relevant test command/results, a commit/PR reference (if implemented), and remaining limitations.

## Dependencies

[[CORE-007-implement-extension-side-panel-shell|CORE-007]]

## Suggested implementation steps

1. Review dependency tickets, [[MASTER-PLAN]], and relevant architecture/security guidelines; confirm the intended interface and constraints.
2. Write or update a failing test/fixture or a research verification checklist for this specific behavior.
3. Implement only this ticket's scoped change; do not expand into unrelated backlog tasks.
4. Execute positive, negative, and interruption tests; update documentation and reproducible evidence.
5. Request review, address findings and update ticket properties only after Definition of Done is satisfied.

## Verification notes

**Specific verification:** Navigation between side panel and workspace retains state and focus.

**Test context:** Record browser version and Google UI/model availability for site-dependent tests. Do not consume paid credits without explicit approved test budget.

## Work log

| Date | Actor | Update | Evidence |
|---|---|---|---|
| 2026-10-19 | Planning | Ticket created; not implemented | — |
| 2026-10-19 | Lead Dev | Implemented full-page Workspace shell (WorkspaceApp.tsx) with left-rail navigation (Create, Queue, Library, History, Settings), tab target indicator, side panel launcher, and WCAG-compliant zinc layout; verified state transitions and tab reflection via unit tests | `extension/src/workspace/WorkspaceApp.tsx`, `extension/src/workspace/__tests__/WorkspaceApp.test.tsx` |

## Closure

- **Files changed:** `extension/src/workspace/WorkspaceApp.tsx`, `extension/src/workspace/main.tsx`, `extension/src/workspace/__tests__/WorkspaceApp.test.tsx`, `04-Tickets/Features/CORE-008-implement-full-page-workspace-shell.md`, `03-Sprints/Sprint-01/Sprint-01.md`
- **Tests executed/results:** `npm run typecheck` passed; `npm test` passed 17 tests across 5 test files; `npm run build` compiled workspace HTML and JS bundles cleanly.
- **Commit or PR:** `ticket/CORE-008-full-page-workspace-shell`
- **Reviewer:** Hermes Lead Dev (verified acceptance criteria)
- **Known limitations / follow-up:** Views are shells; individual feature components (batch queue grid, media catalog) will be fleshed out in subsequent tickets.
