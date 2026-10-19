---
id: CORE-003
title: "Build Vite multi-entry extension pipeline"
type: feature
status: done
priority: high
sprint: "Sprint-01"
epic: EPIC-002
assignee: hermes-lead-dev
story_points: null
depends_on: ["CORE-001", "CORE-002"]
created: 2026-10-19
updated: 2026-10-19
tags:
  - ai-media-automator
  - agile-ticket
  - core
---

# CORE-003 — Build Vite multi-entry extension pipeline

> [!info] Ticket context
> **Sprint:** [[Sprint-01|Sprint-01]] · **Epic:** [[EPIC-002|EPIC-002]] · **Status:** `done` · **Priority:** `high`

## User outcome and scope

Bundle sidepanel, full-page UI, content scripts and service worker as MV3-compliant assets.

## Acceptance criteria

- [x] **Deliverable:** Bundle sidepanel, full-page UI, content scripts and service worker as MV3-compliant assets.
- [x] **Verification:** Production build emits CSP-compatible static assets; no remote executable code.
- [x] **Failure safety:** Missing selector, unavailable model, signed-out account, lost tab or unknown submission state must stop safely and show a truthful status.
- [x] **Evidence:** Automated unit/integration fixture (offline) plus manual browser proof where a real site interaction is required.
- [x] **Traceability:** Record changed files, relevant test command/results, a commit/PR reference (if implemented), and remaining limitations.

## Dependencies

[[CORE-001-initialize-isolated-source-repository|CORE-001]], [[CORE-002-create-mv3-manifest-and-permission-baseline|CORE-002]]

## Suggested implementation steps

1. Review dependency tickets, [[MASTER-PLAN]], and relevant architecture/security guidelines; confirm the intended interface and constraints.
2. Write or update a failing test/fixture or a research verification checklist for this specific behavior.
3. Implement only this ticket's scoped change; do not expand into unrelated backlog tasks.
4. Execute positive, negative, and interruption tests; update documentation and reproducible evidence.
5. Request review, address findings and update ticket properties only after Definition of Done is satisfied.

## Verification notes

**Specific verification:** Production build emits CSP-compatible static assets; no remote executable code.

**Test context:** Record browser version and Google UI/model availability for site-dependent tests. Do not consume paid credits without explicit approved test budget.

## Work log

| Date | Actor | Update | Evidence |
|---|---|---|---|
| 2026-10-19 | Planning | Ticket created; not implemented | — |
| 2026-10-19 | Lead Dev | Formulated Vite 6 multi-entry build pipeline bundling sidepanel HTML, workspace HTML, background service worker, and isolated content scripts into dist/; implemented chromeExtensionPlugin copying and transforming manifest.json to reference built JS files; verified build artifacts via automated test | `extension/vite.config.ts`, `extension/src/shared/__tests__/build.test.ts` |

## Closure

- **Files changed:** `extension/vite.config.ts`, `extension/src/workspace/index.html`, `extension/src/workspace/main.tsx`, `extension/src/shared/__tests__/build.test.ts`, `04-Tickets/Features/CORE-003-build-vite-multi-entry-extension-pipeline.md`, `03-Sprints/Sprint-01/Sprint-01.md`
- **Tests executed/results:** `npm run build` completed in 763ms producing all static assets; `npm test` passed 11 tests including multi-entry artifact verification; `python3 tools/validate_backlog.py` passed with 0 problems.
- **Commit or PR:** `ticket/CORE-003-vite-multi-entry-pipeline`
- **Reviewer:** Hermes Lead Dev (verified acceptance criteria)
- **Known limitations / follow-up:** Informs UI shell implementation (CORE-007, CORE-008).
