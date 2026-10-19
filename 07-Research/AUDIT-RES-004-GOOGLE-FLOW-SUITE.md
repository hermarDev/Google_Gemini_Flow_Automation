# Upstream Audit: Google Flow Suite / gflow-cli (omid-io)

- **Ticket Reference:** [[RES-004-audit-google-flow-suite-repository|RES-004]]
- **Repository:** `https://github.com/omid-io/gflow-cli` (referenced as `google-flow-suite` in planning documents)
- **Inspected Commit SHA:** `cb6d5019babf0cb89886a1f3ca265b40e44cd72b` (Release v0.83.0, Date: 2026-10-07)
- **Auditor:** Hermes Agent / Lead Developer
- **Audit Date:** 2026-10-19

---

## 1. Architectural Model and Technical Capabilities

Unlike the pure Chrome extensions, `omid-io/gflow-cli` is a Python CLI, MCP server, and automated orchestration engine designed to control Google Flow.
- **Core Engine:** Uses Playwright and `patchright` (an anti-detection patched fork of Playwright) managing persistent browser contexts.
- **Private REST Client (`FlowApiClient`):** Directly invokes Google's internal private backend APIs (e.g. `aisandbox-pa.googleapis.com` / labs BFF).
- **Type Definitions & DTOs:** Strongly typed Python dataclasses defining projects, assets, generation parameters, camera motions, and credits.

---

## 2. Unsafe Patterns and Explicit Do-Not-Copy Prohibitions

In accordance with `AGENTS.md` and `MASTER-PLAN.md`, the following mechanisms found in `omid-io/gflow-cli` are **strictly prohibited and placed on our DO-NOT-COPY list**:

1. **Main-World `grecaptcha` Minting:**
   - Forces execution into Chrome's main-world JavaScript context (`isolated_context=False`) to call `grecaptcha.enterprise.execute` and mint synthetic CAPTCHA tokens.
   - *Status:* **REJECTED.** Violates Google terms of service and our security baseline.
2. **Bearer Token and Cookie Interception:**
   - Intercepts OAuth2 Bearer tokens from the internal web SPA session endpoint and extracts raw browser profile session cookies.
   - *Status:* **REJECTED.** Violates our zero-credential-harvesting and zero-token-interception principles.
3. **Private Internal REST Reverse-Engineering:**
   - Bypasses the official user interface by hitting undocumented Google internal endpoints directly.
   - *Status:* **REJECTED.** Such private endpoints are unstable, risk account flags, and bypass user visibility.
4. **Anti-Detection Patching (`patchright`):**
   - Implements browser evasion flags and patches to evade bot detection.
   - *Status:* **REJECTED.**

---

## 3. Reusable Conceptual Innovations and Patterns

While the execution engine is rejected, `omid-io/gflow-cli` contains high-quality architectural concepts suitable for clean-room adaptation in TypeScript:

1. **Strict Typed Domain Modeling:**
   - Modeled domain types for Video Generation (`t2v`, `i2v`, `c2v`), aspect ratios (`16:9`, `9:16`, `1:1`), durations (5s, 8s, 10s), resolutions (360p, 720p, 1080p), and model families (Omni Flash vs Veo).
2. **Media Asset Catalog Schema:**
   - Clear distinction between source reference ingredients, project canvas, and generated outputs with metadata.
3. **Comprehensive Testing Discipline:**
   - Modular unit and fixture test suites with network mocking (`respx`) and schema validation.

---

## 4. Alternative Supported Chrome Extension Patterns

Instead of token harvesting and private REST bridges, AI Media Automator implements:
- **Direct User-Visible Automation:** Content scripts run in the authenticated tab already opened by the user.
- **Natural DOM Events:** Interactions occur via standard DOM events (`click`, `input`, `change`) without CDP debugger hijacking or CAPTCHA tampering.
- **Transparent User Feedback:** No background stealth; the user sees actions taking place in their active session.
- **Safe State Fallback:** Any ambiguous submission results in a `needs-review` state rather than automated secret recovery or blind replay.

---

## 5. Licensing and Intellectual Property Audit

- **License:** Official `LICENSE` file present at root: **MIT License**, Copyright 2026 Flavio Oliva / omid-io.
- **Code Clearance:** Legally MIT-licensed, but because its implementation relies on prohibited private API reverse engineering and CAPTCHA minting, **zero source code will be copied**. Reusable concepts (typed DTO schemas, test strategies) will be implemented as clean-room TypeScript in the extension.

---

## 6. Comparative Matrix: Reusable Concepts vs. Rejected Patterns

| Component / Technique | Upstream Pattern (gflow-cli) | AI Media Automator Policy | Decision |
|---|---|---|---|
| **API Transport** | Private reverse-engineered Google REST endpoints | Standard in-tab DOM interactions | **Strictly Reject Private API** |
| **Auth / Session** | Profile cookie theft & Bearer token extraction | User-authenticated tab session, zero token access | **Strictly Reject Interception** |
| **CAPTCHA** | Automated `grecaptcha.enterprise` minting | No CAPTCHA bypass or minting | **Strictly Reject Evasion** |
| **Domain DTOs** | Strongly typed dataclasses for media/models | Strongly typed TypeScript interfaces & Zod schemas | **Clean-room Adaptation** |
| **Asset Catalog** | Media asset catalog & metadata store | Extension IndexedDB Media Library | **Adopt Architecture** |
| **Test Fixtures** | Offline mock fixtures and contract tests | Offline DOM & payload test fixtures | **Adopt Architecture** |
| **License** | Formal MIT License | Clean-room implementation under project MIT | **Adopt Concepts Only** |
