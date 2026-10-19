---
id: LIB-016
title: "Export job and asset manifest"
type: feature
status: backlog
priority: medium
sprint: "Sprint-06"
epic: EPIC-007
assignee: unassigned
story_points: null
depends_on: ["LIB-001", "LIB-009"]
created: 2026-10-19
updated: 2026-10-19
tags:
  - ai-media-automator
  - agile-ticket
  - lib
---

# LIB-016 — Export job and asset manifest

> [!info] Ticket context
> **Sprint:** [[Sprint-06|Sprint-06]] · **Epic:** [[EPIC-007|EPIC-007]] · **Status:** `backlog` · **Priority:** `medium`

## User outcome and scope

Export sanitized JSON/CSV metadata with schema version and no provider cookies/access tokens.

## Acceptance criteria

- [ ] **Deliverable:** Export sanitized JSON/CSV metadata with schema version and no provider cookies/access tokens.
- [ ] **Verification:** Re-import validation detects missing files and provenance links.
- [ ] **Failure safety:** Missing selector, unavailable model, signed-out account, lost tab or unknown submission state must stop safely and show a truthful status.
- [ ] **Evidence:** Automated unit/integration fixture (offline) plus manual browser proof where a real site interaction is required.
- [ ] **Traceability:** Record changed files, relevant test command/results, a commit/PR reference (if implemented), and remaining limitations.

## Dependencies

[[LIB-001-define-media-asset-index-and-provenance-schema|LIB-001]], [[LIB-009-create-asset-detail-inspector|LIB-009]]

## Suggested implementation steps

1. Review dependency tickets, [[MASTER-PLAN]], and relevant architecture/security guidelines; confirm the intended interface and constraints.
2. Write or update a failing test/fixture or a research verification checklist for this specific behavior.
3. Implement only this ticket's scoped change; do not expand into unrelated backlog tasks.
4. Execute positive, negative, and interruption tests; update documentation and reproducible evidence.
5. Request review, address findings and update ticket properties only after Definition of Done is satisfied.

## Verification notes

**Specific verification:** Re-import validation detects missing files and provenance links.

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
