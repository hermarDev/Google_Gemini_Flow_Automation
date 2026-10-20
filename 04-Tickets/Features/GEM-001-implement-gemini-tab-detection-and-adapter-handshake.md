---
id: GEM-001
title: "Implement Gemini tab detection and adapter handshake"
type: feature
status: review
priority: high
sprint: "Sprint-02"
epic: EPIC-003
assignee: unassigned
story_points: null
depends_on: ["CORE-016", "CORE-017"]
created: 2026-10-19
updated: 2026-10-21
tags:
  - ai-media-automator
  - agile-ticket
  - gem
---

# GEM-001 — Implement Gemini tab detection and adapter handshake

> [!info] Ticket context
> **Sprint:** [[Sprint-02|Sprint-02]] · **Epic:** [[EPIC-003|EPIC-003]] · **Status:** `review` · **Priority:** `high`

## User outcome and scope

Detect supported Gemini origin, route, tab and readiness with human-readable connection state.

## Acceptance criteria

- [ ] **Deliverable:** Detect supported Gemini origin, route, tab and readiness with human-readable connection state.
- [ ] **Verification:** Wrong page or unloaded Gemini shows actionable non-destructive prompt, not false ready.
- [ ] **Failure safety:** Unsupported routes, missing/hidden composer, visible sign-in prompts, lost/mismatched tabs, and invalid or missing readiness replies must fail closed with truthful status. Model/image capability is handled by GEM-002; unknown-submission handling belongs to the later submission workflow.
- [ ] **Evidence:** Automated unit/integration fixture (offline) plus manual browser proof where a real site interaction is required.
- [ ] **Traceability:** Record changed files, relevant test command/results, a commit/PR reference (if implemented), and remaining limitations.

## Dependencies

[[CORE-016-create-adapter-interfaces-and-mock-transport|CORE-016]], [[CORE-017-create-extension-message-protocol|CORE-017]]

## Suggested implementation steps

1. Review dependency tickets, [[MASTER-PLAN]], and relevant architecture/security guidelines; confirm the intended interface and constraints.
2. Write or update a failing test/fixture or a research verification checklist for this specific behavior.
3. Implement only this ticket's scoped change; do not expand into unrelated backlog tasks.
4. Execute positive, negative, and interruption tests; update documentation and reproducible evidence.
5. Request review, address findings and update ticket properties only after Definition of Done is satisfied.

## Verification notes

**Specific verification:** A supported Gemini conversation tab with a visible composer is reported ready only when there is no visible sign-in prompt. The extension SidePanel request is authenticated by the extension sender ID and an explicit numeric target tab ID; when Chrome supplies `sender.tab.id`, it must match the requested tab. The UI continues polling every two seconds and fails closed on missing/invalid replies, tab changes, runtime errors, or a composer/sign-in state change.

**Test context:** Automated DOM/SidePanel tests and offline packaged-extension smoke only; browser version/site availability not recorded for live extension-to-Gemini interaction. Do not consume paid credits without explicit approved test budget.

## Work log

| Date | Actor | Update | Evidence |
|---|---|---|---|
| 2026-10-19 | Planning | Ticket created; not implemented | — |
| 2026-10-21 | telegram-10948-gem001-progress | Completed Gemini route/composer readiness and authenticated SidePanel handshake with fail-closed status, tab-race protection, ongoing polling, malformed-message rejection and regression coverage. | 159/159 unit tests; 12/12 offline smoke; packaged MV3 SidePanel→content-script fixture handshake passed and repeated 5/5; typecheck, lint, format, build, `git diff --check`, backlog validation (176 tickets, 0 problems) passed. Live Gemini not tested. |
| 2026-10-21 | telegram-10948-gem001-review | Independent focused review passed after fixing malformed-message handling and strengthening packaged SidePanel handshake coverage; no findings. Verified missing/null rejection, 27 focused Gemini tests, packaged E2E + five repeats and `git diff --check`. | Offline fixture only; no live site/authentication/prompt. |
| 2026-10-21 | telegram-10948-gem001-release-prep | Reconciled Sprint 1 integration: PR #38 was merged at `84cee5fd0809e1bd7b4591bd8d9da67340ddb491`; PR #37 had stale base and conflicts, so closed it as superseded by #38. Re-ran the focused GEM-001 tests and full local gates on the final changes. | 45 focused content/SidePanel tests; 159/159 full suite; typecheck, lint, format, build, offline smoke 12/12, packaged extension 1/1 and repeat 5/5, backlog 176/0, diff check all pass. GEM-001 local changes now ready for scoped PR; no live Gemini interaction. |

| 2026-10-21 | telegram-10948-gem001-remediation | Adjudicated independent review findings: narrowed the generic failure-safety criterion to this ticket's readiness/handshake scope (model/image capability belongs to GEM-002; submission uncertainty to later workflow tickets); added packaged MV3 coverage for a valid Gemini conversation route with no composer, asserting not-ready copy and disabled prompt/Generate controls. | Focused tests 45/45; full unit suite 159/159; typecheck, build, format check, lint, offline smoke 12/12 and packaged MV3 smoke 1/1 passed. Live Gemini UI/authentication/model capability not tested. |
## Closure

- **Files changed:** `extension/src/content/gemini.ts`, `extension/src/content/__tests__/gemini.test.ts`, `extension/src/sidepanel/SidePanel.tsx`, `extension/src/sidepanel/__tests__/SidePanel.test.tsx`, `extension/playwright/adapters-offline.spec.ts`, `extension/playwright-extension/extension.smoke.spec.ts`, and this ticket.
- **Tests executed/results:** After addressing the packaged negative-path finding, `npm test -- --reporter=dot` passed (159/159), focused Gemini/SidePanel tests passed (45/45), `npm run typecheck`, `npm run lint`, `npm run format:check`, `npm run build`, `npm run test:smoke` (12/12), `npm run test:extension` (1/1, covering ready and missing-composer states in packaged Chromium), and `git diff --check` passed. `python3 tools/validate_backlog.py` previously passed (176 tickets, 0 problems); rerun before PR update. Live Google/Gemini tests were not run.
- **Commit or PR:** Follow-up changes are on `ticket/GEM-001-gemini-tab-readiness`; update existing PR #39 after commit and verify its current head/CI.
- **Reviewer:** Earlier focused review covered the prior head. The later read-only adjudication found a missing packaged not-ready path and an overbroad failure-safety criterion; both are addressed here. Request independent re-review of this exact head before closing the ticket. Do not claim external approval.
- **Known limitations / follow-up:** Authenticated live Gemini and live model/image capability were not tested. Packaged Chromium uses intercepted offline fixtures. Capability detection is GEM-002 scope; submission-state handling remains with later submission workflow tickets. GEM-001 remains in review until this head's independent review and required CI pass.
