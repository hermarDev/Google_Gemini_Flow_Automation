---
id: CFG-004
title: "Add cost estimator for each request"
type: improvement
status: backlog
priority: high
sprint: "Sprint-07"
epic: EPIC-008
assignee: unassigned
story_points: null
depends_on: ["VID-006", "JOB-014"]
created: 2026-10-19
updated: 2026-10-19
tags:
  - ai-media-automator
  - agile-ticket
  - cfg
---

# CFG-004 — Add cost estimator for each request

> [!info] Ticket context
> **Sprint:** [[Sprint-07|Sprint-07]] · **Epic:** [[EPIC-008|EPIC-008]] · **Status:** `backlog` · **Priority:** `high`

## User outcome and scope

Compute estimated cost from current model/duration/resolution/count and subscription tier when known.

## Acceptance criteria

- [ ] **Deliverable:** Compute estimated cost from current model/duration/resolution/count and subscription tier when known.
- [ ] **Verification:** Compare 1 vs many outputs and show source-date and uncertainty clearly.
- [ ] **Failure safety:** Stale or invalid preferences must not silently change a paid generation, output format or provider destination.
- [ ] **Evidence:** Unit/component tests plus UI screenshot or manual test record for user-facing behavior.
- [ ] **Traceability:** Record changed files, relevant test command/results, a commit/PR reference (if implemented), and remaining limitations.

## Dependencies

[[VID-006-build-date-stamped-video-credit-catalog|VID-006]], [[JOB-014-implement-batch-dry-run-and-preflight|JOB-014]]

## Suggested implementation steps

1. Review dependency tickets, [[MASTER-PLAN]], and relevant architecture/security guidelines; confirm the intended interface and constraints.
2. Write or update a failing test/fixture or a research verification checklist for this specific behavior.
3. Implement only this ticket's scoped change; do not expand into unrelated backlog tasks.
4. Execute positive, negative, and interruption tests; update documentation and reproducible evidence.
5. Request review, address findings and update ticket properties only after Definition of Done is satisfied.

## Verification notes

**Specific verification:** Compare 1 vs many outputs and show source-date and uncertainty clearly.

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
