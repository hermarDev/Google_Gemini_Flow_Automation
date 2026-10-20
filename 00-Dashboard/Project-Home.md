---
type: project-dashboard
project: AI Media Automator
created: 2026-10-19
status: in-progress
---
# AI Media Automator · Project Home

> [!important] Current milestone
> **Sprint 1: extension foundation and design system.** Sprint 0 research complete. Gemini Omni Flash 720p / 10s / 9:16 is the proposed default **if available**. Changes to pricing, capability, model identity or provider UI must be rechecked before implementation.

## Command center

| Planning | Tickets | Research | Quality |
|---|---|---|---|
| [[MASTER-PLAN]] | [[Backlog-Index]] | [[Open-Source-Audit]] | [[DEFINITION-OF-DONE]] |
| [[PRODUCT-REQUIREMENTS]] | [[Sprint-Board]] | [[MODEL-COMPATIBILITY]] | [[TEST-STRATEGY]] |
| [[SYSTEM-ARCHITECTURE]] | [[Progress-Tracker]] | [[CREDIT-PRICING]] | [[SECURITY-AND-PRIVACY]] |
| [[UI-UX-GUIDELINES]] | [[Sprint-00]] | [[RISKS-AND-ASSUMPTIONS]] | [[RELEASE-CHECKLIST]] |

## Sprint sequence

- [[Sprint-00]] — Research and product definition (18 tickets)
- [[Sprint-01]] — Extension foundation and design system (20 tickets)
- [[Sprint-02]] — Gemini Chat image adapter (18 tickets)
- [[Sprint-03]] — Google Flow image adapter (18 tickets)
- [[Sprint-04]] — Google Flow Omni and Veo video engine (22 tickets)
- [[Sprint-05]] — Persistent queue, batch control and recovery (20 tickets)
- [[Sprint-06]] — Downloads, media library and creative workflows (18 tickets)
- [[Sprint-07]] — Budgets, presets, user control and diagnostics (18 tickets)
- [[Sprint-08]] — Security, release readiness and maintenance (24 tickets)

## Live tickets (optional Dataview community plugin)

```dataview
TABLE WITHOUT ID file.link AS Ticket, priority, sprint, assignee
FROM "Projects/AI-Media-Automator/04-Tickets"
WHERE status = "in-progress" OR status = "blocked" OR status = "review" OR status = "qa"
SORT sprint ASC, priority ASC, id ASC
```

## No-plugin navigation

Open [[Backlog-Index]] for every ticket, or go directly to [[Sprint-00]]. The dashboard queries are optional convenience only.

## Decision log

- 2026-10-19: Local-first Obsidian ticketing; separate implementation source repository.
- 2026-10-19: Budget-oriented Omni as the default; Veo remains optional, without unverified auto-fallback.
- 2026-10-19: New original extension, upstream code reference only after permission/license/security review.
