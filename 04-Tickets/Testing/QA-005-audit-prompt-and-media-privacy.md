---
id: QA-005
title: "Audit prompt and media privacy"
type: testing
status: backlog
priority: medium
sprint: "Sprint-08"
epic: EPIC-009
assignee: unassigned
story_points: null
depends_on: ["JOB-012", "CFG-017"]
created: 2026-10-19
updated: 2026-10-19
tags:
  - ai-media-automator
  - agile-ticket
  - qa
---

# QA-005 — Audit prompt and media privacy

> [!info] Ticket context
> **Sprint:** [[Sprint-08|Sprint-08]] · **Epic:** [[EPIC-009|EPIC-009]] · **Status:** `backlog` · **Priority:** `medium`

## User outcome and scope

Verify no cookies, tokens, hidden metadata or prompts leak via logs, exports or analytics.

## Acceptance criteria

- [ ] **Deliverable:** Verify no cookies, tokens, hidden metadata or prompts leak via logs, exports or analytics.
- [ ] **Verification:** Sanitized support bundle passes secret-pattern test and manual review.
- [ ] **Failure safety:** Any critical unresolved failure blocks release; a skipped paid live test is not a pass.
- [ ] **Evidence:** A reproducible report with commands, environment, result, failures and linked evidence; record skipped/not-applicable distinctly.
- [ ] **Traceability:** Record changed files, relevant test command/results, a commit/PR reference (if implemented), and remaining limitations.

## Dependencies

[[JOB-012-implement-live-job-events-and-activity-log|JOB-012]], [[CFG-017-implement-local-diagnostic-opt-in-and-privacy-policy|CFG-017]]

## Suggested implementation steps

1. Review dependency tickets, [[MASTER-PLAN]], and relevant architecture/security guidelines; confirm the intended interface and constraints.
2. Write or update a failing test/fixture or a research verification checklist for this specific behavior.
3. Implement only this ticket's scoped change; do not expand into unrelated backlog tasks.
4. Execute positive, negative, and interruption tests; update documentation and reproducible evidence.
5. Request review, address findings and update ticket properties only after Definition of Done is satisfied.

## Verification notes

**Specific verification:** Sanitized support bundle passes secret-pattern test and manual review.

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
