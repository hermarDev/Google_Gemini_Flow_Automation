---
id: JOB-001
title: "Define versioned Job and JobAttempt schemas"
type: feature
status: backlog
priority: high
sprint: "Sprint-05"
epic: EPIC-006
assignee: unassigned
story_points: null
depends_on: ["CORE-015", "VID-005"]
created: 2026-10-19
updated: 2026-10-19
tags:
  - ai-media-automator
  - agile-ticket
  - job
---

# JOB-001 — Define versioned Job and JobAttempt schemas

> [!info] Ticket context
> **Sprint:** [[Sprint-05|Sprint-05]] · **Epic:** [[EPIC-006|EPIC-006]] · **Status:** `backlog` · **Priority:** `high`

## User outcome and scope

Add immutable job IDs, provider, mode, settings snapshot, cost estimate, attempt IDs and asset links.

## Acceptance criteria

- [ ] **Deliverable:** Add immutable job IDs, provider, mode, settings snapshot, cost estimate, attempt IDs and asset links.
- [ ] **Verification:** Schema migration tests preserve old jobs and reject malformed entries.
- [ ] **Failure safety:** Missing selector, unavailable model, signed-out account, lost tab or unknown submission state must stop safely and show a truthful status.
- [ ] **Evidence:** Automated unit/integration fixture (offline) plus manual browser proof where a real site interaction is required.
- [ ] **Traceability:** Record changed files, relevant test command/results, a commit/PR reference (if implemented), and remaining limitations.

## Dependencies

[[CORE-015-implement-app-settings-persistence|CORE-015]], [[VID-005-build-video-capability-matrix-engine|VID-005]]

## Suggested implementation steps

1. Review dependency tickets, [[MASTER-PLAN]], and relevant architecture/security guidelines; confirm the intended interface and constraints.
2. Write or update a failing test/fixture or a research verification checklist for this specific behavior.
3. Implement only this ticket's scoped change; do not expand into unrelated backlog tasks.
4. Execute positive, negative, and interruption tests; update documentation and reproducible evidence.
5. Request review, address findings and update ticket properties only after Definition of Done is satisfied.

## Verification notes

**Specific verification:** Schema migration tests preserve old jobs and reject malformed entries.

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
