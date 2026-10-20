# AI Media Automator — GEM-001 Gemini Readiness Plan

> **For Hermes:** Implement this plan task-by-task after resolving the gates below. Keep one implementation owner; use a separate read-only reviewer after the diff is stable.

**Goal:** Complete GEM-001 so the extension reports a Gemini tab as ready only when it is on a supported conversation route and a visible composer is present, and otherwise gives a truthful, actionable status without submitting anything.

**Architecture:** Keep Gemini route/composer detection in the isolated `extension/src/content/gemini.ts` content script, which answers the existing typed `CHECK_TAB_STATUS` protocol with a minimal readiness result. Have the side panel consume that handshake for Gemini instead of treating the hostname alone as proof of readiness; preserve Flow behavior and all generation/submission work for later tickets.

**Tech Stack:** Chrome Manifest V3, TypeScript, React, Vite, Vitest, Testing Library, Playwright.

---

## Current context / assumptions

- The user has authorized autonomous execution of this project and its normal GitHub workflow.
- The working checkout `/home/hrmr/Big-Brain-Obsidian/Big-Brain/Projects/AI-Media-Automator/` is the active project workspace for this task. Do not write outside this repository except the already-used Hermes coordination state; do not add secrets or generated media.
- The source checkout is on `ticket/GEM-001-gemini-tab-readiness`, based on current `origin/main` (`84cee5fd0809e1bd7b4591bd8d9da67340ddb491`). Local changes are scoped to GEM-001 plus its plan; preserve and stage only those paths.
- Live GitHub verification on 2026-10-21: PR #38 is merged to `main` at `84cee5fd0809e1bd7b4591bd8d9da67340ddb491`; its merged tree contains the PR #37 base work. PR #37's old head is stale/conflicting and has been closed as superseded. No external GitHub reviews were recorded on either PR.
- GEM-001's dependencies CORE-016/017 are done. The feature implementation and regression tests have passed local gates and a focused independent read-only review. Move the ticket to `review`; do not claim it done until its implementation PR is reviewed/merged and any required checks pass.
- No live Gemini sign-in, prompt entry, generation, paid action, CAPTCHA handling, token/cookie access, debugger API or private API is in scope. Do not infer live-provider compatibility from fixtures.

## Gates before implementation

1. **Workspace gate — resolved:** User authorized autonomous work on this project. Use only this existing repository checkout; keep generated build output within its existing ignored `extension/dist/` path.
2. **Sprint gate — resolved for GEM-001:** Current `main` contains merged PR #38; PR #37 was verified redundant and closed. Sprint 1's independent review/closure evidence is still being reconciled separately; this does not authorize generation or release.
3. **Concurrency gate — resolved for current increment:** Coordination claim `1e5fd220-7535-46b1-b3d5-c4064d9d929b` owns the plan, ticket and exact GEM-001 code/test paths. Renew it before expiry; do not change unrelated work.
4. **Dirty-work gate — resolved:** The local changes in `gemini.ts`, its tests, SidePanel/tests and fixture tests are the GEM-001 implementation. Commit/push only these plus this plan and GEM-001 ticket; leave all other files untouched.

## Scope and acceptance checks

**In scope:** exact supported Gemini host + documented conversation-route recognition; read-only visible-composer readiness; typed, same-extension/same-tab handshake; accurate side-panel ready/not-ready wording; offline tests; GEM-001 evidence and review handoff.

**Out of scope:** Gemini prompt injection or submission, account/model/capability detection, conversation locking, Flow readiness changes, downloads, pricing checks, paid/live generation, new dependencies, sweeping refactors, Sprint 2 closure, and merging/publishing the extension.

Acceptance is met only when:

- `/app` and non-conversation routes are not ready; the documented `/app/<conversation_id>` and `/u/<account_index>/app/<conversation_id>` routes are eligible only when the expected composer is visible.
- Wrong host, missing/hidden composer, missing or mismatched tab identity, malformed message, and a content-script-unavailable response all fail closed.
- The reply includes only the existing protocol's tab ID, `provider: 'gemini'`, and boolean `connected`; it does not return page URL/title, prompt, account, token, or cookie data.
- A Gemini tab cannot be labelled ready just because its hostname matches. Not-ready UI tells the user to open a conversation and wait for the prompt composer; Generate remains disabled when not ready. No connection check submits a generation.
- Flow behavior and current mock-only labeling remain unchanged.
- Focused unit tests, full tests, lint, typecheck, format check, build, and packaged smoke checks are run only from the approved source/build location; unavailable live checks are marked **NOT RUN**, never inferred green.

