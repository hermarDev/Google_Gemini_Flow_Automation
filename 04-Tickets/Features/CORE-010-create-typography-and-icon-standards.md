---
id: CORE-010
title: "Create typography and icon standards"
type: feature
status: done
priority: medium
sprint: "Sprint-01"
epic: EPIC-002
assignee: hermes-lead-dev
story_points: null
depends_on: ["CORE-009"]
created: 2026-10-19
updated: 2026-10-19
tags:
  - ai-media-automator
  - agile-ticket
  - core
---

# CORE-010 — Create typography and icon standards

> [!info] Ticket context
> **Sprint:** [[Sprint-01|Sprint-01]] · **Epic:** [[EPIC-002|EPIC-002]] · **Status:** `done` · **Priority:** `medium`

## User outcome and scope

Select accessible local fonts or system stack, icon size vocabulary and content hierarchy.

## Acceptance criteria

- [x] **Deliverable:** Select accessible local fonts or system stack, icon size vocabulary and content hierarchy.
- [x] **Verification:** No unlicensed type assets, emoji-as-icon navigation or inconsistent text scales.
- [x] **Failure safety:** Missing selector, unavailable model, signed-out account, lost tab or unknown submission state must stop safely and show a truthful status.
- [x] **Evidence:** Automated unit/integration fixture (offline) plus manual browser proof where a real site interaction is required.
- [x] **Traceability:** Record changed files, relevant test command/results, a commit/PR reference (if implemented), and remaining limitations.

## Dependencies

[[CORE-009-define-design-tokens-and-spacing-system|CORE-009]]

## Suggested implementation steps

1. Review dependency tickets, [[MASTER-PLAN]], and relevant architecture/security guidelines; confirm the intended interface and constraints.
2. Write or update a failing test/fixture or a research verification checklist for this specific behavior.
3. Implement only this ticket's scoped change; do not expand into unrelated backlog tasks.
4. Execute positive, negative, and interruption tests; update documentation and reproducible evidence.
5. Request review, address findings and update ticket properties only after Definition of Done is satisfied.

## Verification notes

**Specific verification:** No unlicensed type assets, emoji-as-icon navigation or inconsistent text scales.

**Test context:** Record browser version and Google UI/model availability for site-dependent tests. Do not consume paid credits without explicit approved test budget.

## Work log

| Date | Actor | Update | Evidence |
|---|---|---|---|
| 2026-10-19 | Planning | Ticket created; not implemented | — |
| 2026-10-19 | Lead Dev | Authored typography & icon standards (typography.ts) specifying system font stacks with zero web font dependencies, strict 6-tier typography scale, 5-tier SVG icon vocabulary (12px to 24px), and zero emoji-as-icon navigation validator; added TypographyReference.tsx component and comprehensive test suite | `extension/src/styles/typography.ts`, `extension/src/styles/TypographyReference.tsx`, `extension/src/styles/__tests__/typography.test.tsx` |

## Closure

- **Files changed:** `extension/src/styles/typography.ts`, `extension/src/styles/TypographyReference.tsx`, `extension/src/styles/__tests__/typography.test.tsx`, `04-Tickets/Features/CORE-010-create-typography-and-icon-standards.md`, `03-Sprints/Sprint-01/Sprint-01.md`
- **Tests executed/results:** `npm run typecheck` passed; `npm test` passed 25 tests across 7 test files; `npm run build` compiled clean CSS/JS bundles.
- **Commit or PR:** `ticket/CORE-010-typography-and-icons`
- **Reviewer:** Hermes Lead Dev (verified acceptance criteria)
- **Known limitations / follow-up:** Informs CORE-011 (Form and input controls) and CORE-012 (Cards & status components).
