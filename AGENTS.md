# AI Media Automator — Agent work rules

## Absolute boundaries

- **Planning vault:** `/home/hrmr/Big-Brain-Obsidian/Big-Brain/Projects/AI-Media-Automator/`.
- **Source workspace (proposed):** `/home/hrmr/Projects/ai-media-automator/`.
- Never modify unrelated Obsidian notes, `/etc`, other user projects, dotfiles, browser profile, secrets, installed browser extensions or global package settings unless the owner separately and explicitly approves that exact task.
- **Do not assume the assistant/agent can reach the Fedora machine** just because its path is documented. The initial ZIP is a portable planning artifact.
- Never delete, force-reset or overwrite unrelated files; do not run blanket cleanup or permission-bypass commands.

## Ticket workflow

1. Read [[Project-Home]], [[MASTER-PLAN]], [[DEFINITION-OF-DONE]], [[RISKS-AND-ASSUMPTIONS]], and current sprint before making changes.
2. Pick only one unblocked ticket at a time; set YAML `status: in-progress` and update `updated` date.
3. Respect ticket dependencies; if prerequisite failed, mark blocked and explain.
4. Work on branch named `ticket/<ID>-short-slug`, with commit references linking back to ticket. Branches/PRs are used only after the owner has initialized a source Git repository.
5. Keep source changes within the approved source workspace. Do not use the Obsidian project folder for `node_modules`, `.env`, caches, builds or generated media.
6. Add tests and run checks. Record exact commands and results; never fabricate passing tests, credit usage, downloaded media or browser screenshots.
7. Move ticket through `review`, `qa`, then `done` only after acceptance and reviewer sign-off. Update Work log and Closure fields.
8. Do not auto-merge, force-push, publish extension, use user accounts, or spend Google credits without owner authorization.

## Parallel work and review

- Owner assigns one agent per shared component; agents should not concurrently edit overlapping files or control the same Google tab.
- Reviewer is logically separate from implementer when possible. Code review checks changed scope, security, regressions, user cost and tests.
- Parallelize independent fixture, docs, UI component or static analysis tickets; serialize authenticated provider automation tests.
- Never infer `done` from `git push` or successful merge alone; require acceptance evidence.

## Product-specific prohibitions

- No CAPTCHA solving, rate-limit bypass, browser fingerprint evasion, token/session interception, reverse engineered private API bridge or secret harvesting.
- No blind replay after provider Generate click; ambiguous job becomes `needs-review`.
- No silent model fallback from Omni to Veo or higher priced output.
- No fabricated generation duration, aspect ratio, credit pricing, progress or user account availability.
- Respect licensing and attribution before copying upstream source code.

## UI design rules

Read [[UI-UX-GUIDELINES]] and [[DESIGN-SYSTEM]]. Avoid generic AI slop, fake counters/metrics, overdecorated gradients, emoji navigation, inaccessible controls or overly animated dashboards. Review a wireframe before implementing a complex UI.

## Work command template

> Read `Projects/AI-Media-Automator/03-Sprints/Sprint-00/Sprint-00.md` and the first unblocked `RES-*` ticket. Audit only that ticket, record verifiable evidence in its note, update the work log and set `review` when done. Respect AGENTS.md and do not start implementation or paid Google operations until reviewed.
