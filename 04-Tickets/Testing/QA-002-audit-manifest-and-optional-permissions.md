---
id: QA-002
title: "Audit manifest and optional permissions"
type: testing
status: backlog
priority: high
sprint: "Sprint-08"
epic: EPIC-009
assignee: unassigned
story_points: null
depends_on: ["CORE-002", "QA-001"]
created: 2026-10-19
updated: 2026-10-19
tags:
  - ai-media-automator
  - agile-ticket
  - qa
---

# QA-002 — Audit manifest and optional permissions

> [!info] Ticket context
> **Sprint:** [[Sprint-08|Sprint-08]] · **Epic:** [[EPIC-009|EPIC-009]] · **Status:** `backlog` · **Priority:** `high`

## User outcome and scope

Verify no default debugger, broad hosts or unnecessary tabs permissions; document optional grants.

## Acceptance criteria

- [ ] **Deliverable:** Verify no default debugger, broad hosts or unnecessary tabs permissions; document optional grants.
- [ ] **Verification:** Build fails audit when unexpected origin/privilege is added.
- [ ] **Failure safety:** Any critical unresolved failure blocks release; a skipped paid live test is not a pass.
- [ ] **Evidence:** A reproducible report with commands, environment, result, failures and linked evidence; record skipped/not-applicable distinctly.
- [ ] **Traceability:** Record changed files, relevant test command/results, a commit/PR reference (if implemented), and remaining limitations.

## Dependencies

[[CORE-002-create-mv3-manifest-and-permission-baseline|CORE-002]], [[QA-001-review-extension-threat-model-against-implementation|QA-001]]

## Suggested implementation steps

1. Review dependency tickets, [[MASTER-PLAN]], and relevant architecture/security guidelines; confirm the intended interface and constraints.
2. Write or update a failing test/fixture or a research verification checklist for this specific behavior.
3. Implement only this ticket's scoped change; do not expand into unrelated backlog tasks.
4. Execute positive, negative, and interruption tests; update documentation and reproducible evidence.
5. Request review, address findings and update ticket properties only after Definition of Done is satisfied.

## Verification notes

**Specific verification:** Build fails audit when unexpected origin/privilege is added.

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
