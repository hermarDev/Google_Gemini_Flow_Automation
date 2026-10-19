---
id: JOB-014
title: "Implement batch dry-run and preflight"
type: feature
status: backlog
priority: medium
sprint: "Sprint-05"
epic: EPIC-006
assignee: unassigned
story_points: null
depends_on: ["JOB-013", "VID-006"]
created: 2026-10-19
updated: 2026-10-19
tags:
  - ai-media-automator
  - agile-ticket
  - job
---

# JOB-014 — Implement batch dry-run and preflight

> [!info] Ticket context
> **Sprint:** [[Sprint-05|Sprint-05]] · **Epic:** [[EPIC-006|EPIC-006]] · **Status:** `backlog` · **Priority:** `medium`

## User outcome and scope

Preview eligible count, unsupported combinations, available prerequisites and total estimated credits.

## Acceptance criteria

- [ ] **Deliverable:** Preview eligible count, unsupported combinations, available prerequisites and total estimated credits.
- [ ] **Verification:** Invalid or uncertain-cost rows block starting until clarified.
- [ ] **Failure safety:** Missing selector, unavailable model, signed-out account, lost tab or unknown submission state must stop safely and show a truthful status.
- [ ] **Evidence:** Automated unit/integration fixture (offline) plus manual browser proof where a real site interaction is required.
- [ ] **Traceability:** Record changed files, relevant test command/results, a commit/PR reference (if implemented), and remaining limitations.

## Dependencies

[[JOB-013-support-json-txt-csv-batch-imports|JOB-013]], [[VID-006-build-date-stamped-video-credit-catalog|VID-006]]

## Suggested implementation steps

1. Review dependency tickets, [[MASTER-PLAN]], and relevant architecture/security guidelines; confirm the intended interface and constraints.
2. Write or update a failing test/fixture or a research verification checklist for this specific behavior.
3. Implement only this ticket's scoped change; do not expand into unrelated backlog tasks.
4. Execute positive, negative, and interruption tests; update documentation and reproducible evidence.
5. Request review, address findings and update ticket properties only after Definition of Done is satisfied.

## Verification notes

**Specific verification:** Invalid or uncertain-cost rows block starting until clarified.

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
