---
id: CORE-019
title: "Establish component, extension and smoke test harness"
type: feature
status: review
priority: medium
sprint: "Sprint-01"
epic: EPIC-002
assignee: unassigned
story_points: null
depends_on: ["CORE-003", "CORE-016"]
created: 2026-10-19
updated: 2026-10-20
tags:
  - ai-media-automator
  - agile-ticket
  - core
---

# CORE-019 — Establish component, extension and smoke test harness

> [!info] Ticket context
> **Sprint:** [[Sprint-01|Sprint-01]] · **Epic:** [[EPIC-002|EPIC-002]] · **Status:** `review` · **Priority:** `medium`

## User outcome and scope

Configure Vitest, DOM mocks, Playwright fixture extension loader, deterministic site fakes.

## Acceptance criteria

- [ ] **Deliverable:** Configure Vitest, DOM mocks, Playwright fixture extension loader, deterministic site fakes.
- [ ] **Verification:** Tests run offline for the shell without paid Google generations.
- [ ] **Failure safety:** Missing selector, unavailable model, signed-out account, lost tab or unknown submission state must stop safely and show a truthful status.
- [ ] **Evidence:** Automated unit/integration fixture (offline) plus manual browser proof where a real site interaction is required.
- [ ] **Traceability:** Record changed files, relevant test command/results, a commit/PR reference (if implemented), and remaining limitations.

## Dependencies

[[CORE-003-build-vite-multi-entry-extension-pipeline|CORE-003]], [[CORE-016-create-adapter-interfaces-and-mock-transport|CORE-016]]

## Suggested implementation steps

1. Review dependency tickets, [[MASTER-PLAN]], and relevant architecture/security guidelines; confirm the intended interface and constraints.
2. Write or update a failing test/fixture or a research verification checklist for this specific behavior.
3. Implement only this ticket's scoped change; do not expand into unrelated backlog tasks.
4. Execute positive, negative, and interruption tests; update documentation and reproducible evidence.
5. Request review, address findings and update ticket properties only after Definition of Done is satisfied.

## Verification notes

**Specific verification:** Tests run offline for the shell without paid Google generations.

**Execution environment:** Node.js v22.23.1, npm 10.9.8, local Playwright-managed Chromium; no live Google account or provider site was accessed.

**Verification evidence (2026-10-20):** `npm run format:check`, `npm run lint`, `npm run typecheck`, `npm test -- --reporter=dot`, `npm run build`, `npm run test:smoke`, `npm run test:extension`, `npm audit --omit=dev`, `git diff --check`, and backlog validation pass. Latest results: Vitest 87/87 tests; preview Playwright 11/11; packaged MV3 extension Playwright 1/1 (worker starts, side panel renders, no external requests); production dependency audit 0 vulnerabilities; backlog validation 176 tickets, 0 problems. Pull Request #37 submitted and verified green on GitHub Actions CI (Backlog Integrity, Extension Lint/Typecheck/Test/Build 22.x, Packaged MV3 Smoke Test all passed).

**Limitations:** Offline fixtures do not verify current Google DOM selectors, sign-in/model availability, provider terms, or live generation/download behavior. No paid operations were run. Peer review on PR #37 remains pending before final merge and sign-off.

**Test context:** Record browser version and Google UI/model availability for site-dependent tests. Do not consume paid credits without explicit approved test budget.

## Work log

| Date | Actor | Update | Evidence |
|---|---|---|---|
| 2026-10-20 | session-core-019 | Added offline Playwright fixtures for workspace, adapters, and failure-safe mock behavior; fixed Vitest discovery and a React `act` test failure; tightened request policy to only `data:` and `http://127.0.0.1:4173`. | `npm run format:check`, `npm run lint`, `npm run typecheck`, `npm test -- --reporter=dot` (87/87), `npm run build`, `npm run test:smoke` (10/10), `npm audit --omit=dev` (0 vulnerabilities), `git diff --check`, and backlog validation (176 tickets, 0 problems) pass. Isolated Chromium probe initially loaded MV3 worker and side panel with 0 external requests. |
| 2026-10-20 | session-core-019 | Added repeatable packaged MV3 Playwright test and dedicated Node 22 CI job; test copies `dist` and uses a fresh temporary Chromium profile, blocks external requests and DNS, then checks the service worker and side-panel UI. | `npm run test:extension` (1/1) and `npm run test:smoke` (10/10) pass after build. `npm run format:check`, `npm run lint`, `npm run typecheck`, and backlog validation pass. CI job awaits a PR run; independent review pending. |
| 2026-10-20 | orchestrator | Reviewed PR #37 finding and remediated SidePanel connection truthfulness: production now detects the active/last-focused tab, accepts only exact HTTPS Flow/Gemini hosts, and reacts to tab activation/update; default remains disconnected with Generate disabled. Replaced simulated render/completion UI with explicit mock simulation wording and removed fabricated progress/timing. | Unit tests cover disconnected default and mock simulation labels; awaiting rerun of full suite and packaged smoke before pushing. Production submission is still not implemented; this ticket is test-harness scope, so do not represent mock queueing as live generation. |

## Closure

- **Files changed:** `.github/workflows/ci.yml`, `00-Dashboard/Project-Home.md`, `03-Sprints/Sprint-01/Sprint-01.md`, `04-Tickets/Features/CORE-019-establish-component-extension-and-smoke-test-harness.md`, `extension/.prettierignore`, `extension/README.md`, `extension/manifest.json`, `extension/package.json`, `extension/package-lock.json`, `extension/tsconfig.json`, `extension/vitest.config.ts`, `extension/playwright.config.ts`, `extension/playwright-extension.config.ts`, `extension/playwright/`, `extension/playwright-extension/`, `extension/src/adapters/`, `extension/src/content/`, `extension/src/protocol/router.ts`, `extension/src/components/ui/__tests__/focus.test.tsx`, `extension/src/workspace/__tests__/router.test.tsx`.
- **Tests executed/results:** `npm run format:check` (pass), `npm run lint` (pass), `npm run typecheck` (pass), `npm test -- --reporter=dot` (87/87 pass), `npm run build` (pass), `npm run test:smoke` (11/11 pass), `npm run test:extension` (1/1 pass), `npm audit --omit=dev` (0 vulnerabilities), `git diff --check` (pass), `python3 tools/validate_backlog.py` (176 tickets, 0 problems).
- **Commit or PR:** `ticket/CORE-019-offline-smoke-test-harness`, PR [#37](https://github.com/hermarDev/Google_Gemini_Flow_Automation/pull/37) (all CI checks passed).
- **Reviewer:** Peer review pending on PR #37.
- **Known limitations / follow-up:** Offline only; no live Google UI/account/provider generation verification. Remote CI quality gates confirmed green on PR #37.
