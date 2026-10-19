---
id: VID-011
title: "Implement text-to-video prompt workflow"
type: feature
status: backlog
priority: medium
sprint: "Sprint-04"
epic: EPIC-005
assignee: unassigned
story_points: null
depends_on: ["VID-003", "VID-007", "VID-008", "VID-009"]
created: 2026-10-19
updated: 2026-10-19
tags:
  - ai-media-automator
  - agile-ticket
  - vid
---

# VID-011 — Implement text-to-video prompt workflow

> [!info] Ticket context
> **Sprint:** [[Sprint-04|Sprint-04]] · **Epic:** [[EPIC-005|EPIC-005]] · **Status:** `backlog` · **Priority:** `medium`

## User outcome and scope

Create/preview text prompt with model, duration, resolution, ratio and cost summary.

## Acceptance criteria

- [ ] **Deliverable:** Create/preview text prompt with model, duration, resolution, ratio and cost summary.
- [ ] **Verification:** Submitted prompt and model settings match confirmation view exactly.
- [ ] **Failure safety:** Missing selector, unavailable model, signed-out account, lost tab or unknown submission state must stop safely and show a truthful status.
- [ ] **Evidence:** Automated unit/integration fixture (offline) plus manual browser proof where a real site interaction is required.
- [ ] **Traceability:** Record changed files, relevant test command/results, a commit/PR reference (if implemented), and remaining limitations.

## Dependencies

[[VID-003-set-gemini-omni-flash-720p-as-default-profile|VID-003]], [[VID-007-implement-4-6-8-10-second-duration-selector|VID-007]], [[VID-008-implement-9-16-16-9-aspect-ratio-selection|VID-008]], [[VID-009-implement-resolution-controls-for-omni-video|VID-009]]

## Suggested implementation steps

1. Review dependency tickets, [[MASTER-PLAN]], and relevant architecture/security guidelines; confirm the intended interface and constraints.
2. Write or update a failing test/fixture or a research verification checklist for this specific behavior.
3. Implement only this ticket's scoped change; do not expand into unrelated backlog tasks.
4. Execute positive, negative, and interruption tests; update documentation and reproducible evidence.
5. Request review, address findings and update ticket properties only after Definition of Done is satisfied.

## Verification notes

**Specific verification:** Submitted prompt and model settings match confirmation view exactly.

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
