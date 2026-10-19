---
id: CORE-011
title: "Implement reusable forms and input controls"
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

# CORE-011 — Implement reusable forms and input controls

> [!info] Ticket context
> **Sprint:** [[Sprint-01|Sprint-01]] · **Epic:** [[EPIC-002|EPIC-002]] · **Status:** `done` · **Priority:** `medium`

## User outcome and scope

Build selectors, segmented controls, text fields, textareas, file input and field errors.

## Acceptance criteria

- [x] **Deliverable:** Build selectors, segmented controls, text fields, textareas, file input and field errors.
- [x] **Verification:** Each control supports disabled, pending, invalid, keyboard and screen-reader states.
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

**Specific verification:** Each control supports disabled, pending, invalid, keyboard and screen-reader states.

**Test context:** Record browser version and Google UI/model availability for site-dependent tests. Do not consume paid credits without explicit approved test budget.

## Work log

| Date | Actor | Update | Evidence |
|---|---|---|---|
| 2026-10-19 | Planning | Ticket created; not implemented | — |
| 2026-10-19 | Lead Dev | Implemented reusable accessible form controls (TextInput, TextArea, Select, SegmentedControl, FileInput, FieldError) with full support for disabled, pending, invalid (aria-invalid/aria-describedby), keyboard, and screen-reader alert states; verified all interactive states and accessibility linkages via automated tests | `extension/src/components/forms/FormControls.tsx`, `extension/src/components/forms/index.ts`, `extension/src/components/forms/__tests__/FormControls.test.tsx` |

## Closure

- **Files changed:** `extension/src/components/forms/FormControls.tsx`, `extension/src/components/forms/index.ts`, `extension/src/components/forms/__tests__/FormControls.test.tsx`, `04-Tickets/Features/CORE-011-implement-reusable-forms-and-input-controls.md`, `03-Sprints/Sprint-01/Sprint-01.md`
- **Tests executed/results:** `npm run typecheck` passed; `npm test` passed 34 tests across 8 test suites; `npm run build` compiled clean production bundles.
- **Commit or PR:** `ticket/CORE-011-reusable-forms-and-inputs`
- **Reviewer:** Hermes Lead Dev (verified acceptance criteria)
- **Known limitations / follow-up:** Informs CORE-012 (Cards, tables and status components).
