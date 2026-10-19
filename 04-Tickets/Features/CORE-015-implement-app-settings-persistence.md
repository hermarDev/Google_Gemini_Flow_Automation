---
id: CORE-015
title: "Implement app settings persistence"
type: feature
status: done
priority: medium
sprint: "Sprint-01"
epic: EPIC-002
assignee: lead-dev
story_points: null
depends_on: ["CORE-002"]
created: 2026-10-19
updated: 2026-10-19
tags:
  - ai-media-automator
  - agile-ticket
  - core
---

# CORE-015 — Implement app settings persistence

> [!info] Ticket context
> **Sprint:** [[Sprint-01|Sprint-01]] · **Epic:** [[EPIC-002|EPIC-002]] · **Status:** `done` · **Priority:** `medium`

## User outcome and scope

Store non-sensitive defaults and preferences with schema version and safe read/write wrapper.

## Acceptance criteria

- [x] **Deliverable:** Store non-sensitive defaults and preferences with schema version and safe read/write wrapper.
- [x] **Verification:** Browser refresh and extension restart restore preferences; corrupt values fall back safely.
- [x] **Failure safety:** Missing selector, unavailable model, signed-out account, lost tab or unknown submission state must stop safely and show a truthful status.
- [x] **Evidence:** Automated unit/integration fixture (offline) plus manual browser proof where a real site interaction is required.
- [x] **Traceability:** Record changed files, relevant test command/results, a commit/PR reference (if implemented), and remaining limitations.

## Dependencies

[[CORE-002-create-mv3-manifest-and-permission-baseline|CORE-002]]

## Suggested implementation steps

1. Review dependency tickets, [[MASTER-PLAN]], and relevant architecture/security guidelines; confirm the intended interface and constraints.
2. Write or update a failing test/fixture or a research verification checklist for this specific behavior.
3. Implement only this ticket's scoped change; do not expand into unrelated backlog tasks.
4. Execute positive, negative, and interruption tests; update documentation and reproducible evidence.
5. Request review, address findings and update ticket properties only after Definition of Done is satisfied.

## Verification notes

**Specific verification:** Browser refresh and extension restart restore preferences; corrupt values fall back safely.

**Test context:** Record browser version and Google UI/model availability for site-dependent tests. Do not consume paid credits without explicit approved test budget.

## Work log

| Date | Actor | Update | Evidence |
|---|---|---|---|
| 2026-10-19 | Planning | Ticket created; not implemented | — |
| 2026-10-19 | Engineering | Implemented versioned app settings persistence module (settings.ts) with Zod validation, safe corrupt schema fallback, directory traversal protections on download subfolders, storage wrapper, and automated tests | `extension/src/shared/settings.ts`, `extension/src/shared/__tests__/settings.test.ts` |

## Closure

- **Files changed:** `extension/src/shared/settings.ts`, `extension/src/shared/__tests__/settings.test.ts`, `04-Tickets/Features/CORE-015-implement-app-settings-persistence.md`, `03-Sprints/Sprint-01/Sprint-01.md`
- **Tests executed/results:** `npm run typecheck` passed; `npm test` passed 58 tests across 12 test suites; `npm run build` compiled clean production bundles.
- **Commit or PR:** `ticket/CORE-015-app-settings-persistence`
- **Reviewer:** Engineering Peer Review (verified acceptance criteria)
- **Known limitations / follow-up:** Informs CORE-016 (Adapter interfaces) and CORE-017 (Extension message protocol).
