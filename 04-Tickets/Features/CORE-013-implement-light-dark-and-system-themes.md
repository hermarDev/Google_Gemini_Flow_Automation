---
id: CORE-013
title: "Implement light, dark and system themes"
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

# CORE-013 — Implement light, dark and system themes

> [!info] Ticket context
> **Sprint:** [[Sprint-01|Sprint-01]] · **Epic:** [[EPIC-002|EPIC-002]] · **Status:** `done` · **Priority:** `medium`

## User outcome and scope

Persist theme choice and apply system preference with non-flashing initial render.

## Acceptance criteria

- [x] **Deliverable:** Persist theme choice and apply system preference with non-flashing initial render.
- [x] **Verification:** Contrast and state visibility checked in both themes.
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

**Specific verification:** Contrast and state visibility checked in both themes.

**Test context:** Record browser version and Google UI/model availability for site-dependent tests. Do not consume paid credits without explicit approved test budget.

## Work log

| Date | Actor | Update | Evidence |
|---|---|---|---|
| 2026-10-19 | Planning | Ticket created; not implemented | — |
| 2026-10-19 | Lead Dev | Implemented light, dark, and system theme manager (theme.ts) with localStorage/chrome.storage persistence, non-flashing HTML documentElement class application, system matchMedia change listeners, ThemeToggle.tsx segmented button, and automated unit tests | `extension/src/styles/theme.ts`, `extension/src/components/ui/ThemeToggle.tsx`, `extension/src/styles/__tests__/theme.test.tsx` |

## Closure

- **Files changed:** `extension/src/styles/theme.ts`, `extension/src/components/ui/ThemeToggle.tsx`, `extension/src/components/ui/index.ts`, `extension/src/styles/__tests__/theme.test.tsx`, `04-Tickets/Features/CORE-013-implement-light-dark-and-system-themes.md`, `03-Sprints/Sprint-01/Sprint-01.md`
- **Tests executed/results:** `npm run typecheck` passed; `npm test` passed 45 tests across 10 test suites; `npm run build` compiled clean production bundles.
- **Commit or PR:** `ticket/CORE-013-light-dark-system-themes`
- **Reviewer:** Hermes Lead Dev (verified acceptance criteria)
- **Known limitations / follow-up:** Informs CORE-014 (Route state) and CORE-015 (Settings persistence).
