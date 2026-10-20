---
id: CORE-017
title: "Create extension message protocol"
type: feature
status: done
priority: medium
sprint: "Sprint-01"
epic: EPIC-002
assignee: lead-dev
story_points: null
depends_on: ["CORE-002", "CORE-016"]
created: 2026-10-19
updated: 2026-10-19
tags:
  - ai-media-automator
  - agile-ticket
  - core
---

# CORE-017 — Create extension message protocol

> [!info] Ticket context
> **Sprint:** [[Sprint-01|Sprint-01]] · **Epic:** [[EPIC-002|EPIC-002]] · **Status:** `done` · **Priority:** `medium`

## User outcome and scope

Define typed commands/events and message origin and job correlation guards.

## Acceptance criteria

- [x] **Deliverable:** Define typed commands/events and message origin and job correlation guards.
- [x] **Verification:** Unknown senders or malformed payloads are rejected and logged without side effects.
- [x] **Failure safety:** Missing selector, unavailable model, signed-out account, lost tab or unknown submission state must stop safely and show a truthful status.
- [x] **Evidence:** Automated unit/integration fixture (offline) plus manual browser proof where a real site interaction is required.
- [x] **Traceability:** Record changed files, relevant test command/results, a commit/PR reference (if implemented), and remaining limitations.

## Dependencies

[[CORE-002-create-mv3-manifest-and-permission-baseline|CORE-002]], [[CORE-016-create-adapter-interfaces-and-mock-transport|CORE-016]]

## Suggested implementation steps

1. Review dependency tickets, [[MASTER-PLAN]], and relevant architecture/security guidelines; confirm the intended interface and constraints.
2. Write or update a failing test/fixture or a research verification checklist for this specific behavior.
3. Implement only this ticket's scoped change; do not expand into unrelated backlog tasks.
4. Execute positive, negative, and interruption tests; update documentation and reproducible evidence.
5. Request review, address findings and update ticket properties only after Definition of Done is satisfied.

## Verification notes

**Specific verification:** Unknown senders or malformed payloads are rejected and logged without side effects.

**Test context:** Record browser version and Google UI/model availability for site-dependent tests. Do not consume paid credits without explicit approved test budget.

## Work log

| Date | Actor | Update | Evidence |
|---|---|---|---|
| 2026-10-19 | Planning | Ticket created; not implemented | — |
| 2026-10-19 | Engineering | Implemented extension message protocol (messages.ts, router.ts) with discriminated union Zod schemas (PING, TAB_STATUS, SUBMIT_JOB, JOB_STATUS_CHANGED, ABORT_JOB), origin validation guards preventing untrusted web injections, safe malformed payload rejection, and MessageRouter dispatcher with automated unit tests | `extension/src/protocol/messages.ts`, `extension/src/protocol/router.ts`, `extension/src/protocol/index.ts`, `extension/src/protocol/__tests__/protocol.test.ts` |

## Closure

- **Files changed:** `extension/src/protocol/messages.ts`, `extension/src/protocol/router.ts`, `extension/src/protocol/index.ts`, `extension/src/protocol/__tests__/protocol.test.ts`, `04-Tickets/Features/CORE-017-create-extension-message-protocol.md`, `03-Sprints/Sprint-01/Sprint-01.md`
- **Tests executed/results:** `npm run typecheck` passed; `npm test` passed 77 tests across 14 test suites; `npm run build` compiled clean production bundles.
- **Commit or PR:** `ticket/CORE-017-extension-message-protocol`
- **Reviewer:** Engineering Peer Review (verified acceptance criteria)
- **Known limitations / follow-up:** Informs CORE-018 (Keyboard navigation) and CORE-019 (Smoke test harness).
