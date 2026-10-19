---
type: project
status: planning
created: 2026-10-19
project: AI Media Automator
---
# AI Media Automator — Obsidian Agile workspace

> **Planning only.** This package is a local-first Obsidian project workspace with **176 individually authored tickets**, 9 sprint plans, epics and guidance. It is not a finished browser extension and no live Google account has been tested.

## Start here

1. Open [[Project-Home]] for the project hub and [[MASTER-PLAN]] for strategic scope.
2. Read [[Open-Source-Audit]], [[MODEL-COMPATIBILITY]], [[CREDIT-PRICING]], and [[RISKS-AND-ASSUMPTIONS]]. The upstream repos describe features; our runtime support remains **unverified until tested**.
3. Review [[AGENTS]] and [[DEFINITION-OF-DONE]] before instructing coding agents.
4. Open [[Sprint-00]] and begin the first unblocked `RES-*` ticket. Do not implement paid automation before feasibility gates.
5. Use [[Sprint-Board]] for optional Dataview queries or [[Backlog-Index]] to navigate without plugins.

## Exact intended locations

- **Obsidian vault:** `/home/hrmr/Big-Brain-Obsidian/Big-Brain/`
- **This project's target folder:** `/home/hrmr/Big-Brain-Obsidian/Big-Brain/Projects/AI-Media-Automator/`
- **Separate implementation repository (proposed, not created):** `/home/hrmr/Projects/ai-media-automator/`

The downloaded ZIP preserves `Projects/AI-Media-Automator/` as its folder prefix. Extract it **inside the vault root** after reviewing contents; never overwrite existing project notes without a backup.

## Product decisions

- Own Chrome/Chromium Manifest V3 extension; local-first side panel and full-page workspace.
- Gemini Chat image automation and Google Flow image + video automation.
- Preferred video profile: **Gemini Omni Flash, 720p, 10 seconds, 9:16**, **15 credits/output** as shown by Google's help page on 2026-10-19, subject to active UI verification.
- Optional **Omni 360p** and **Veo 3.1** models (availability and costs vary). User-approved output count and price estimate before submission.
- Prompt-to-image, prompt-to-video, images-to-video, controlled queues and verified auto-downloads.
- Clean restrained UI; explicitly reject generic, overdecorated AI dashboard styling.
- No token interception, CAPTCHA solving, rate-limit evasion, silent paid retries, or scraping credentials.

## Status principles

- Status is stored in ticket YAML: `backlog`, `ready`, `in-progress`, `review`, `qa`, `done`, `blocked`, `cancelled`.
- A ticket remains in its category folder; don't move it on status changes.
- When dependencies are satisfied, manually or via agent review change `backlog` to `ready`.
- Obsidian plugin dashboards are optional; no plugin is required to read and edit all notes.

## Project directory map

- `00-Dashboard/` — home, generated backlog index, sprint board, progress.
- `01-Planning/` — full product/engineering/security/release specifications.
- `02-Epics/` — 9 epics.
- `03-Sprints/` — 9 sprint plans.
- `04-Tickets/` — all ticket Markdown notes grouped by category.
- `05-Design/` — design and wireframe instructions.
- `06-Testing/` — testing and evidence conventions.
- `07-Research/` — dated open-source, credit, capability audits.
- `08-Development-Logs/` — chronological log.
- `09-Templates/` — new ticket/bug/sprint templates.
- `tools/` — local validation script for planning notes.

**Licensing:** Audit upstream source files and exact SHAs before any implementation is copied. The user owns the new extension; third-party credits and license obligations remain intact.
