---
id: QA-008
title: "Run selector-compatibility regression suite"
type: testing
status: backlog
priority: medium
sprint: "Sprint-08"
epic: EPIC-009
assignee: unassigned
story_points: null
depends_on: ["GEM-016", "IMG-016", "VID-022"]
created: 2026-10-19
updated: 2026-10-19
tags:
  - ai-media-automator
  - agile-ticket
  - qa
---

# QA-008 — Run selector-compatibility regression suite

> [!info] Ticket context
> **Sprint:** [[Sprint-08|Sprint-08]] · **Epic:** [[EPIC-009|EPIC-009]] · **Status:** `backlog` · **Priority:** `medium`

## User outcome and scope

Test Gemini and Flow fixtures including missing, renamed and ambiguous controls.

## Acceptance criteria

- [ ] **Deliverable:** Test Gemini and Flow fixtures including missing, renamed and ambiguous controls.
- [ ] **Verification:** Unknown page versions produce safe stop and maintenance issue, not random clicking.
- [ ] **Failure safety:** Any critical unresolved failure blocks release; a skipped paid live test is not a pass.
- [ ] **Evidence:** A reproducible report with commands, environment, result, failures and linked evidence; record skipped/not-applicable distinctly.
- [ ] **Traceability:** Record changed files, relevant test command/results, a commit/PR reference (if implemented), and remaining limitations.

## Dependencies

[[GEM-016-build-gemini-adapter-integration-fixtures|GEM-016]], [[IMG-016-create-flow-image-integration-tests|IMG-016]], [[VID-022-run-video-fixtures-and-real-account-smoke-tests|VID-022]]

## Suggested implementation steps

1. Review dependency tickets, [[MASTER-PLAN]], and relevant architecture/security guidelines; confirm the intended interface and constraints.
2. Write or update a failing test/fixture or a research verification checklist for this specific behavior.
3. Implement only this ticket's scoped change; do not expand into unrelated backlog tasks.
4. Execute positive, negative, and interruption tests; update documentation and reproducible evidence.
5. Request review, address findings and update ticket properties only after Definition of Done is satisfied.

## Verification notes

**Specific verification:** Unknown page versions produce safe stop and maintenance issue, not random clicking.

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
