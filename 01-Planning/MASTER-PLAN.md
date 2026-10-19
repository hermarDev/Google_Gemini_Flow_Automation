---
type: planning
status: approved-for-research
created: 2026-10-19
---
# Master development plan — AI Media Automator

## 1. Executive objective

Build an **original, reliable, secure, local-first Chromium Manifest V3 extension** that automates image creation from Gemini Chat and image/video creation from Google Flow, observes user-approved model/duration/aspect settings, controls the cost of generation, and downloads verified media assets into an organized browser Downloads subfolder. Work is organized as verifiable, local Markdown Agile tickets inside Obsidian.

The result must be a usable creator productivity app, **not an uncontrolled bot** and not a clone of an upstream extension. Automatic actions are allowed only through the user's already-authenticated visible website experience and within service terms; manual sign-in, credit consent, policy refusals and provider restrictions are respected.

## 2. Immutable product principles

1. **No surprise charges:** Each paid batch requires user approval after model, output count, estimated credits and actual settings have been checked.
2. **No duplicate paid submits:** Uncertain post-click state becomes `needs-review` for human reconciliation; no blind retries.
3. **Omni-first, not Omni-only:** Default video profile is **Gemini Omni Flash, 720p, 10 seconds, 9:16** (15 credits/output as of 2026-10-19). An optional 360p budget preset is available when Google allows it. Veo remains selectable.
4. **Capability-driven UI:** Show unsupported provider/model/ratio/duration combinations as disabled with reasons, not silently coerced.
5. **Downloads are verified:** Do not mistake preview thumbnails, transient links or started downloads for completed files.
6. **No generic AI slop:** Purposeful layout, low decoration, clear states and deliberate copywriting.
7. **Source security before convenience:** No credential/token harvesting, CAPTCHA bypass, hidden private API bridge, anti-detection evasion or forced long-running debug attachments.
8. **Local ownership:** User owns data stored in browser and local Markdown notes; optional developer repo remains separate from Obsidian vault.
9. **Truthful statuses:** Proven `completed` means output was actually produced and obtained; errors and uncertainty are visible.

## 3. Scope tiers

### MVP (through Sprint 4, with minimum queue reliability from Sprint 5)

- Side panel and focused workspace with professional design system.
- Gemini image generation, conversation targeting, safe submit, high-resolution image downloads.
- Flow image generation with Nano Banana availability detection, model/ratio/count control and downloads.
- Flow video generation with Gemini Omni default and optional Veo, 9:16 or 16:9, valid 4/6/8/10s where supported, 360p/720p if available, downloads, truthful progress.
- Safe job state persistence, explicit credit consent, interruption handling and error reports.

### V1 (complete through Sprint 8)

- Importable batch jobs, pause/resume, safe recovery, deduplicated downloads.
- Asset gallery, metadata, history and image-to-video chaining (Gemini → Flow; Flow image → video).
- Custom profiles, model capability guards, price freshness, daily/session budgets and diagnostics.
- Automated mock tests, live manual verification budget controls, security/privacy QA, release package.

### Post-V1 candidates (not promises)

- Native-host helper for user-selected arbitrary output paths, after additional security review.
- Optional CLI/MCP orchestration, only via scoped commands and explicit auth/permissions.
- Multi-profile support, official API adapters if offered, advanced video editing/extend if verified.
- Optional Obsidian ticket synchronizer beyond plain Markdown, only after local workflow proves stable.

## 4. Success metrics and acceptance targets

- Zero unapproved Generate clicks in tests; all batches require explicit cost/profile approval.
- Zero automatically duplicated uncertain paid submissions in crash-injection tests.
- All initial 176 ticket records have dependency and acceptance-criteria validation.
- Main controls operable by keyboard with visible focus and meaningful screen-reader labels.
- Successful downloads are confirmed by Chrome completion events and file validation strategy.
- Empty states, unsupported features, quota failures and site incompatibility have clear remedies.
- The final packaging checklist contains documented browser versions, Google model availability and live account limitations.

## 5. Work management and deliverables

- [[DEVELOPMENT-ROADMAP]]: sequencing, gates, milestones and dependencies.
- [[PRODUCT-REQUIREMENTS]]: functional/nonfunctional behavior and edge cases.
- [[FEATURE-MATRIX]] and [[MODEL-COMPATIBILITY]]: coverage and verified/unknown distinctions.
- [[SYSTEM-ARCHITECTURE]] + [[DATA-MODEL]]: adapters, worker lifecycle, storage and messages.
- [[UI-UX-GUIDELINES]] and [[DESIGN-SYSTEM]]: stringent visual/interaction standards.
- [[SECURITY-AND-PRIVACY]], [[TEST-STRATEGY]], [[RELEASE-CHECKLIST]]: quality controls.
- [[Backlog-Index]]: 176 atomic tickets; [[Sprint-00]] is the beginning.

## 6. Agile operating rules

- Use one or two-week timeboxes **only after actual team capacity is known**. Ticket sequence matters more than arbitrary calendar dates.
- Default statuses: backlog, ready, in-progress, review, qa, done, blocked, cancelled.
- At sprint planning, score tickets based on actual research; only unblocked work enters Active.
- Every PR/change must reference exactly relevant ticket IDs and supply tests/review; no speculative feature sprawl.
- For parallel AI agents, isolate files and active tabs; review shared architecture in a single owner-controlled branch.
- Close each sprint with demo, evidence, defects, retro, risk update and go/no-go decision.

## 7. Technical architecture summary

- React + TypeScript + Vite extension UI; MV3 service worker for event-driven coordination; isolated content-script adapters for Gemini and Flow.
- Chrome Storage for preferences, IndexedDB for job/asset metadata, Chrome Downloads API for relative downloads folder.
- Job orchestration is durable, event-driven and resumable, not a permanently alive background process.
- One outbound provider submission per confirmed job attempt; abort on UI setting drift.
- No backend required for V1; a developer server is for builds/tests only.

## 8. What must be proven in Sprint 0

- Is the particular Gemini and Flow UI accessible with the user's account and region?
- Which model modes and credit prices are visibly selectable today? Official general availability does not guarantee user-level availability.
- Does live UI interaction permit a stable, policy-compliant automation route without privileged debugger/private API use?
- Are the upstream dependencies and licenses acceptable for any code reuse?
- What browser versions/permissions and storage limits are acceptable?

**If a critical answer is negative:** adapt scope or stop the affected feature; never claim it is implemented or work around platform protections secretly.

## 9. Release definition

Release requires a reproducible bundled extension, documented user install, complete source license review, security/privacy pass, regression suite, crash recovery tests, meaningful manual browser demonstrations (or clearly named unsupported account constraints), and owner approval. [[RELEASE-CHECKLIST]] is authoritative.
