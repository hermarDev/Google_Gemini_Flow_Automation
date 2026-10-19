---
id: IMG-003
title: "Build Flow image model discovery"
type: feature
status: backlog
priority: high
sprint: "Sprint-03"
epic: EPIC-004
assignee: unassigned
story_points: null
depends_on: ["IMG-001"]
created: 2026-10-19
updated: 2026-10-19
tags:
  - ai-media-automator
  - agile-ticket
  - img
---

# IMG-003 — Build Flow image model discovery

> [!info] Ticket context
> **Sprint:** [[Sprint-03|Sprint-03]] · **Epic:** [[EPIC-004|EPIC-004]] · **Status:** `backlog` · **Priority:** `high`

## User outcome and scope

Read visible Nano Banana Pro, Nano Banana 2/2.1 and Lite options when present.

## Acceptance criteria

- [ ] **Deliverable:** Read visible Nano Banana Pro, Nano Banana 2/2.1 and Lite options when present.
- [ ] **Verification:** Unsupported or plan-locked models are disabled with reason instead of emulated.
- [ ] **Failure safety:** Missing selector, unavailable model, signed-out account, lost tab or unknown submission state must stop safely and show a truthful status.
- [ ] **Evidence:** Automated unit/integration fixture (offline) plus manual browser proof where a real site interaction is required.
- [ ] **Traceability:** Record changed files, relevant test command/results, a commit/PR reference (if implemented), and remaining limitations.

## Dependencies

[[IMG-001-implement-flow-image-connection-and-readiness|IMG-001]]

## Suggested implementation steps

1. Review dependency tickets, [[MASTER-PLAN]], and relevant architecture/security guidelines; confirm the intended interface and constraints.
2. Write or update a failing test/fixture or a research verification checklist for this specific behavior.
3. Implement only this ticket's scoped change; do not expand into unrelated backlog tasks.
4. Execute positive, negative, and interruption tests; update documentation and reproducible evidence.
5. Request review, address findings and update ticket properties only after Definition of Done is satisfied.

## Verification notes

**Specific verification:** Unsupported or plan-locked models are disabled with reason instead of emulated.

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
