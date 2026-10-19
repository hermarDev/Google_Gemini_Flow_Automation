---
id: VID-006
title: "Build date-stamped video credit catalog"
type: feature
status: backlog
priority: critical
sprint: "Sprint-04"
epic: EPIC-005
assignee: unassigned
story_points: null
depends_on: ["RES-010", "VID-005"]
created: 2026-10-19
updated: 2026-10-19
tags:
  - ai-media-automator
  - agile-ticket
  - vid
---

# VID-006 — Build date-stamped video credit catalog

> [!info] Ticket context
> **Sprint:** [[Sprint-04|Sprint-04]] · **Epic:** [[EPIC-005|EPIC-005]] · **Status:** `backlog` · **Priority:** `critical`

## User outcome and scope

Represent 720p Omni 10s 15 credits, 360p Omni 10s 7, 8s 12/6, Veo tiers with source-date and plan caveats.

## Acceptance criteria

- [ ] **Deliverable:** Represent 720p Omni 10s 15 credits, 360p Omni 10s 7, 8s 12/6, Veo tiers with source-date and plan caveats.
- [ ] **Verification:** Unknown or stale costs show estimate unavailable and prevent unconfirmed batches.
- [ ] **Failure safety:** Missing selector, unavailable model, signed-out account, lost tab or unknown submission state must stop safely and show a truthful status.
- [ ] **Evidence:** Automated unit/integration fixture (offline) plus manual browser proof where a real site interaction is required.
- [ ] **Traceability:** Record changed files, relevant test command/results, a commit/PR reference (if implemented), and remaining limitations.

## Dependencies

[[RES-010-verify-google-flow-credits-and-quota-rules|RES-010]], [[VID-005-build-video-capability-matrix-engine|VID-005]]

## Suggested implementation steps

1. Review dependency tickets, [[MASTER-PLAN]], and relevant architecture/security guidelines; confirm the intended interface and constraints.
2. Write or update a failing test/fixture or a research verification checklist for this specific behavior.
3. Implement only this ticket's scoped change; do not expand into unrelated backlog tasks.
4. Execute positive, negative, and interruption tests; update documentation and reproducible evidence.
5. Request review, address findings and update ticket properties only after Definition of Done is satisfied.

## Verification notes

**Specific verification:** Unknown or stale costs show estimate unavailable and prevent unconfirmed batches.

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
