---
id: JOB-002
title: "Implement explicit job state machine"
type: feature
status: backlog
priority: critical
sprint: "Sprint-05"
epic: EPIC-006
assignee: unassigned
story_points: null
depends_on: ["JOB-001"]
created: 2026-10-19
updated: 2026-10-19
tags:
  - ai-media-automator
  - agile-ticket
  - job
---

# JOB-002 — Implement explicit job state machine

> [!info] Ticket context
> **Sprint:** [[Sprint-05|Sprint-05]] · **Epic:** [[EPIC-006|EPIC-006]] · **Status:** `backlog` · **Priority:** `critical`

## User outcome and scope

Model draft, ready, preflight, submitting, submitted, generating, downloading, completed, failed, paused and needs-review.

## Acceptance criteria

- [ ] **Deliverable:** Model draft, ready, preflight, submitting, submitted, generating, downloading, completed, failed, paused and needs-review.
- [ ] **Verification:** Illegal transitions are rejected with durable log and no request duplication.
- [ ] **Failure safety:** Missing selector, unavailable model, signed-out account, lost tab or unknown submission state must stop safely and show a truthful status.
- [ ] **Evidence:** Automated unit/integration fixture (offline) plus manual browser proof where a real site interaction is required.
- [ ] **Traceability:** Record changed files, relevant test command/results, a commit/PR reference (if implemented), and remaining limitations.

## Dependencies

[[JOB-001-define-versioned-job-and-jobattempt-schemas|JOB-001]]

## Suggested implementation steps

1. Review dependency tickets, [[MASTER-PLAN]], and relevant architecture/security guidelines; confirm the intended interface and constraints.
2. Write or update a failing test/fixture or a research verification checklist for this specific behavior.
3. Implement only this ticket's scoped change; do not expand into unrelated backlog tasks.
4. Execute positive, negative, and interruption tests; update documentation and reproducible evidence.
5. Request review, address findings and update ticket properties only after Definition of Done is satisfied.

## Verification notes

**Specific verification:** Illegal transitions are rejected with durable log and no request duplication.

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
