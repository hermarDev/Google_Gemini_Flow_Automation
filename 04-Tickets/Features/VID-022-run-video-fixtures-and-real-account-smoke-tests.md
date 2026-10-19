---
id: VID-022
title: "Run video fixtures and real-account smoke tests"
type: feature
status: backlog
priority: medium
sprint: "Sprint-04"
epic: EPIC-005
assignee: unassigned
story_points: null
depends_on: ["VID-016", "VID-019", "VID-021"]
created: 2026-10-19
updated: 2026-10-19
tags:
  - ai-media-automator
  - agile-ticket
  - vid
---

# VID-022 — Run video fixtures and real-account smoke tests

> [!info] Ticket context
> **Sprint:** [[Sprint-04|Sprint-04]] · **Epic:** [[EPIC-005|EPIC-005]] · **Status:** `backlog` · **Priority:** `medium`

## User outcome and scope

Test Omni default, 8s/10s, portrait/landscape and optional Veo selection with mocked and permitted live cases.

## Acceptance criteria

- [ ] **Deliverable:** Test Omni default, 8s/10s, portrait/landscape and optional Veo selection with mocked and permitted live cases.
- [ ] **Verification:** Capture redacted proof and known plan restrictions; avoid spending credits beyond agreed test budget.
- [ ] **Failure safety:** Missing selector, unavailable model, signed-out account, lost tab or unknown submission state must stop safely and show a truthful status.
- [ ] **Evidence:** Automated unit/integration fixture (offline) plus manual browser proof where a real site interaction is required.
- [ ] **Traceability:** Record changed files, relevant test command/results, a commit/PR reference (if implemented), and remaining limitations.

## Dependencies

[[VID-016-implement-preflight-settings-and-credit-confirmation|VID-016]], [[VID-019-implement-final-mp4-download-verification|VID-019]], [[VID-021-implement-video-specific-failure-taxonomy|VID-021]]

## Suggested implementation steps

1. Review dependency tickets, [[MASTER-PLAN]], and relevant architecture/security guidelines; confirm the intended interface and constraints.
2. Write or update a failing test/fixture or a research verification checklist for this specific behavior.
3. Implement only this ticket's scoped change; do not expand into unrelated backlog tasks.
4. Execute positive, negative, and interruption tests; update documentation and reproducible evidence.
5. Request review, address findings and update ticket properties only after Definition of Done is satisfied.

## Verification notes

**Specific verification:** Capture redacted proof and known plan restrictions; avoid spending credits beyond agreed test budget.

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
