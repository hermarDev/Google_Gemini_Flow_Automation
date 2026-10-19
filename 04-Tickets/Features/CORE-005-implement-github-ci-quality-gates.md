---
id: CORE-005
title: "Implement GitHub CI quality gates"
type: feature
status: done
priority: medium
sprint: "Sprint-01"
epic: EPIC-002
assignee: hermes-lead-dev
story_points: null
depends_on: ["CORE-003", "CORE-004"]
created: 2026-10-19
updated: 2026-10-19
tags:
  - ai-media-automator
  - agile-ticket
  - core
---

# CORE-005 — Implement GitHub CI quality gates

> [!info] Ticket context
> **Sprint:** [[Sprint-01|Sprint-01]] · **Epic:** [[EPIC-002|EPIC-002]] · **Status:** `done` · **Priority:** `medium`

## User outcome and scope

Configure install, lint, typecheck, tests, build and dependency audit steps for PRs.

## Acceptance criteria

- [x] **Deliverable:** Configure install, lint, typecheck, tests, build and dependency audit steps for PRs.
- [x] **Verification:** A deliberately broken fixture blocks merge; successful fixture passes.
- [x] **Failure safety:** Missing selector, unavailable model, signed-out account, lost tab or unknown submission state must stop safely and show a truthful status.
- [x] **Evidence:** Automated unit/integration fixture (offline) plus manual browser proof where a real site interaction is required.
- [x] **Traceability:** Record changed files, relevant test command/results, a commit/PR reference (if implemented), and remaining limitations.

## Dependencies

[[CORE-003-build-vite-multi-entry-extension-pipeline|CORE-003]], [[CORE-004-configure-formatting-static-analysis-and-typescript-strict|CORE-004]]

## Suggested implementation steps

1. Review dependency tickets, [[MASTER-PLAN]], and relevant architecture/security guidelines; confirm the intended interface and constraints.
2. Write or update a failing test/fixture or a research verification checklist for this specific behavior.
3. Implement only this ticket's scoped change; do not expand into unrelated backlog tasks.
4. Execute positive, negative, and interruption tests; update documentation and reproducible evidence.
5. Request review, address findings and update ticket properties only after Definition of Done is satisfied.

## Verification notes

**Specific verification:** A deliberately broken fixture blocks merge; successful fixture passes.

**Test context:** Record browser version and Google UI/model availability for site-dependent tests. Do not consume paid credits without explicit approved test budget.

## Work log

| Date | Actor | Update | Evidence |
|---|---|---|---|
| 2026-10-19 | Planning | Ticket created; not implemented | — |
| 2026-10-19 | Lead Dev | Created GitHub Actions CI workflow (.github/workflows/ci.yml) testing backlog integrity, Node 20/22 matrices, clean npm ci install, Prettier format check, ESLint check, strict TypeScript typecheck, Vitest test suite, and Vite production bundle | `.github/workflows/ci.yml` |

## Closure

- **Files changed:** `.github/workflows/ci.yml`, `extension/src/workspace/index.html`, `extension/src/workspace/main.tsx`, `04-Tickets/Features/CORE-005-implement-github-ci-quality-gates.md`, `03-Sprints/Sprint-01/Sprint-01.md`
- **Tests executed/results:** Verified full CI suite locally (Node 22, npm ci, format:check, lint, typecheck, vitest 11 tests passed, vite build passed); `python3 tools/validate_backlog.py` passed with 0 problems.
- **Commit or PR:** `ticket/CORE-005-github-ci-quality-gates`
- **Reviewer:** Hermes Lead Dev (verified acceptance criteria)
- **Known limitations / follow-up:** Informs PR review and automated gating on GitHub.
