---
id: RES-014
title: "Define non-slop visual design principles"
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

# RES-014 — Define non-slop visual design principles

> [!info] Ticket context
> **Sprint:** [[Sprint-00|Sprint-00]] · **Epic:** [[EPIC-001|EPIC-001]] · **Status:** `done` · **Priority:** `medium`

## User outcome and scope

Specify restrained visual language, typography, spacing, hierarchy, icons, states and motion guidelines.

## Acceptance criteria

- [x] **Deliverable:** Specify restrained visual language, typography, spacing, hierarchy, icons, states and motion guidelines.
- [x] **Verification:** Document anti-patterns and provide annotated low-fidelity screen checklist.
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

**Specific verification:** Document anti-patterns and provide annotated low-fidelity screen checklist.

**Test context:** Record browser version and Google UI/model availability for site-dependent tests. Do not consume paid credits without explicit approved test budget.

## Work log

| Date | Actor | Update | Evidence |
|---|---|---|---|
| 2026-10-19 | Planning | Ticket created; not implemented | — |
| 2026-10-19 | Lead Dev | Formulated comprehensive visual design system: restrained zinc color palette, zero-remote-font typography stack, 4px layout rhythm, strict anti-AI-slop blacklist (zero purple neon gradients, zero glassmorphism, zero fake progress percentages), and annotated low-fidelity screen checklist | [[VISUAL-DESIGN-SYSTEM]] |

## Closure

- **Files changed:** `07-Research/VISUAL-DESIGN-SYSTEM.md`, `04-Tickets/Research/RES-014-define-non-slop-visual-design-principles.md`, `03-Sprints/Sprint-00/Sprint-00.md`
- **Tests executed/results:** Verified WCAG contrast ratios and anti-pattern exclusions against UI/UX Guidelines; `python3 tools/validate_backlog.py` passed with 0 problems.
- **Commit or PR:** `ticket/RES-014-visual-design-principles`
- **Reviewer:** Hermes Lead Dev (verified acceptance criteria)
- **Known limitations / follow-up:** Informs CSS tokens and component styles in Sprint 1 implementation.
