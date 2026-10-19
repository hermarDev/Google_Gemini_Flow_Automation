---
id: VID-004
title: "Provide Veo as optional model family"
type: feature
status: backlog
priority: high
sprint: "Sprint-04"
epic: EPIC-005
assignee: unassigned
story_points: null
depends_on: ["VID-002"]
created: 2026-10-19
updated: 2026-10-19
tags:
  - ai-media-automator
  - agile-ticket
  - vid
---

# VID-004 — Provide Veo as optional model family

> [!info] Ticket context
> **Sprint:** [[Sprint-04|Sprint-04]] · **Epic:** [[EPIC-005|EPIC-005]] · **Status:** `backlog` · **Priority:** `high`

## User outcome and scope

Expose available Veo Lite/Fast/Quality options with relevant warnings/limits.

## Acceptance criteria

- [ ] **Deliverable:** Expose available Veo Lite/Fast/Quality options with relevant warnings/limits.
- [ ] **Verification:** Switching to Veo preserves prompt but resets invalid 10s duration only with user notice.
- [ ] **Failure safety:** Missing selector, unavailable model, signed-out account, lost tab or unknown submission state must stop safely and show a truthful status.
- [ ] **Evidence:** Automated unit/integration fixture (offline) plus manual browser proof where a real site interaction is required.
- [ ] **Traceability:** Record changed files, relevant test command/results, a commit/PR reference (if implemented), and remaining limitations.

## Dependencies

[[VID-002-implement-live-video-model-discovery|VID-002]]

## Suggested implementation steps

1. Review dependency tickets, [[MASTER-PLAN]], and relevant architecture/security guidelines; confirm the intended interface and constraints.
2. Write or update a failing test/fixture or a research verification checklist for this specific behavior.
3. Implement only this ticket's scoped change; do not expand into unrelated backlog tasks.
4. Execute positive, negative, and interruption tests; update documentation and reproducible evidence.
5. Request review, address findings and update ticket properties only after Definition of Done is satisfied.

## Verification notes

**Specific verification:** Switching to Veo preserves prompt but resets invalid 10s duration only with user notice.

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
