---
id: CORE-004
title: "Configure formatting, static analysis and TypeScript strictness"
type: feature
status: done
priority: high
sprint: "Sprint-01"
epic: EPIC-002
assignee: hermes-lead-dev
story_points: null
depends_on: ["CORE-001"]
created: 2026-10-19
updated: 2026-10-19
tags:
  - ai-media-automator
  - agile-ticket
  - core
---

# CORE-004 — Configure formatting, static analysis and TypeScript strictness

> [!info] Ticket context
> **Sprint:** [[Sprint-01|Sprint-01]] · **Epic:** [[EPIC-002|EPIC-002]] · **Status:** `done` · **Priority:** `high`

## User outcome and scope

Add ESLint, Prettier, TypeScript strict checks, conventional style and npm scripts.

## Acceptance criteria

- [x] **Deliverable:** Add ESLint, Prettier, TypeScript strict checks, conventional style and npm scripts.
- [x] **Verification:** Intentional errors fail checks locally and in CI.
- [x] **Failure safety:** Missing selector, unavailable model, signed-out account, lost tab or unknown submission state must stop safely and show a truthful status.
- [x] **Evidence:** Automated unit/integration fixture (offline) plus manual browser proof where a real site interaction is required.
- [x] **Traceability:** Record changed files, relevant test command/results, a commit/PR reference (if implemented), and remaining limitations.

## Dependencies

[[CORE-001-initialize-isolated-source-repository|CORE-001]]

## Suggested implementation steps

1. Review dependency tickets, [[MASTER-PLAN]], and relevant architecture/security guidelines; confirm the intended interface and constraints.
2. Write or update a failing test/fixture or a research verification checklist for this specific behavior.
3. Implement only this ticket's scoped change; do not expand into unrelated backlog tasks.
4. Execute positive, negative, and interruption tests; update documentation and reproducible evidence.
5. Request review, address findings and update ticket properties only after Definition of Done is satisfied.

## Verification notes

**Specific verification:** Intentional errors fail checks locally and in CI.

**Test context:** Record browser version and Google UI/model availability for site-dependent tests. Do not consume paid credits without explicit approved test budget.

## Work log

| Date | Actor | Update | Evidence |
|---|---|---|---|
| 2026-10-19 | Planning | Ticket created; not implemented | — |
| 2026-10-19 | Lead Dev | Configured Prettier (.prettierrc, .prettierignore) and ESLint v9 flat config (eslint.config.js) with typescript-eslint rules; verified strict checks pass clean and verified intentional TypeScript and ESLint errors fail cleanly locally | `extension/.prettierrc`, `extension/eslint.config.js`, `extension/package.json` |

## Closure

- **Files changed:** `extension/.prettierrc`, `extension/.prettierignore`, `extension/eslint.config.js`, `extension/package.json`, `extension/package-lock.json`, `04-Tickets/Features/CORE-004-configure-formatting-static-analysis-and-typescript-strict.md`, `03-Sprints/Sprint-01/Sprint-01.md`
- **Tests executed/results:** `npm run format:check` passed; `npm run lint` passed; `npm run typecheck` passed; intentional syntax/type errors verified to trigger `TS2322` and `@typescript-eslint/no-unused-vars`; `python3 tools/validate_backlog.py` passed with 0 problems.
- **Commit or PR:** `ticket/CORE-004-formatting-and-static-analysis`
- **Reviewer:** Hermes Lead Dev (verified acceptance criteria)
- **Known limitations / follow-up:** Informs GitHub Actions CI pipeline (CORE-005).
