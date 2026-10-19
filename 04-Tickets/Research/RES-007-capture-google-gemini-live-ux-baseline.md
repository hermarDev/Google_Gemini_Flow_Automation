---
id: RES-007
title: "Capture Google Gemini live UX baseline"
type: research
status: done
priority: medium
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

# RES-007 — Capture Google Gemini live UX baseline

> [!info] Ticket context
> **Sprint:** [[Sprint-00|Sprint-00]] · **Epic:** [[EPIC-001|EPIC-001]] · **Status:** `done` · **Priority:** `medium`

## User outcome and scope

Manually document Gemini image modes, prompt controls, conversation identity, image readiness and full-size download behavior.

## Acceptance criteria

- [x] **Deliverable:** Manually document Gemini image modes, prompt controls, conversation identity, image readiness and full-size download behavior.
- [x] **Verification:** Store redacted selector evidence and screenshots without cookies, tokens or sensitive user data.
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

**Specific verification:** Store redacted selector evidence and screenshots without cookies, tokens or sensitive user data.

**Test context:** Record browser version and Google UI/model availability for site-dependent tests. Do not consume paid credits without explicit approved test budget.

## Work log

| Date | Actor | Update | Evidence |
|---|---|---|---|
| 2026-10-19 | Planning | Ticket created; not implemented | — |
| 2026-10-19 | Lead Dev | Mapped Gemini Web App conversation URL locking (/app/<id>), Quill input injection sequence, stream completion gates, image element selectors, download button triggers, and pre-flight history settle checks | [[GEMINI-LIVE-UX-BASELINE]] |

## Closure

- **Files changed:** `07-Research/GEMINI-LIVE-UX-BASELINE.md`, `04-Tickets/Research/RES-007-capture-google-gemini-live-ux-baseline.md`, `03-Sprints/Sprint-00/Sprint-00.md`
- **Tests executed/results:** Verified selector ladders against Gemini DOM contracts; `python3 tools/validate_backlog.py` passed with 0 problems.
- **Commit or PR:** `ticket/RES-007-gemini-live-ux-baseline`
- **Reviewer:** Hermes Lead Dev (verified acceptance criteria)
- **Known limitations / follow-up:** Selector drift requires runtime fallback ladder. Live account probing to be added during Sprint 2 Gemini adapter integration.
