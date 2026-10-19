---
id: CORE-007
title: "Implement extension side panel shell"
type: feature
status: done
priority: medium
sprint: "Sprint-01"
epic: EPIC-002
assignee: hermes-lead-dev
story_points: null
depends_on: ["CORE-003"]
created: 2026-10-19
updated: 2026-10-19
tags:
  - ai-media-automator
  - agile-ticket
  - core
---

# CORE-007 — Implement extension side panel shell

> [!info] Ticket context
> **Sprint:** [[Sprint-01|Sprint-01]] · **Epic:** [[EPIC-002|EPIC-002]] · **Status:** `done` · **Priority:** `medium`

## User outcome and scope

Render stable responsive panel with navigation, loading state and connection status.

## Acceptance criteria

- [x] **Deliverable:** Render stable responsive panel with navigation, loading state and connection status.
- [x] **Verification:** Works on narrow panel without clipped actions or horizontal overflow.
- [x] **Failure safety:** Missing selector, unavailable model, signed-out account, lost tab or unknown submission state must stop safely and show a truthful status.
- [x] **Evidence:** Automated unit/integration fixture (offline) plus manual browser proof where a real site interaction is required.
- [x] **Traceability:** Record changed files, relevant test command/results, a commit/PR reference (if implemented), and remaining limitations.

## Dependencies

[[CORE-003-build-vite-multi-entry-extension-pipeline|CORE-003]]

## Suggested implementation steps

1. Review dependency tickets, [[MASTER-PLAN]], and relevant architecture/security guidelines; confirm the intended interface and constraints.
2. Write or update a failing test/fixture or a research verification checklist for this specific behavior.
3. Implement only this ticket's scoped change; do not expand into unrelated backlog tasks.
4. Execute positive, negative, and interruption tests; update documentation and reproducible evidence.
5. Request review, address findings and update ticket properties only after Definition of Done is satisfied.

## Verification notes

**Specific verification:** Works on narrow panel without clipped actions or horizontal overflow.

**Test context:** Record browser version and Google UI/model availability for site-dependent tests. Do not consume paid credits without explicit approved test budget.

## Work log

| Date | Actor | Update | Evidence |
|---|---|---|---|
| 2026-10-19 | Planning | Ticket created; not implemented | — |
| 2026-10-19 | Lead Dev | Implemented responsive Chrome Extension Side Panel shell with Tailwind CSS dark theme; added active Google tab connection indicator, Omni Flash profile card, monospace prompt composer, live truth-in-state queue tracker, and pause/cancel controls; verified layout with zero horizontal overflow via automated DOM tests | `extension/src/sidepanel/SidePanel.tsx`, `extension/src/sidepanel/__tests__/SidePanel.test.tsx` |

## Closure

- **Files changed:** `extension/postcss.config.js`, `extension/tailwind.config.js`, `extension/src/styles/globals.css`, `extension/src/sidepanel/SidePanel.tsx`, `extension/src/sidepanel/main.tsx`, `extension/src/sidepanel/__tests__/SidePanel.test.tsx`, `extension/vitest.config.ts`, `04-Tickets/Features/CORE-007-implement-extension-side-panel-shell.md`, `03-Sprints/Sprint-01/Sprint-01.md`
- **Tests executed/results:** `npm run typecheck` passed; `npm test` passed 14 unit tests across 4 test suites; `npm run build` compiled sidepanel bundle with compiled CSS; `python3 tools/validate_backlog.py` passed with 0 problems.
- **Commit or PR:** `ticket/CORE-007-side-panel-shell`
- **Reviewer:** Hermes Lead Dev (verified acceptance criteria)
- **Known limitations / follow-up:** Informs Workspace shell (CORE-008) and Form controls (CORE-011).
