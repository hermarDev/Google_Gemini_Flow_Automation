---
type: sprint
sprint: "Sprint-05"
status: planned
created: 2026-10-19
planned_start: null
planned_end: null
capacity_points: null
---
# Sprint 5: Persistent queue, batch control and recovery

**Objective:** Persistent queue, batch control and recovery.  
**Prerequisites:** Prior sprint exit gate and dependency tickets.  
**Exit criteria:** Persistent queue survives lifecycle faults without duplicate paid submissions; consent and budget ceilings are enforced.

## Scope (20 tickets)

- [ ] [[JOB-001-define-versioned-job-and-jobattempt-schemas|JOB-001]] — Define versioned Job and JobAttempt schemas (`high`)
- [ ] [[JOB-002-implement-explicit-job-state-machine|JOB-002]] — Implement explicit job state machine (`critical`)
- [ ] [[JOB-003-build-durable-indexeddb-job-repository|JOB-003]] — Build durable IndexedDB job repository (`high`)
- [ ] [[JOB-004-implement-event-driven-worker-coordinator|JOB-004]] — Implement event-driven worker coordinator (`high`)
- [ ] [[JOB-005-implement-per-provider-concurrency-policy|JOB-005]] — Implement per-provider concurrency policy (`medium`)
- [ ] [[JOB-006-build-queue-insertion-and-priority|JOB-006]] — Build queue insertion and priority (`medium`)
- [ ] [[JOB-007-implement-pause-and-resume-semantics|JOB-007]] — Implement pause and resume semantics (`medium`)
- [ ] [[JOB-008-implement-cancel-and-stop-controls|JOB-008]] — Implement cancel and stop controls (`medium`)
- [ ] [[JOB-009-build-bounded-retry-policies|JOB-009]] — Build bounded retry policies (`medium`)
- [ ] [[JOB-010-implement-interrupted-job-reconciliation|JOB-010]] — Implement interrupted-job reconciliation (`critical`)
- [ ] [[JOB-011-prevent-duplicate-charged-submissions|JOB-011]] — Prevent duplicate charged submissions (`critical`)
- [ ] [[JOB-012-implement-live-job-events-and-activity-log|JOB-012]] — Implement live job events and activity log (`medium`)
- [ ] [[JOB-013-support-json-txt-csv-batch-imports|JOB-013]] — Support JSON/TXT/CSV batch imports (`medium`)
- [ ] [[JOB-014-implement-batch-dry-run-and-preflight|JOB-014]] — Implement batch dry-run and preflight (`medium`)
- [ ] [[JOB-015-implement-budget-approval-and-scheduling-gate|JOB-015]] — Implement budget approval and scheduling gate (`medium`)
- [ ] [[JOB-016-implement-queue-progress-and-time-status|JOB-016]] — Implement queue progress and time status (`medium`)
- [ ] [[JOB-017-implement-tab-project-ownership-lock|JOB-017]] — Implement tab/project ownership lock (`medium`)
- [ ] [[JOB-018-implement-browser-notifications-for-terminal-events|JOB-018]] — Implement browser notifications for terminal events (`medium`)
- [ ] [[JOB-019-create-queue-crash-reload-test-matrix|JOB-019]] — Create queue crash/reload test matrix (`medium`)
- [ ] [[JOB-020-document-job-recovery-operator-playbook|JOB-020]] — Document job recovery operator playbook (`medium`)

## Execution policy

- Start with unblocked tickets and set `status: in-progress`; retain file location.
- Track WIP: at most 2 implementation tickets per agent, and only 1 live UI automation ticket per Google tab/profile.
- Document evidence, failed tests, blockers and spending; never infer a paid submission failed because acknowledgement disappeared.
- New scope becomes a new ticket, not a hidden change to the current sprint goal.

## Sprint review and retrospective

- **Demo evidence:** Pending
- **Completed / carried forward:** Pending
- **Bugs and regressions:** Pending
- **Security/licensing/budget notes:** Pending
- **Retro: Keep / Improve / Try:** Pending
- **Go / no-go and approver:** Pending
