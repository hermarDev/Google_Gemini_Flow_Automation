---
id: VID-016
title: "Implement preflight settings and credit confirmation"
type: feature
status: backlog
priority: critical
sprint: "Sprint-04"
epic: EPIC-005
assignee: unassigned
story_points: null
depends_on: ["VID-005", "VID-006", "VID-007", "VID-008", "VID-009", "VID-010"]
created: 2026-10-19
updated: 2026-10-19
tags:
  - ai-media-automator
  - agile-ticket
  - vid
---

# VID-016 — Implement preflight settings and credit confirmation

> [!info] Ticket context
> **Sprint:** [[Sprint-04|Sprint-04]] · **Epic:** [[EPIC-005|EPIC-005]] · **Status:** `backlog` · **Priority:** `critical`

## User outcome and scope

Recheck actual model, duration, resolution, ratio, count, project and cost immediately before Generate.

## Acceptance criteria

- [ ] **Deliverable:** Recheck actual model, duration, resolution, ratio, count, project and cost immediately before Generate.
- [ ] **Verification:** Any drift forces reconfirmation; no auto-switch to higher-cost option.
- [ ] **Failure safety:** Missing selector, unavailable model, signed-out account, lost tab or unknown submission state must stop safely and show a truthful status.
- [ ] **Evidence:** Automated unit/integration fixture (offline) plus manual browser proof where a real site interaction is required.
- [ ] **Traceability:** Record changed files, relevant test command/results, a commit/PR reference (if implemented), and remaining limitations.

## Dependencies

[[VID-005-build-video-capability-matrix-engine|VID-005]], [[VID-006-build-date-stamped-video-credit-catalog|VID-006]], [[VID-007-implement-4-6-8-10-second-duration-selector|VID-007]], [[VID-008-implement-9-16-16-9-aspect-ratio-selection|VID-008]], [[VID-009-implement-resolution-controls-for-omni-video|VID-009]], [[VID-010-implement-video-output-variation-selector|VID-010]]

## Suggested implementation steps

1. Review dependency tickets, [[MASTER-PLAN]], and relevant architecture/security guidelines; confirm the intended interface and constraints.
2. Write or update a failing test/fixture or a research verification checklist for this specific behavior.
3. Implement only this ticket's scoped change; do not expand into unrelated backlog tasks.
4. Execute positive, negative, and interruption tests; update documentation and reproducible evidence.
5. Request review, address findings and update ticket properties only after Definition of Done is satisfied.

## Verification notes

**Specific verification:** Any drift forces reconfirmation; no auto-switch to higher-cost option.

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
