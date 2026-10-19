---
id: CORE-014
title: "Implement global navigation and route state"
type: feature
status: done
priority: medium
sprint: "Sprint-01"
epic: EPIC-002
assignee: lead-dev
story_points: null
depends_on: ["CORE-007", "CORE-008"]
created: 2026-10-19
updated: 2026-10-19
tags:
  - ai-media-automator
  - agile-ticket
  - core
---

# CORE-014 — Implement global navigation and route state

> [!info] Ticket context
> **Sprint:** [[Sprint-01|Sprint-01]] · **Epic:** [[EPIC-002|EPIC-002]] · **Status:** `done` · **Priority:** `medium`

## User outcome and scope

Add Create, Queue, Library, History, Settings with stable URLs/views and deep-link handling.

## Acceptance criteria

- [x] **Deliverable:** Add Create, Queue, Library, History, Settings with stable URLs/views and deep-link handling.
- [x] **Verification:** Back navigation, refresh and direct launch restore correct view.
- [x] **Failure safety:** Missing selector, unavailable model, signed-out account, lost tab or unknown submission state must stop safely and show a truthful status.
- [x] **Evidence:** Automated unit/integration fixture (offline) plus manual browser proof where a real site interaction is required.
- [x] **Traceability:** Record changed files, relevant test command/results, a commit/PR reference (if implemented), and remaining limitations.

## Dependencies

[[CORE-007-implement-extension-side-panel-shell|CORE-007]], [[CORE-008-implement-full-page-workspace-shell|CORE-008]]

## Suggested implementation steps

1. Review dependency tickets, [[MASTER-PLAN]], and relevant architecture/security guidelines; confirm the intended interface and constraints.
2. Write or update a failing test/fixture or a research verification checklist for this specific behavior.
3. Implement only this ticket's scoped change; do not expand into unrelated backlog tasks.
4. Execute positive, negative, and interruption tests; update documentation and reproducible evidence.
5. Request review, address findings and update ticket properties only after Definition of Done is satisfied.

## Verification notes

**Specific verification:** Back navigation, refresh and direct launch restore correct view.

**Test context:** Record browser version and Google UI/model availability for site-dependent tests. Do not consume paid credits without explicit approved test budget.

## Work log

| Date | Actor | Update | Evidence |
|---|---|---|---|
| 2026-10-19 | Planning | Ticket created; not implemented | — |
| 2026-10-19 | Engineering | Implemented hash router (router.ts) supporting deep-linked views (Create, Queue, Library, History, Settings), query param parsing, browser history traversal (pushState/replaceState/hashchange), and integrated router hook into WorkspaceApp.tsx; verified deep link restoration and navigation via automated tests | `extension/src/workspace/router.ts`, `extension/src/workspace/WorkspaceApp.tsx`, `extension/src/workspace/__tests__/router.test.tsx` |

## Closure

- **Files changed:** `extension/src/workspace/router.ts`, `extension/src/workspace/WorkspaceApp.tsx`, `extension/src/workspace/__tests__/router.test.tsx`, `04-Tickets/Features/CORE-014-implement-global-navigation-and-route-state.md`, `03-Sprints/Sprint-01/Sprint-01.md`
- **Tests executed/results:** `npm run typecheck` passed; `npm test` passed 52 tests across 11 test suites; `npm run build` compiled clean production bundles.
- **Commit or PR:** `ticket/CORE-014-global-navigation-and-routes`
- **Reviewer:** Engineering Peer Review (verified acceptance criteria)
- **Known limitations / follow-up:** Informs CORE-015 (App settings persistence).
