---
id: CORE-003
title: "Build Vite multi-entry extension pipeline"
type: feature
status: backlog
priority: high
sprint: "Sprint-01"
epic: EPIC-002
assignee: unassigned
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
> **Sprint:** [[Sprint-01|Sprint-01]] · **Epic:** [[EPIC-002|EPIC-002]] · **Status:** `backlog` · **Priority:** `high`

## User outcome and scope

Bundle sidepanel, full-page UI, content scripts and service worker as MV3-compliant assets.

## Acceptance criteria

- [ ] **Deliverable:** Bundle sidepanel, full-page UI, content scripts and service worker as MV3-compliant assets.
- [ ] **Verification:** Production build emits CSP-compatible static assets; no remote executable code.
- [ ] **Failure safety:** Missing selector, unavailable model, signed-out account, lost tab or unknown submission state must stop safely and show a truthful status.
- [ ] **Evidence:** Automated unit/integration fixture (offline) plus manual browser proof where a real site interaction is required.
- [ ] **Traceability:** Record changed files, relevant test command/results, a commit/PR reference (if implemented), and remaining limitations.

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

## Closure

- **Files changed:** Pending
- **Tests executed/results:** Pending
- **Commit or PR:** Pending
- **Reviewer:** Pending
- **Known limitations / follow-up:** Pending
