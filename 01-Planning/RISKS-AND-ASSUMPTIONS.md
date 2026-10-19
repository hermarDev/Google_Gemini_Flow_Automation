# Risks, constraints, assumptions and decision gates

| ID | Risk | Probability | Impact | Mitigation / gate |
|---|---|---|---|---|
| R-01 | Google changes DOM selectors | High | High | Adapter ownership, fixture snapshots, safe-unknown stop, compatibility tests |
| R-02 | Browser automation violates provider restrictions | Unknown | Critical | Review current terms/policies, use visible supported actions only; defer noncompliant mode |
| R-03 | Silent repeated paid request after crash | Medium | Critical | Durable checkpoints, no blind retries, needs-review state, manual reconciliation |
| R-04 | Unexpected model/variation increases cost | Medium | Critical | Re-read settings before submission and require budget reconfirmation |
| R-05 | Upstream README says MIT but repository may lack license file | Medium | High | Verify LICENSE at exact SHA; use ideas only until legal clearance |
| R-06 | Different plan/account/region controls model availability | High | Medium | Live UI capability probing and disabled unsupported options |
| R-07 | MV3 service worker stops during long renders | High | High | IndexedDB, alarms/events, never memory-only progress |
| R-08 | Browser cannot save arbitrary Fedora absolute paths | Certain | Medium | Relative Chrome Downloads structure; future user-approved native helper only |
| R-09 | Source image provenance unavailable across sites | Medium | Medium | Local media picker/attach verification; preserve unknown provenance label |
| R-10 | UI becomes generic or inaccessible | Medium | Medium | Wireframes, design tokens, anti-slop audit and accessibility gates |
| R-11 | Provider download URL expires or returns HTML | Medium | High | Verify completed DownloadItem plus MIME/media validation |
| R-12 | User spends too many credits while QA tests | Medium | High | Explicit test credit budget, mock first, manual confirmation for live spend |
| R-13 | Third-party extension exploits risky privileges | Medium | Critical | Review upstream without installing into signed-in production browser; never copy auth bypass |
| R-14 | Parallel agents race on files or Google tab | Medium | High | Ticket ownership, WIP cap, module locks and reviewed merges |
| R-15 | Pricing page changes over time | High | Medium | Source date, freshness reminders, UI price verification before expensive batch |

## Assumptions requiring tests

1. User uses Chromium-based browser in Fedora and can open Gemini/Flow in a logged-in tab.
2. The account has access to relevant Google AI models; this is not assumed verified.
3. Chrome extension has user-approved permissions to access those sites and save downloads.
4. The extension's purpose remains personal productivity, not multi-account quota circumvention.
5. The Obsidian vault remains at `/home/hrmr/Big-Brain-Obsidian/Big-Brain/` and the planning folder is `Projects/AI-Media-Automator/`.

## Conditions to stop or reduce scope

- Compliant and robust UI automation route cannot be demonstrated for a provider.
- The available UI requires stealing/intercepting hidden tokens or bypassing human verification challenges.
- Settings cannot be verified and the generation might spend credits.
- Paid test budget not approved.
- Attribution/license clearance for copied code not established.

## Owner review decisions

| Date | Decision | Reviewer | Evidence |
|---|---|---|---|
| 2026-10-19 | Research first; Omni default, Veo optional; Obsidian ticketing | User preference | Conversation requirement |
| Pending | Confirm allowed UI automation strategy | — | [[Open-Source-Audit]] |
| Pending | Confirm implementation repo location and source license | — | [[SYSTEM-ARCHITECTURE]] |
