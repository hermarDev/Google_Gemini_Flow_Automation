---
id: IMG-013
title: "Capture Flow image metadata"
type: feature
status: backlog
priority: medium
sprint: "Sprint-03"
epic: EPIC-004
assignee: unassigned
story_points: null
depends_on: ["IMG-012"]
created: 2026-10-19
updated: 2026-10-19
tags:
  - ai-media-automator
  - agile-ticket
  - img
---

# IMG-013 — Capture Flow image metadata

> [!info] Ticket context
> **Sprint:** [[Sprint-03|Sprint-03]] · **Epic:** [[EPIC-004|EPIC-004]] · **Status:** `backlog` · **Priority:** `medium`

## User outcome and scope

Save Flow project, model, ratio, prompt, count, timestamps and local filenames.

## Acceptance criteria

- [ ] **Deliverable:** Save Flow project, model, ratio, prompt, count, timestamps and local filenames.
- [ ] **Verification:** Asset can be reopened from Library with data separated from browser session tokens.
- [ ] **Failure safety:** Missing selector, unavailable model, signed-out account, lost tab or unknown submission state must stop safely and show a truthful status.
- [ ] **Evidence:** Automated unit/integration fixture (offline) plus manual browser proof where a real site interaction is required.
- [ ] **Traceability:** Record changed files, relevant test command/results, a commit/PR reference (if implemented), and remaining limitations.

## Dependencies

[[IMG-012-implement-original-quality-flow-image-downloads|IMG-012]]

## Suggested implementation steps

1. Review dependency tickets, [[MASTER-PLAN]], and relevant architecture/security guidelines; confirm the intended interface and constraints.
2. Write or update a failing test/fixture or a research verification checklist for this specific behavior.
3. Implement only this ticket's scoped change; do not expand into unrelated backlog tasks.
4. Execute positive, negative, and interruption tests; update documentation and reproducible evidence.
5. Request review, address findings and update ticket properties only after Definition of Done is satisfied.

## Verification notes

**Specific verification:** Asset can be reopened from Library with data separated from browser session tokens.

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
