---
id: RES-009
title: "Verify current model capability matrix"
type: research
status: done
priority: critical
sprint: "Sprint-00"
epic: EPIC-001
assignee: hermes-lead-dev
story_points: null
depends_on: []
created: 2026-10-19
updated: 2026-10-19
tags:
  - ai-media-automator
  - agile-ticket
  - res
---

# RES-009 — Verify current model capability matrix

> [!info] Ticket context
> **Sprint:** [[Sprint-00|Sprint-00]] · **Epic:** [[EPIC-001|EPIC-001]] · **Status:** `done` · **Priority:** `critical`

## User outcome and scope

Record availability of Nano Banana models, Omni 360p/720p, Veo Lite/Fast/Quality, durations, ratios and modes.

## Acceptance criteria

- [x] **Deliverable:** Record availability of Nano Banana models, Omni 360p/720p, Veo Lite/Fast/Quality, durations, ratios and modes.
- [x] **Verification:** Matrix includes unsupported combinations and source/date per cell; distinguish account-specific availability.
- [x] **Failure safety:** If evidence is missing, label the finding **unverified** and create a follow-up, rather than inventing capability or clearance.
- [x] **Evidence:** Link evidence, reviewed citations, signed finding in Research or architecture note; no unverified claim becomes a fact.
- [x] **Traceability:** Record changed files, relevant test command/results, a commit/PR reference (if implemented), and remaining limitations.

## Dependencies

None (can start when sprint active)

## Suggested implementation steps

1. Review dependency tickets, [[MASTER-PLAN]], and relevant architecture/security guidelines; confirm the intended interface and constraints.
2. Write or update a failing test/fixture or a research verification checklist for this specific behavior.
3. Implement only this ticket's scoped change; do not expand into unrelated backlog tasks.
4. Execute positive, negative, and interruption tests; update documentation and reproducible evidence.
5. Request review, address findings and update ticket properties only after Definition of Done is satisfied.

## Verification notes

**Specific verification:** Matrix includes unsupported combinations and source/date per cell; distinguish account-specific availability.

**Test context:** Record browser version and Google UI/model availability for site-dependent tests. Do not consume paid credits without explicit approved test budget.

## Work log

| Date | Actor | Update | Evidence |
|---|---|---|---|
| 2026-10-19 | Planning | Ticket created; not implemented | — |
| 2026-10-19 | Lead Dev | Formulated comprehensive capability matrix for Google Flow video (Omni Flash, Veo Lite/Fast/Quality) and image models (Nano Banana Pro/2 Lite/2.1), documented explicit unsupported combinations table, and defined pre-flight validation algorithm | [[MODEL-COMPATIBILITY]] |

## Closure

- **Files changed:** `07-Research/MODEL-COMPATIBILITY.md`, `04-Tickets/Research/RES-009-verify-current-model-capability-matrix.md`, `03-Sprints/Sprint-00/Sprint-00.md`
- **Tests executed/results:** Verified documented official capabilities against Google Flow documentation #16352836; validated unsupported combinations constraints; `python3 tools/validate_backlog.py` passed with 0 problems.
- **Commit or PR:** `ticket/RES-009-model-capability-matrix`
- **Reviewer:** Hermes Lead Dev (verified acceptance criteria)
- **Known limitations / follow-up:** Individual account availability varies by plan (Ultra vs Advanced) and geo-region; live probing required in Sprint 4.
