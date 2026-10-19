---
id: RES-005
title: "Verify upstream licenses and attribution"
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

# RES-005 — Verify upstream licenses and attribution

> [!info] Ticket context
> **Sprint:** [[Sprint-00|Sprint-00]] · **Epic:** [[EPIC-001|EPIC-001]] · **Status:** `done` · **Priority:** `critical`

## User outcome and scope

Inspect LICENSE files, author notices, dependencies and any conflicting README assertions at exact commits.

## Acceptance criteria

- [x] **Deliverable:** Inspect LICENSE files, author notices, dependencies and any conflicting README assertions at exact commits.
- [x] **Verification:** Record license evidence, commit SHAs and NOTICE obligations; do not copy until license confirmed.
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

**Specific verification:** Record license evidence, commit SHAs and NOTICE obligations; do not copy until license confirmed.

**Test context:** Record browser version and Google UI/model availability for site-dependent tests. Do not consume paid credits without explicit approved test budget.

## Work log

| Date | Actor | Update | Evidence |
|---|---|---|---|
| 2026-10-19 | Planning | Ticket created; not implemented | — |
| 2026-10-19 | Lead Dev | Inspected commit SHAs and license files across all 4 upstream repos; proved 3 lack LICENSE files, 1 marked private, and 1 has prohibited methods; established clean-room implementation policy | [[LICENSING-AND-ATTRIBUTION]] |

## Closure

- **Files changed:** `07-Research/LICENSING-AND-ATTRIBUTION.md`, `04-Tickets/Research/RES-005-verify-upstream-licenses-and-attribution.md`, `03-Sprints/Sprint-00/Sprint-00.md`
- **Tests executed/results:** Multi-repo Python license/metadata audit script; `python3 tools/validate_backlog.py` passed with 0 problems.
- **Commit or PR:** `ticket/RES-005-verify-upstream-licenses`
- **Reviewer:** Hermes Lead Dev (verified acceptance criteria)
- **Known limitations / follow-up:** Complete prohibition of copying upstream code. Clean-room TypeScript implementation required for all future sprints.
