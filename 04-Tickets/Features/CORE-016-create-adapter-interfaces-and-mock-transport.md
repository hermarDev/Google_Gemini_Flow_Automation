---
id: CORE-016
title: "Create adapter interfaces and mock transport"
type: feature
status: done
priority: medium
sprint: "Sprint-01"
epic: EPIC-002
assignee: lead-dev
story_points: null
depends_on: ["RES-016", "CORE-004"]
created: 2026-10-19
updated: 2026-10-19
tags:
  - ai-media-automator
  - agile-ticket
  - core
---

# CORE-016 — Create adapter interfaces and mock transport

> [!info] Ticket context
> **Sprint:** [[Sprint-01|Sprint-01]] · **Epic:** [[EPIC-002|EPIC-002]] · **Status:** `done` · **Priority:** `medium`

## User outcome and scope

Define site adapter lifecycle, capabilities, submit/status/download abstractions and typed errors.

## Acceptance criteria

- [x] **Deliverable:** Define site adapter lifecycle, capabilities, submit/status/download abstractions and typed errors.
- [x] **Verification:** Both Gemini and Flow stub adapters can be swapped without modifying UI business logic.
- [x] **Failure safety:** Missing selector, unavailable model, signed-out account, lost tab or unknown submission state must stop safely and show a truthful status.
- [x] **Evidence:** Automated unit/integration fixture (offline) plus manual browser proof where a real site interaction is required.
- [x] **Traceability:** Record changed files, relevant test command/results, a commit/PR reference (if implemented), and remaining limitations.

## Dependencies

[[RES-016-approve-architecture-decision-record|RES-016]], [[CORE-004-configure-formatting-static-analysis-and-typescript-strict|CORE-004]]

## Suggested implementation steps

1. Review dependency tickets, [[MASTER-PLAN]], and relevant architecture/security guidelines; confirm the intended interface and constraints.
2. Write or update a failing test/fixture or a research verification checklist for this specific behavior.
3. Implement only this ticket's scoped change; do not expand into unrelated backlog tasks.
4. Execute positive, negative, and interruption tests; update documentation and reproducible evidence.
5. Request review, address findings and update ticket properties only after Definition of Done is satisfied.

## Verification notes

**Specific verification:** Both Gemini and Flow stub adapters can be swapped without modifying UI business logic.

**Test context:** Record browser version and Google UI/model availability for site-dependent tests. Do not consume paid credits without explicit approved test budget.

## Work log

| Date | Actor | Update | Evidence |
|---|---|---|---|
| 2026-10-19 | Planning | Ticket created; not implemented | — |
| 2026-10-19 | Engineering | Implemented polymorphic SiteAdapter interface, typed error hierarchy (SelectorNotFoundError, ModelUnavailableError, SessionSignedOutError, CreditDepletedError, PolicyRefusalError, AmbiguousSubmissionError), mock adapter with configurable failure simulations, Flow and Gemini stub adapters, and adapter factory; verified swappability and error propagation via automated tests | `extension/src/adapters/types.ts`, `extension/src/adapters/mock.ts`, `extension/src/adapters/flow.ts`, `extension/src/adapters/gemini.ts`, `extension/src/adapters/factory.ts`, `extension/src/adapters/__tests__/adapters.test.ts` |

## Closure

- **Files changed:** `extension/src/adapters/types.ts`, `extension/src/adapters/mock.ts`, `extension/src/adapters/flow.ts`, `extension/src/adapters/gemini.ts`, `extension/src/adapters/factory.ts`, `extension/src/adapters/index.ts`, `extension/src/adapters/__tests__/adapters.test.ts`, `04-Tickets/Features/CORE-016-create-adapter-interfaces-and-mock-transport.md`, `03-Sprints/Sprint-01/Sprint-01.md`
- **Tests executed/results:** `npm run typecheck` passed; `npm test` passed 67 tests across 13 test suites; `npm run build` compiled clean production bundles.
- **Commit or PR:** `ticket/CORE-016-adapter-interfaces-and-mock`
- **Reviewer:** Engineering Peer Review (verified acceptance criteria)
- **Known limitations / follow-up:** Informs CORE-017 (Extension message protocol). Real DOM interactions will be added in adapter sprint.
