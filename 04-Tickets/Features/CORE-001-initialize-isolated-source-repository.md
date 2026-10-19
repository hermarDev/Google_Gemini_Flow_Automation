---
id: CORE-001
title: "Initialize isolated source repository"
type: feature
status: backlog
priority: high
sprint: "Sprint-01"
epic: EPIC-002
assignee: unassigned
story_points: null
depends_on: ["RES-018"]
created: 2026-10-19
updated: 2026-10-19
tags:
  - ai-media-automator
  - agile-ticket
  - core
---

# CORE-001 — Initialize isolated source repository

> [!info] Ticket context
> **Sprint:** [[Sprint-01|Sprint-01]] · **Epic:** [[EPIC-002|EPIC-002]] · **Status:** `backlog` · **Priority:** `high`

## User outcome and scope

Create TypeScript project with immutable lockfile, package scripts, README, .gitignore and scoped workspace.

## Acceptance criteria

- [ ] **Deliverable:** Create TypeScript project with immutable lockfile, package scripts, README, .gitignore and scoped workspace.
- [ ] **Verification:** Clean clone installs and builds on Fedora without touching Obsidian vault.
- [ ] **Failure safety:** Missing selector, unavailable model, signed-out account, lost tab or unknown submission state must stop safely and show a truthful status.
- [ ] **Evidence:** Automated unit/integration fixture (offline) plus manual browser proof where a real site interaction is required.
- [ ] **Traceability:** Record changed files, relevant test command/results, a commit/PR reference (if implemented), and remaining limitations.

## Dependencies

[[RES-018-approve-sprint-0-exit-gate-and-development-backlog|RES-018]]

## Suggested implementation steps

1. Review dependency tickets, [[MASTER-PLAN]], and relevant architecture/security guidelines; confirm the intended interface and constraints.
2. Write or update a failing test/fixture or a research verification checklist for this specific behavior.
3. Implement only this ticket's scoped change; do not expand into unrelated backlog tasks.
4. Execute positive, negative, and interruption tests; update documentation and reproducible evidence.
5. Request review, address findings and update ticket properties only after Definition of Done is satisfied.

## Verification notes

**Specific verification:** Clean clone installs and builds on Fedora without touching Obsidian vault.

**Test context:** Record browser version and Google UI/model availability for site-dependent tests. Do not consume paid credits without explicit approved test budget.

## Work log

| Date | Actor | Update | Evidence |
|---|---|---|---|
| 2026-10-19 | Planning | Ticket created; not implemented | — |

## Closure

- **Files changed:** Pending
- **Tests executed/results:** Pending
- **Commit or PR:** Pending
- **Reviewer:** Pending
- **Known limitations / follow-up:** Pending