## Orchestration / ownership

- **Orchestrator / implementer:** one owner for this ticket and all shared implementation files.
- **Independent reviewer:** one separate read-only QA/security review after implementation; check route negatives, message sender/tab binding, UI false-ready behavior, privacy minimization, and regressions. Reviewer must not edit the implementer's checkout or approve their own work.
- Do not parallelize implementation of `gemini.ts`, its tests, or `SidePanel.tsx`. No agent controls a signed-in Google tab. Parallel work is unnecessary for this small, coupled slice.
- Before editing, re-read `AGENTS.md`, this plan, the current sprint, the ticket, current Git status/diff, and active coordination claims. Use the coordination helper only after workspace/sprint approval; the command's `claim` must include `--scope`, `--summary`, and every known touched path. Release/complete only the claim owned by this implementation session.

## Step-by-step tasks

### Task 1 — Resolve gates and freeze the baseline (5 minutes)

**Files:** Read-only: `AGENTS.md`, `03-Sprints/Sprint-01/Sprint-01.md`, `03-Sprints/Sprint-02/Sprint-02.md`, `04-Tickets/Features/CORE-019-establish-component-extension-and-smoke-test-harness.md`, `04-Tickets/Features/CORE-020-deliver-sprint-1-vertical-slice.md`, `04-Tickets/Features/GEM-001-implement-gemini-tab-detection-and-adapter-handshake.md`.

1. Confirm which checkout is authorized for source writes and generated output, and whether Sprint 1's gate is approved or explicitly waived for GEM-001. Do not infer either from branch names or old ticket notes.
2. In the selected repo, run `git status --short --branch` and inspect `git diff -- extension/src/content/gemini.ts`; inspect the untracked `extension/src/content/__tests__/gemini.test.ts` with a file reader. Preserve all existing work.
3. Run `python3 /home/hrmr/.hermes/skills/project-work-coordination/scripts/coord.py list`. If any active claim may overlap, stop for owner handoff. If clear, atomically claim the relevant paths before editing.
4. Reconcile PR #37/#38 state read-only only if GitHub access is already authorized and available. Do not refresh credentials, post a review, edit remote tickets, merge, or bypass an approval gate as part of this plan.

**Stop condition:** If workspace or Sprint 1 approval is unresolved, do not run mutating/build commands or proceed to code tasks. Report the needed owner decision.

### Task 2 — Add/finish route and visible-composer regression cases (5 minutes)

**Files:** `extension/src/content/__tests__/gemini.test.ts`; implementation, if the tests expose a defect: `extension/src/content/gemini.ts`.

1. Preserve existing tests; add only missing cases from this matrix:
   - `gemini.google.com` + `/app` → false.
   - `gemini.google.com` + `/app/conversation-123` → route eligible.
   - `gemini.google.com` + `/u/0/app/conversation-123` → route eligible.
   - `gemini.google.com.attacker.invalid` + `/app/conversation-123` → false.
   - valid conversation route with no composer or a hidden composer → not ready.
2. Run from the approved `extension/` source directory: `npm test -- --reporter=dot src/content/__tests__/gemini.test.ts`.
3. Expected red check: the newly added assertion fails for the missing behavior, while the existing suite is discovered. If it unexpectedly passes, confirm the test actually exercises the intended route/visibility condition before proceeding.
4. Make the smallest change to `isGeminiChat`/`isGeminiReady`; do not add a selector framework or resilient selector ladder here—GEM-004 owns selector discovery.
5. Rerun the same command. Expected: exit code 0 and the Gemini test file passes.

### Task 3 — Close handshake negative cases (5 minutes)

**Files:** `extension/src/content/__tests__/gemini.test.ts`; modify `extension/src/content/gemini.ts` only if a test shows a defect.

