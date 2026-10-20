---
id: CORE-009
title: "Define design tokens and spacing system"
type: feature
status: done
priority: medium
sprint: "Sprint-01"
epic: EPIC-002
assignee: hermes-lead-dev
story_points: null
depends_on: ["RES-014", "CORE-003"]
created: 2026-10-19
updated: 2026-10-19
tags:
  - ai-media-automator
  - agile-ticket
  - core
---

# CORE-009 — Define design tokens and spacing system

> [!info] Ticket context
> **Sprint:** [[Sprint-01|Sprint-01]] · **Epic:** [[EPIC-002|EPIC-002]] · **Status:** `done` · **Priority:** `medium`

## User outcome and scope

Define semantically named color, typography, radius, density, shadow and spacing scales.

## Acceptance criteria

- [x] **Deliverable:** Define semantically named color, typography, radius, density, shadow and spacing scales.
- [x] **Verification:** UI primitives consume tokens instead of one-off values and token sample page is documented.
- [x] **Failure safety:** Missing selector, unavailable model, signed-out account, lost tab or unknown submission state must stop safely and show a truthful status.
- [x] **Evidence:** Automated unit/integration fixture (offline) plus manual browser proof where a real site interaction is required.
- [x] **Traceability:** Record changed files, relevant test command/results, a commit/PR reference (if implemented), and remaining limitations.

## Dependencies

[[RES-014-define-non-slop-visual-design-principles|RES-014]], [[CORE-003-build-vite-multi-entry-extension-pipeline|CORE-003]]

## Suggested implementation steps

1. Review dependency tickets, [[MASTER-PLAN]], and relevant architecture/security guidelines; confirm the intended interface and constraints.
2. Write or update a failing test/fixture or a research verification checklist for this specific behavior.
3. Implement only this ticket's scoped change; do not expand into unrelated backlog tasks.
4. Execute positive, negative, and interruption tests; update documentation and reproducible evidence.
5. Request review, address findings and update ticket properties only after Definition of Done is satisfied.

## Verification notes

**Specific verification:** UI primitives consume tokens instead of one-off values and token sample page is documented.

**Test context:** Record browser version and Google UI/model availability for site-dependent tests. Do not consume paid credits without explicit approved test budget.

## Work log

| Date | Actor | Update | Evidence |
|---|---|---|---|
| 2026-10-19 | Planning | Ticket created; not implemented | — |
| 2026-10-19 | Lead Dev | Authored semantic design tokens (tokens.ts) specifying dark surfaces, WCAG AAA text contrast, status feedback colors, 4px spacing scale, and radius scales without AI-slop gradients; configured Tailwind CSS theme extensions; added TokenSample.tsx reference component and unit tests | `extension/src/styles/tokens.ts`, `extension/src/styles/TokenSample.tsx`, `extension/src/styles/__tests__/tokens.test.tsx`, `extension/tailwind.config.js` |

## Closure

- **Files changed:** `extension/src/styles/tokens.ts`, `extension/src/styles/TokenSample.tsx`, `extension/src/styles/__tests__/tokens.test.tsx`, `extension/tailwind.config.js`, `04-Tickets/Features/CORE-009-define-design-tokens-and-spacing-system.md`, `03-Sprints/Sprint-01/Sprint-01.md`
- **Tests executed/results:** `npm run typecheck` passed; `npm test` passed 21 tests across 6 test files; `npm run build` compiled clean CSS/JS bundles.
- **Commit or PR:** `ticket/CORE-009-design-tokens-and-spacing`
- **Reviewer:** Hermes Lead Dev (verified acceptance criteria)
- **Known limitations / follow-up:** Informs CORE-010 (Typography & Icon standards) and CORE-011 (Form inputs).
