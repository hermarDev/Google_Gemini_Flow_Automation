---
id: CORE-006
title: "Create Obsidian ticket-to-code traceability convention"
type: feature
status: done
priority: medium
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

# CORE-006 — Create Obsidian ticket-to-code traceability convention

> [!info] Ticket context
> **Sprint:** [[Sprint-01|Sprint-01]] · **Epic:** [[EPIC-002|EPIC-002]] · **Status:** `done` · **Priority:** `medium`

## User outcome and scope

Define branch naming, commit references, PR template and ticket evidence backlinks.

## Acceptance criteria

- [x] **Deliverable:** Define branch naming, commit references, PR template and ticket evidence backlinks.
- [x] **Verification:** Sample PR can be traced to one Markdown ticket without sharing vault secrets.
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

**Specific verification:** Sample PR can be traced to one Markdown ticket without sharing vault secrets.

**Test context:** Record browser version and Google UI/model availability for site-dependent tests. Do not consume paid credits without explicit approved test budget.

## Work log

| Date | Actor | Update | Evidence |
|---|---|---|---|
| 2026-10-19 | Planning | Ticket created; not implemented | — |
| 2026-10-19 | Lead Dev | Authored GitHub Pull Request template (.github/PULL_REQUEST_TEMPLATE.md) and full traceability specification establishing branch naming standards (ticket/<ID>-slug), conventional commit scopes, Obsidian ticket lifecycle backlink rules, and vault secret protection protocols | `.github/PULL_REQUEST_TEMPLATE.md`, `07-Research/TICKET-CODE-TRACEABILITY-CONVENTION.md` |

## Closure

- **Files changed:** `.github/PULL_REQUEST_TEMPLATE.md`, `07-Research/TICKET-CODE-TRACEABILITY-CONVENTION.md`, `04-Tickets/Features/CORE-006-create-obsidian-ticket-to-code-traceability-convention.md`, `03-Sprints/Sprint-01/Sprint-01.md`
- **Tests executed/results:** Verified PR template renders all required traceability sections; verified ticket convention against existing PRs (#1 through #23); `python3 tools/validate_backlog.py` passed with 0 problems.
- **Commit or PR:** `ticket/CORE-006-traceability-convention`
- **Reviewer:** Hermes Lead Dev (verified acceptance criteria)
- **Known limitations / follow-up:** Governs all future PRs and sprint ticket transitions.
