# MVP Release Boundary and Explicit Non-Goals

- **Ticket Reference:** [[RES-012-define-non-goals-and-mvp-release-boundary|RES-012]]
- **Auditor:** Hermes Agent / Lead Developer
- **Audit Date:** 2026-10-19
- **Status:** Approved / Boundary Enforced

---

## 1. Executive Product Boundary

To deliver a reliable, secure, and maintainable product without speculative bloat, the scope of the **AI Media Automator** is bounded strictly to an in-browser creator productivity tool. The boundary separates core in-scope MVP deliverables from deferred post-MVP enhancements and permanently excluded anti-patterns.

---

## 2. In-Scope MVP Deliverables (Sprints 1–8)

1. **Extension Architecture:**
   - Manifest V3 compliant Chrome extension.
   - Dual interface: Side Panel (`sidePanel` API) for active queue monitoring + Full-Page Workspace (`workspace.html`) for bulk prompt editing and media library management.
2. **Provider Adapters:**
   - **Gemini Chat Adapter:** Scoped strictly to verified conversation URLs (`/app/<id>`), Quill composer injection, history-settle gate, high-res image detection, and native download trigger.
   - **Google Flow Adapter:** Scoped to active project canvas (`/project/<id>`), multi-mode inputs (`t2v`, `i2v`, `c2v`, `t2i`), aspect ratios (`16:9`, `9:16`), durations (`4s`, `6s`, `8s`, `10s`), and verified downloads.
3. **Model Presets & Validation:**
   - Default: **Gemini Omni Flash 720p / 10s / 9:16** (15 credits/output baseline).
   - Selectable: Veo 3.1 Lite, Fast, Quality (with strict 8s duration limits).
   - Image models: Nano Banana Pro, 2 Lite, 2.1.
4. **Queue Management & Persistence:**
   - Client-side IndexedDB persistent queue surviving service-worker sleep and browser restarts.
   - Transactional state transitions: `pending -> generating -> verifying -> downloaded` or `needs-review` / `policy-refusal`.
5. **Cost Safety & Verification:**
   - Pre-flight budget calculation and credit balance verification.
   - Intent hash verification prior to Generate click.
   - Zero blind retries on paid failures.
6. **Download Lifecycle & Library:**
   - Monitored `chrome.downloads.onChanged` tracking to terminal completion.
   - Structured subfolder organization (`Downloads/AI-Media-Automator/<Provider>/<Project>/`).
   - Local asset metadata and provenance tagging.

---

## 3. Deferred Post-MVP Features (Phase 2+)

| Feature | Scope Description | Exclusion Rationale | Target Milestone |
|---|---|---|---|
| **Video-to-Video Editing** | Automated chaining of Omni Flash video edits (40 credits/op). | Complex canvas interactions and high credit cost; requires mature video generation baseline first. | Sprint 9+ / Phase 2 |
| **Native Host Helper Application** | Local native binary for arbitrary filesystem saving outside Downloads. | Requires native messaging host installer; Chrome Downloads API satisfies MVP needs. | Phase 2 |
| **Cross-Device Cloud Sync** | Syncing prompt templates and presets across browser instances. | Violates local-first zero-backend security posture for MVP. | Phase 3 |
| **Direct Social Media Publishing** | Auto-uploading generated videos to YouTube Shorts or TikTok. | Out of scope for core media creation; third-party OAuth complexity. | Phase 3 |

---

## 4. Permanently Excluded Non-Goals (DO-NOT-BUILD)

The following capabilities are permanently excluded from this project due to policy violations, security vulnerabilities, or account ban risks:

1. **No Token or Session Interception:** Never capture, export, or reuse Google session cookies, OAuth Bearer tokens, or internal BFF credentials.
2. **No CAPTCHA / Challenge Solving:** Never automate or bypass `grecaptcha`, Cloudflare, or Google bot detection screens.
3. **No Private Internal API Reverse Engineering:** All automation must operate exclusively through standard DOM events on user-visible, authenticated web pages.
4. **No Chrome Debugger (`CDP`) Attachment:** The extension will never declare `debugger` permission or use CDP to simulate synthetic low-level clicks.
5. **No Multi-Account Concurrency:** The extension will not attempt to drive multiple Google accounts concurrently across browser profiles due to severe authentication collision and detection risks.
6. **No Silent Model Substitution:** The extension will never silently fall back to higher-cost models or lower-cost variants without explicit user confirmation.
