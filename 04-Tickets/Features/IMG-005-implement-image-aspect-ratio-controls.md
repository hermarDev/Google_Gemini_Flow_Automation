---
id: IMG-005
title: "Implement image aspect ratio controls"
type: feature
status: backlog
priority: medium
sprint: "Sprint-03"
epic: EPIC-004
assignee: unassigned
story_points: null
depends_on: ["IMG-003", "RES-009"]
created: 2026-10-19
updated: 2026-10-19
tags:
  - ai-media-automator
  - agile-ticket
  - img
---

# IMG-005 — Implement image aspect ratio controls

> [!info] Ticket context
> **Sprint:** [[Sprint-03|Sprint-03]] · **Epic:** [[EPIC-004|EPIC-004]] · **Status:** `backlog` · **Priority:** `medium`

## User outcome and scope

Support valid 9:16, 16:9 and other provider-supported ratios using capability matrix.

## Acceptance criteria

- [ ] **Deliverable:** Support valid 9:16, 16:9 and other provider-supported ratios using capability matrix.
- [ ] **Verification:** Unsupported ratio combinations are rejected before submission.
- [ ] **Failure safety:** Missing selector, unavailable model, signed-out account, lost tab or unknown submission state must stop safely and show a truthful status.
- [ ] **Evidence:** Automated unit/integration fixture (offline) plus manual browser proof where a real site interaction is required.
- [ ] **Traceability:** Record changed files, relevant test command/results, a commit/PR reference (if implemented), and remaining limitations.

## Dependencies

[[IMG-003-build-flow-image-model-discovery|IMG-003]], [[RES-009-verify-current-model-capability-matrix|RES-009]]

## Suggested implementation steps

1. Review dependency tickets, [[MASTER-PLAN]], and relevant architecture/security guidelines; confirm the intended interface and constraints.
2. Write or update a failing test/fixture or a research verification checklist for this specific behavior.
3. Implement only this ticket's scoped change; do not expand into unrelated backlog tasks.
4. Execute positive, negative, and interruption tests; update documentation and reproducible evidence.
5. Request review, address findings and update ticket properties only after Definition of Done is satisfied.

## Verification notes

**Specific verification:** Unsupported ratio combinations are rejected before submission.

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
