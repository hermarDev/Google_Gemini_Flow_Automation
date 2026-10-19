---
type: epic
id: EPIC-006
status: planned
sprint: "Sprint-05"
created: 2026-10-19
---
# EPIC-006 — Persistent queue, batch control and recovery

**Purpose:** Establish a testable, secure capability for persistent queue, batch control and recovery.  
**Proposed sprint:** [[Sprint-05]]  
**Ticket count:** 20

## Child tickets

- [[JOB-001-define-versioned-job-and-jobattempt-schemas|JOB-001]] — Define versioned Job and JobAttempt schemas
- [[JOB-002-implement-explicit-job-state-machine|JOB-002]] — Implement explicit job state machine
- [[JOB-003-build-durable-indexeddb-job-repository|JOB-003]] — Build durable IndexedDB job repository
- [[JOB-004-implement-event-driven-worker-coordinator|JOB-004]] — Implement event-driven worker coordinator
- [[JOB-005-implement-per-provider-concurrency-policy|JOB-005]] — Implement per-provider concurrency policy
- [[JOB-006-build-queue-insertion-and-priority|JOB-006]] — Build queue insertion and priority
- [[JOB-007-implement-pause-and-resume-semantics|JOB-007]] — Implement pause and resume semantics
- [[JOB-008-implement-cancel-and-stop-controls|JOB-008]] — Implement cancel and stop controls
- [[JOB-009-build-bounded-retry-policies|JOB-009]] — Build bounded retry policies
- [[JOB-010-implement-interrupted-job-reconciliation|JOB-010]] — Implement interrupted-job reconciliation
- [[JOB-011-prevent-duplicate-charged-submissions|JOB-011]] — Prevent duplicate charged submissions
- [[JOB-012-implement-live-job-events-and-activity-log|JOB-012]] — Implement live job events and activity log
- [[JOB-013-support-json-txt-csv-batch-imports|JOB-013]] — Support JSON/TXT/CSV batch imports
- [[JOB-014-implement-batch-dry-run-and-preflight|JOB-014]] — Implement batch dry-run and preflight
- [[JOB-015-implement-budget-approval-and-scheduling-gate|JOB-015]] — Implement budget approval and scheduling gate
- [[JOB-016-implement-queue-progress-and-time-status|JOB-016]] — Implement queue progress and time status
- [[JOB-017-implement-tab-project-ownership-lock|JOB-017]] — Implement tab/project ownership lock
- [[JOB-018-implement-browser-notifications-for-terminal-events|JOB-018]] — Implement browser notifications for terminal events
- [[JOB-019-create-queue-crash-reload-test-matrix|JOB-019]] — Create queue crash/reload test matrix
- [[JOB-020-document-job-recovery-operator-playbook|JOB-020]] — Document job recovery operator playbook

## Gate

Epic is complete only when child-ticket acceptance criteria, evidence and applicable sprint gate are met. Do not mark a parent Done for code-only or mock-only work when live verification was required.
