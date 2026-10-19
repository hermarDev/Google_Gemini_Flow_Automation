---
id: LIB-004
title: "Implement Downloads subfolder organization"
type: feature
status: backlog
priority: high
sprint: "Sprint-06"
epic: EPIC-007
assignee: unassigned
story_points: null
depends_on: ["LIB-002", "LIB-003"]
created: 2026-10-19
updated: 2026-10-19
tags:
  - ai-media-automator
  - agile-ticket
  - lib
---

# LIB-004 — Implement Downloads subfolder organization

> [!info] Ticket context
> **Sprint:** [[Sprint-06|Sprint-06]] · **Epic:** [[EPIC-007|EPIC-007]] · **Status:** `backlog` · **Priority:** `high`

## User outcome and scope

Place outputs under user-approved relative browser Downloads paths by provider/project/date.

## Acceptance criteria

- [ ] **Deliverable:** Place outputs under user-approved relative browser Downloads paths by provider/project/date.
- [ ] **Verification:** Absolute host paths are never passed to chrome.downloads; user understands directory limits.
- [ ] **Failure safety:** Missing selector, unavailable model, signed-out account, lost tab or unknown submission state must stop safely and show a truthful status.
- [ ] **Evidence:** Automated unit/integration fixture (offline) plus manual browser proof where a real site interaction is required.
- [ ] **Traceability:** Record changed files, relevant test command/results, a commit/PR reference (if implemented), and remaining limitations.

## Dependencies

[[LIB-002-implement-reliable-download-reconciliation|LIB-002]], [[LIB-003-implement-deterministic-filename-templating|LIB-003]]

## Suggested implementation steps

1. Review dependency tickets, [[MASTER-PLAN]], and relevant architecture/security guidelines; confirm the intended interface and constraints.
2. Write or update a failing test/fixture or a research verification checklist for this specific behavior.
3. Implement only this ticket's scoped change; do not expand into unrelated backlog tasks.
4. Execute positive, negative, and interruption tests; update documentation and reproducible evidence.
5. Request review, address findings and update ticket properties only after Definition of Done is satisfied.

## Verification notes

**Specific verification:** Absolute host paths are never passed to chrome.downloads; user understands directory limits.

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
