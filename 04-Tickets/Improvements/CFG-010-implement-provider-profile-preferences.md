---
id: CFG-010
title: "Implement provider profile preferences"
type: improvement
status: backlog
priority: medium
sprint: "Sprint-07"
epic: EPIC-008
assignee: unassigned
story_points: null
depends_on: ["CORE-015", "IMG-002"]
created: 2026-10-19
updated: 2026-10-19
tags:
  - ai-media-automator
  - agile-ticket
  - cfg
---

# CFG-010 — Implement provider profile preferences

> [!info] Ticket context
> **Sprint:** [[Sprint-07|Sprint-07]] · **Epic:** [[EPIC-008|EPIC-008]] · **Status:** `backlog` · **Priority:** `medium`

## User outcome and scope

Save per-provider default model, project choice, language and download options in local-only storage.

## Acceptance criteria

- [ ] **Deliverable:** Save per-provider default model, project choice, language and download options in local-only storage.
- [ ] **Verification:** Missing/inaccessible project does not fall back to arbitrary project.
- [ ] **Failure safety:** Stale or invalid preferences must not silently change a paid generation, output format or provider destination.
- [ ] **Evidence:** Unit/component tests plus UI screenshot or manual test record for user-facing behavior.
- [ ] **Traceability:** Record changed files, relevant test command/results, a commit/PR reference (if implemented), and remaining limitations.

## Dependencies

[[CORE-015-implement-app-settings-persistence|CORE-015]], [[IMG-002-implement-flow-project-targeting|IMG-002]]

## Suggested implementation steps

1. Review dependency tickets, [[MASTER-PLAN]], and relevant architecture/security guidelines; confirm the intended interface and constraints.
2. Write or update a failing test/fixture or a research verification checklist for this specific behavior.
3. Implement only this ticket's scoped change; do not expand into unrelated backlog tasks.
4. Execute positive, negative, and interruption tests; update documentation and reproducible evidence.
5. Request review, address findings and update ticket properties only after Definition of Done is satisfied.

## Verification notes

**Specific verification:** Missing/inaccessible project does not fall back to arbitrary project.

**Test context:** Record browser version and Google UI/model availability for site-dependent tests. Do not consume paid credits without explicit approved test budget.

## Work log

| Date | Actor | Update | Evidence |
|---|---|---|---|
| 2026-10-19 | Planning | Ticket created; not implemented | — |

## Closure

- **Files changed:** Pending
- **Tests executed/results:** Pending
- **Commit or PR:** Pending
- **Reviewer:** Pending
- **Known limitations / follow-up:** Pending
