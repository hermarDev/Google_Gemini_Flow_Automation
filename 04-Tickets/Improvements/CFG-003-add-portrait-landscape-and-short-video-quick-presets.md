---
id: CFG-003
title: "Add portrait/landscape and short video quick presets"
type: improvement
status: backlog
priority: high
sprint: "Sprint-07"
epic: EPIC-008
assignee: unassigned
story_points: null
depends_on: ["CFG-001", "VID-007", "VID-008"]
created: 2026-10-19
updated: 2026-10-19
tags:
  - ai-media-automator
  - agile-ticket
  - cfg
---

# CFG-003 — Add portrait/landscape and short video quick presets

> [!info] Ticket context
> **Sprint:** [[Sprint-07|Sprint-07]] · **Epic:** [[EPIC-008|EPIC-008]] · **Status:** `backlog` · **Priority:** `high`

## User outcome and scope

Offer 9:16, 16:9, 8s and 10s shortcuts filtered by model support.

## Acceptance criteria

- [ ] **Deliverable:** Offer 9:16, 16:9, 8s and 10s shortcuts filtered by model support.
- [ ] **Verification:** Clicking shortcut never changes active provider model without visible confirmation.
- [ ] **Failure safety:** Stale or invalid preferences must not silently change a paid generation, output format or provider destination.
- [ ] **Evidence:** Unit/component tests plus UI screenshot or manual test record for user-facing behavior.
- [ ] **Traceability:** Record changed files, relevant test command/results, a commit/PR reference (if implemented), and remaining limitations.

## Dependencies

[[CFG-001-define-generation-preset-schema|CFG-001]], [[VID-007-implement-4-6-8-10-second-duration-selector|VID-007]], [[VID-008-implement-9-16-16-9-aspect-ratio-selection|VID-008]]

## Suggested implementation steps

1. Review dependency tickets, [[MASTER-PLAN]], and relevant architecture/security guidelines; confirm the intended interface and constraints.
2. Write or update a failing test/fixture or a research verification checklist for this specific behavior.
3. Implement only this ticket's scoped change; do not expand into unrelated backlog tasks.
4. Execute positive, negative, and interruption tests; update documentation and reproducible evidence.
5. Request review, address findings and update ticket properties only after Definition of Done is satisfied.

## Verification notes

**Specific verification:** Clicking shortcut never changes active provider model without visible confirmation.

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
