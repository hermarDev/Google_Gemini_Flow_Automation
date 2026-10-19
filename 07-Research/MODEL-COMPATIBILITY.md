# Provider Model Capability Matrix

- **Ticket Reference:** [[RES-009-verify-current-model-capability-matrix|RES-009]]
- **Auditor:** Hermes Agent / Lead Developer
- **Audit Date:** 2026-10-19
- **Official Source Reference:** [Google Flow Supported Models (Docs #16352836)](https://support.google.com/flow/answer/16352836?hl=en-PH)
- **Account Verification Status:** Documented official capabilities verified; individual account-level entitlement requires runtime capability probing.

---

## 1. Video Generation Capability Matrix

| Model Identifier | Official Name | Supported Resolutions | Supported Durations | Supported Aspect Ratios | Text-to-Video (t2v) | First-Frame (i2v) | Last-Frame (i2v) | Ingredients / References (c2v) | Video Extend | Cost Profile (Per Output) |
|---|---|---|---|---|---|---|---|---|---|---|
| `omni-flash-1.1` | **Gemini Omni Flash 1.1** | 720p (default), 360p (draft if offered) | 4s, 6s, 8s, **10s** | 16:9, 9:16 | **Yes** | **Yes** | **Yes** | **Yes** | Yes (up to 10s) | **15 credits** (720p/10s proposed baseline) |
| `veo-3.1-lite` | **Veo 3.1 Lite** | 720p, 1080p | 4s, 6s, 8s | 16:9, 9:16 | **Yes** | **Yes** | **Yes** | **Yes (8s only)** | Yes (select combinations) | ~20–30 credits |
| `veo-3.1-fast` | **Veo 3.1 Fast** | 720p, 1080p | 4s, 6s, 8s | 16:9, 9:16 | **Yes** | **Yes** | **Yes** | **Yes (8s only)** | **No** (Not in docs) | ~30–40 credits |
| `veo-3.1-quality`| **Veo 3.1 Quality** | 1080p | 4s, 6s, 8s | 16:9, 9:16 | **Yes** | **Yes** | **Yes** | **No** (Unsupported) | Optional | ~50+ credits (Highest tier) |

---

## 2. Image Generation Capability Matrix

| Provider Platform | Model Identifier | Accessible UI Label | Output Geometry | Default Inference / Tier | Verified Capabilities & Constraints |
|---|---|---|---|---|---|
| **Google Flow** | `nano-banana-pro` | Nano Banana Pro | 1:1, 16:9, 9:16 | Google AI Ultra Tier default | Multi-resolution, high fidelity, costed in credits if above quota |
| **Google Flow** | `nano-banana-2-lite`| Nano Banana 2 Lite | 1:1, 16:9, 9:16 | Default no-charge model | Fast iteration, standard resolution, zero credit deduction |
| **Google Flow** | `nano-banana-2.1` | Nano Banana 2.1 | 1:1, 16:9, 9:16 | Standard image model | Documented standard model for general creation |
| **Gemini Chat** | `gemini-chat-image` | Gemini Native Image Gen | 1:1 native (Prompt guided for 9:16 / 16:9) | Standard Gemini web interface | Model picker is abstracted in web UI. 1024x1024 native PNG/JPEG download. |

---

## 3. Explicit Unsupported Combinations (Prohibited at UI & Pre-Flight)

To prevent wasted API calls, unexpected credit burn, and provider errors, the extension must actively reject and disable the following combinations:

| Prohibited Parameter Combination | Reason & Provider Constraint | Extension Action |
|---|---|---|
| **Veo 3.1 (any tier) + 10-Second Duration** | Veo models are strictly capped at 8 seconds maximum. | Disable `10s` duration button whenever Veo is selected. |
| **Veo 3.1 Quality + Ingredients Mode (`c2v`)** | Quality tier does not support ingredient multi-asset conditioning. | Disable `Ingredients` tab when Veo 3.1 Quality is active. |
| **Veo 3.1 Fast + Video Extend** | Google Flow documentation explicitly excludes extend from Fast tier. | Disable `Extend` toggle when Veo 3.1 Fast is chosen. |
| **Veo 3.1 + 360p Resolution** | Draft 360p is exclusive to Gemini Omni Flash. | Lock resolution to 720p/1080p when Veo is active. |
| **Gemini Chat + Native Aspect Ratio Dropdown** | Gemini Chat web UI does not offer a physical aspect ratio selector. | Guide ratio via prompt suffix injection (e.g. `", 9:16 aspect ratio"`). |
| **Gemini Chat + Video Generation** | Gemini web chat currently generates static images only. | Video mode selectors disabled for Gemini provider adapter. |

---

## 4. Runtime Capability Validation Algorithm

Before any prompt is submitted to Google Flow or Gemini:
1. **Probe Active UI Options:** Content script inspects the rendered dropdowns, radio groups, and modal buttons to enumerate genuinely available models and settings for the user's specific account.
2. **Compare Against Matrix:** Extension verifies that requested `(model, mode, duration, ratio, resolution)` exists in the active UI and is not a prohibited combination.
3. **Budget Pre-Flight Check:** Read displayed credit cost; verify that current account credit balance $\ge$ required cost.
4. **Pre-Click Re-read:** Immediately prior to dispatching the `Generate` click, re-read the active DOM state to guarantee Google's UI didn't silently fall back to a higher-priced model (e.g. from Omni Flash to Veo Quality).
5. **Abort on Uncertainty:** If any setting does not match user intent, abort execution and transition state to `needs-review`.
