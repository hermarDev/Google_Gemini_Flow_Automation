---
id: GEM-012
title: "Implement Gemini prompt import parser"
type: feature
status: backlog
priority: medium
sprint: "Sprint-02"
epic: EPIC-003
assignee: unassigned
story_points: null
depends_on: ["GEM-005"]
created: 2026-10-19
updated: 2026-10-19
tags:
  - ai-media-automator
  - agile-ticket
  - gem
---

# GEM-012 — Implement Gemini prompt import parser

> [!info] Ticket context
> **Sprint:** [[Sprint-02|Sprint-02]] · **Epic:** [[EPIC-003|EPIC-003]] · **Status:** `backlog` · **Priority:** `medium`

## User outcome and scope

Accept one-prompt-per-block, TXT and structured JSON with per-job titles.

## Acceptance criteria

- [ ] **Deliverable:** Accept one-prompt-per-block, TXT and structured JSON with per-job titles.
- [ ] **Verification:** Invalid or duplicate entries show line-level validation and no jobs submitted.
- [ ] **Failure safety:** Missing selector, unavailable model, signed-out account, lost tab or unknown submission state must stop safely and show a truthful status.
- [ ] **Evidence:** Automated unit/integration fixture (offline) plus manual browser proof where a real site interaction is required.
- [ ] **Traceability:** Record changed files, relevant test command/results, a commit/PR reference (if implemented), and remaining limitations.

## Dependencies

[[GEM-005-create-gemini-image-prompt-form-and-preview|GEM-005]]

## Suggested implementation steps

1. Review dependency tickets, [[MASTER-PLAN]], and relevant architecture/security guidelines; confirm the intended interface and constraints.
2. Write or update a failing test/fixture or a research verification checklist for this specific behavior.
3. Implement only this ticket's scoped change; do not expand into unrelated backlog tasks.
4. Execute positive, negative, and interruption tests; update documentation and reproducible evidence.
5. Request review, address findings and update ticket properties only after Definition of Done is satisfied.

## Verification notes

**Specific verification:** Invalid or duplicate entries show line-level validation and no jobs submitted.

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
