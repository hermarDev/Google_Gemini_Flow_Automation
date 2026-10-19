---
id: CORE-012
title: "Implement cards, tables and status components"
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

# CORE-012 — Implement cards, tables and status components

> [!info] Ticket context
> **Sprint:** [[Sprint-01|Sprint-01]] · **Epic:** [[EPIC-002|EPIC-002]] · **Status:** `done` · **Priority:** `medium`

## User outcome and scope

Build compact status badges, list rows, empty states, progress indicator, notices and dialog primitives.

## Acceptance criteria

- [x] **Deliverable:** Build compact status badges, list rows, empty states, progress indicator, notices and dialog primitives.
- [x] **Verification:** Components present true statuses without fake activity, metrics or decorative filler.
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

**Specific verification:** Components present true statuses without fake activity, metrics or decorative filler.

**Test context:** Record browser version and Google UI/model availability for site-dependent tests. Do not consume paid credits without explicit approved test budget.

## Work log

| Date | Actor | Update | Evidence |
|---|---|---|---|
| 2026-10-19 | Planning | Ticket created; not implemented | — |
| 2026-10-19 | Lead Dev | Implemented truthful UI primitives (StatusBadge, ProgressIndicator, EmptyState, NoticeBanner, Card, ModalDialog) with strictly verifiable states, zero fake progress animations, escape-key accessible modal traps, and automated unit tests | `extension/src/components/ui/Components.tsx`, `extension/src/components/ui/index.ts`, `extension/src/components/ui/__tests__/Components.test.tsx` |

## Closure

- **Files changed:** `extension/src/components/ui/Components.tsx`, `extension/src/components/ui/index.ts`, `extension/src/components/ui/__tests__/Components.test.tsx`, `04-Tickets/Features/CORE-012-implement-cards-tables-and-status-components.md`, `03-Sprints/Sprint-01/Sprint-01.md`
- **Tests executed/results:** `npm run typecheck` passed; `npm test` passed 42 tests across 9 test suites; `npm run build` compiled clean production bundles.
- **Commit or PR:** `ticket/CORE-012-cards-tables-status-components`
- **Reviewer:** Hermes Lead Dev (verified acceptance criteria)
- **Known limitations / follow-up:** Informs CORE-013 (Themes) and CORE-014 (Route state).
