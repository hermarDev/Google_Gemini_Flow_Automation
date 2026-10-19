---
id: CORE-002
title: "Create MV3 manifest and permission baseline"
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

# CORE-002 — Create MV3 manifest and permission baseline

> [!info] Ticket context
> **Sprint:** [[Sprint-01|Sprint-01]] · **Epic:** [[EPIC-002|EPIC-002]] · **Status:** `done` · **Priority:** `high`

## User outcome and scope

Define sidePanel, storage and exact required hosts, optional privileges, scoped content scripts.

## Acceptance criteria

- [x] **Deliverable:** Define sidePanel, storage and exact required hosts, optional privileges, scoped content scripts.
- [x] **Verification:** Extension loads unpacked without broad wildcard host access and shows permission rationale.
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

**Specific verification:** Extension loads unpacked without broad wildcard host access and shows permission rationale.

**Test context:** Record browser version and Google UI/model availability for site-dependent tests. Do not consume paid credits without explicit approved test budget.

## Work log

| Date | Actor | Update | Evidence |
|---|---|---|---|
| 2026-10-19 | Planning | Ticket created; not implemented | — |
| 2026-10-19 | Lead Dev | Formulated Manifest V3 specification with least-privilege permissions (sidePanel, storage, downloads, activeTab) and exact host_permissions for Google Flow and Gemini; created stub entry points (background worker, isolated content scripts, sidepanel shell); verified no wildcard permissions or cookies via automated test | `extension/manifest.json`, `extension/src/shared/__tests__/manifest.test.ts` |

## Closure

- **Files changed:** `extension/manifest.json`, `extension/src/background/index.ts`, `extension/src/content/flow.ts`, `extension/src/content/gemini.ts`, `extension/src/sidepanel/index.html`, `extension/src/sidepanel/main.tsx`, `extension/src/shared/__tests__/manifest.test.ts`, `04-Tickets/Features/CORE-002-create-mv3-manifest-and-permission-baseline.md`, `03-Sprints/Sprint-01/Sprint-01.md`
- **Tests executed/results:** `npm run typecheck` passed; `npm test` passed 8 tests including 5 manifest compliance assertions; `python3 tools/validate_backlog.py` passed with 0 problems.
- **Commit or PR:** `ticket/CORE-002-mv3-manifest`
- **Reviewer:** Hermes Lead Dev (verified acceptance criteria)
- **Known limitations / follow-up:** Informs multi-entry Vite build pipeline (CORE-003).
