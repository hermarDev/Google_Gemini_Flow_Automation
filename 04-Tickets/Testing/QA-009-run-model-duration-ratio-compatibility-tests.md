---
id: QA-009
title: "Run model-duration-ratio compatibility tests"
type: testing
status: backlog
priority: medium
sprint: "Sprint-08"
epic: EPIC-009
assignee: unassigned
story_points: null
depends_on: ["VID-005", "CFG-003"]
created: 2026-10-19
updated: 2026-10-19
tags:
  - ai-media-automator
  - agile-ticket
  - qa
---

# QA-009 — Run model-duration-ratio compatibility tests

> [!info] Ticket context
> **Sprint:** [[Sprint-08|Sprint-08]] · **Epic:** [[EPIC-009|EPIC-009]] · **Status:** `backlog` · **Priority:** `medium`

## User outcome and scope

Cover Omni 360/720 4/6/8/10 and Veo supported combinations with true/false cases.

## Acceptance criteria

- [ ] **Deliverable:** Cover Omni 360/720 4/6/8/10 and Veo supported combinations with true/false cases.
- [ ] **Verification:** Invalid 10s Veo is blocked; valid 9:16 and 16:9 combinations validated.
- [ ] **Failure safety:** Any critical unresolved failure blocks release; a skipped paid live test is not a pass.
- [ ] **Evidence:** A reproducible report with commands, environment, result, failures and linked evidence; record skipped/not-applicable distinctly.
- [ ] **Traceability:** Record changed files, relevant test command/results, a commit/PR reference (if implemented), and remaining limitations.

## Dependencies

[[VID-005-build-video-capability-matrix-engine|VID-005]], [[CFG-003-add-portrait-landscape-and-short-video-quick-presets|CFG-003]]

## Suggested implementation steps

1. Review dependency tickets, [[MASTER-PLAN]], and relevant architecture/security guidelines; confirm the intended interface and constraints.
2. Write or update a failing test/fixture or a research verification checklist for this specific behavior.
3. Implement only this ticket's scoped change; do not expand into unrelated backlog tasks.
4. Execute positive, negative, and interruption tests; update documentation and reproducible evidence.
5. Request review, address findings and update ticket properties only after Definition of Done is satisfied.

## Verification notes

**Specific verification:** Invalid 10s Veo is blocked; valid 9:16 and 16:9 combinations validated.

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
