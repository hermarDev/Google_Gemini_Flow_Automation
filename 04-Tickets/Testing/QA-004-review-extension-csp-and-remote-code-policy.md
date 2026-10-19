---
id: QA-004
title: "Review extension CSP and remote-code policy"
type: testing
status: backlog
priority: high
sprint: "Sprint-08"
epic: EPIC-009
assignee: unassigned
story_points: null
depends_on: ["CORE-003", "QA-003"]
created: 2026-10-19
updated: 2026-10-19
tags:
  - ai-media-automator
  - agile-ticket
  - qa
---

# QA-004 — Review extension CSP and remote-code policy

> [!info] Ticket context
> **Sprint:** [[Sprint-08|Sprint-08]] · **Epic:** [[EPIC-009|EPIC-009]] · **Status:** `backlog` · **Priority:** `high`

## User outcome and scope

Confirm MV3 static code bundle, no eval/remote scripts and safe HTML rendering.

## Acceptance criteria

- [ ] **Deliverable:** Confirm MV3 static code bundle, no eval/remote scripts and safe HTML rendering.
- [ ] **Verification:** CSP smoke test blocks injected script and builds contain no dynamic remote code.
- [ ] **Failure safety:** Any critical unresolved failure blocks release; a skipped paid live test is not a pass.
- [ ] **Evidence:** A reproducible report with commands, environment, result, failures and linked evidence; record skipped/not-applicable distinctly.
- [ ] **Traceability:** Record changed files, relevant test command/results, a commit/PR reference (if implemented), and remaining limitations.

## Dependencies

[[CORE-003-build-vite-multi-entry-extension-pipeline|CORE-003]], [[QA-003-harden-content-script-isolation-and-input-handling|QA-003]]

## Suggested implementation steps

1. Review dependency tickets, [[MASTER-PLAN]], and relevant architecture/security guidelines; confirm the intended interface and constraints.
2. Write or update a failing test/fixture or a research verification checklist for this specific behavior.
3. Implement only this ticket's scoped change; do not expand into unrelated backlog tasks.
4. Execute positive, negative, and interruption tests; update documentation and reproducible evidence.
5. Request review, address findings and update ticket properties only after Definition of Done is satisfied.

## Verification notes

**Specific verification:** CSP smoke test blocks injected script and builds contain no dynamic remote code.

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