1. Add explicit tests proving no response for: wrong `sender.id`, missing `sender.tab.id`, payload `tabId` that differs from `sender.tab.id`, and malformed protocol data. Retain the valid same-extension/same-tab response test.
2. Assert the valid response parses as `TAB_STATUS_RESULT` with `{ tabId: 7, provider: 'gemini', connected: true }` when the visible-composer fixture is used; assert serialized response contains none of `url`, `title`, `email`, `prompt`, `token`, or `cookie`.
3. Run `npm test -- --reporter=dot src/content/__tests__/gemini.test.ts` from the approved source directory; expected red on any missing guard, then implement minimally and rerun to exit code 0.
4. Keep the listener read-only: it may inspect route and visible composer only. Do not add DOM mutation, logging of user content, storage writes, or submission actions.

### Task 4 — Make side-panel Gemini status depend on the handshake (5 minutes)

**Files:** `extension/src/sidepanel/__tests__/SidePanel.test.tsx`, `extension/src/sidepanel/SidePanel.tsx`.

1. Extend the existing Chrome test double with `tabs.sendMessage` behavior; do not introduce a new test framework. Add a failing test for an exact Gemini URL whose content script reports `connected: false`: the UI must show a Gemini-specific actionable not-ready message and the Generate button must remain disabled. Add the matching ready-reply case and a no-reply/`runtime.lastError` case.
2. Run `npm test -- --reporter=dot src/sidepanel/__tests__/SidePanel.test.tsx`; expected red for the new cases before production code changes.
3. In the active-tab detection path, retain current exact HTTPS-host checking. For `provider === 'gemini'`, send `createMessage('CHECK_TAB_STATUS', 'sidepanel', { tabId })` with `chrome.tabs.sendMessage`; parse the callback using `parseExtensionMessage`; accept readiness only when parsing succeeds, type is `TAB_STATUS_RESULT`, returned `tabId` equals the queried tab ID, provider is `gemini`, and `connected === true`. Any callback `runtime.lastError`, missing response, malformed result, wrong provider, or stale/mismatched tab must set disconnected/not-ready. Keep the response minimal and do not log the tab URL or page contents.
4. Preserve existing Flow behavior unchanged. Do not equate a recognized Gemini host with a ready conversation.
5. Replace the generic warning only for the Gemini-not-ready state with actionable copy: **“Gemini conversation not ready”** and **“Open a Gemini conversation and wait for the prompt box to load. This check does not submit a generation.”** Keep the existing generic warning for non-Google tabs. If a small optional status field is needed, add only that field to `TabConnection`; avoid broader status-model refactors.
6. Rerun the focused side-panel test command. Expected: exit code 0, all tests in the file pass, ready and not-ready messages match the fixtures, and Generate stays disabled for not-ready states.

### Task 5 — Verify regression, scope, and packaged extension (5 minutes per command group)

**Files:** no new code unless a failed check identifies a scoped GEM-001 defect; likely checks cover `extension/src/content/`, `extension/src/sidepanel/`, and `extension/manifest.json`.

Run these only from the approved source/build workspace, with Node.js >=22 and npm >=10, as declared in `extension/README.md` and `extension/package.json`:

```bash
npm test -- --reporter=dot
npm run format:check
npm run lint
npm run typecheck
npm run build
npm run test:smoke
npm run test:extension
```

Expected: each command exits 0; Vitest reports all discovered tests passed; format check reports all checked files unchanged; lint/typecheck report no errors; build produces the MV3 bundle; preview and packaged-extension Playwright checks pass. Record the actual suite/test counts and command outputs in the ticket; do not copy historical counts from CORE-019/020. Run `npm run test:smoke` and `npm run test:extension` after the successful build. If policy forbids generating `extension/dist/` in the selected checkout, do not run the build there—first use an owner-approved source/build workspace.

Do **not** run live Gemini generation. An optional user-supervised, read-only visual check may confirm that a logged-in conversation's composer is visible, but requires no prompt entry or Generate click; if unavailable, mark it **NOT RUN**.

### Task 6 — Independent review, traceability, and handoff (5 minutes)

**Files:** `04-Tickets/Features/GEM-001-implement-gemini-tab-detection-and-adapter-handshake.md`; `03-Sprints/Sprint-02/Sprint-02.md` only if project tracking conventions require a checklist update; `08-Development-Logs/<new dated entry>.md` only if the established log requires one.

1. Re-read the final diff and preserve the independent read-only review result recorded in the ticket work log. That review passed the malformed-message parser and packaged SidePanel E2E fixes. If later changes alter those paths, request another focused review.
2. GEM-001 is now `review`, not `done`, until its scoped PR passes remote CI and review/QA acceptance. Record actual PR/commit and any failed or pending gates; never claim a live Gemini test from offline evidence.
3. Sprint 2 remains `planned` until its prior sprint prerequisite and planning criteria are satisfied. Do not mark Sprint 1 complete based solely on PR #38 merging: its local sprint note still records external review/closure evidence as pending, so obtain a separate read-only Sprint 1 gate review.
4. The user authorized autonomous project execution on 2026-10-21, including normal scoped GitHub delivery. Stage only GEM-001-owned code/tests, the GEM-001 ticket, and this plan; inspect staged paths and `git diff --cached --check`; then commit, push `ticket/GEM-001-gemini-tab-readiness`, open a PR to `main`, and verify remote SHA plus CI.
5. Never self-approve or represent author review as independent approval. Merge only if repository rules, required checks, and independent review/QA evidence satisfy the project gate. Do not release/publish the extension or perform live/paid Google operations under this GEM-001 plan.
6. Complete only the coordination claim owned by this implementation session. Handoff the PR URL, commit/hash, CI result, review status and any remaining gate.


## Tests / validation summary

- **TDD per behavior:** add a focused failing Vitest assertion; run it and observe failure; implement the minimum; rerun to pass.
- **Focused suites:** `npm test -- --reporter=dot src/content/__tests__/gemini.test.ts` and `npm test -- --reporter=dot src/sidepanel/__tests__/SidePanel.test.tsx`.
- **Full local gates:** `npm test -- --reporter=dot`, `npm run format:check`, `npm run lint`, `npm run typecheck`, `npm run build`, `npm run test:smoke`, `npm run test:extension`.
- **Project planning integrity:** `python3 tools/validate_backlog.py` from the authorized planning root should report 176 tickets and 0 problems if planning metadata is unchanged; this check is separate from extension tests and must not be used as a substitute for behavior tests.
- **Live provider test:** NOT RUN by default; no paid operation is authorized by GEM-001.
- **Git hygiene:** `git diff --check`, inspect `git diff --cached --stat`, and verify only GEM-001-owned files are staged.

## Risks, tradeoffs, and open questions

- **Blocking workspace ambiguity:** Project policy says the Big Brain folder is a planning vault and identifies a separate source repo that is currently absent; meanwhile the existing checkout contains source and uncommitted GEM-001 work. Owner must explicitly name the source workspace before implementation or build artifacts are created.
- **Blocking milestone gate:** Sprint 1 `CORE-019`/`CORE-020` review/integration remains open in local records. Confirm the live gate or obtain explicit owner authorization before starting Sprint 2 implementation.
- **Dirty work ownership:** Current Gemini modifications may already be another session's work. Reconcile ownership before changing; preserve them if uncertain.
- **Selector drift:** The single readiness selector can fail closed as Gemini changes; resilient selector discovery belongs to GEM-004, not this ticket.
- **Stale SPA route:** A tab can navigate after the response. Recheck tab identity/current URL on activation/update as the existing side-panel listener does; never display ready for a response from a different tab ID.
- **Readiness is not capability or submission:** A visible composer proves only that the expected Gemini conversation UI is present. Do not label this as image capability, account eligibility, successful submission, or a live generation.
- **No remote/live verification:** Current GitHub PR status, external approval, authenticated live-site state, and provider policy/capability are unverified in this plan. Report those as blocked or not run unless checked later with authorization.

## Definition of done

GEM-001 has an approved source workspace and milestone gate; exact-host/conversation/composer readiness is integrated into the side panel through a validated same-tab extension message; negative and privacy cases pass offline; affected project checks pass in an approved build workspace; the diff is scoped, reviewed independently, documented with evidence, and left at `review` or `done` only according to the project's approval process.
