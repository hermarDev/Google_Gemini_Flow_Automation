# Provider model compatibility (initial official reference, 2026-10-19)

> Source: [Google Flow supported models](https://support.google.com/flow/answer/16352836?hl=en-PH). Models change, vary by plan/region and are not guaranteed present in a specific user's UI. `Verified official docs` is distinct from `verified in user's account` (currently **not verified**).

## Video generation

| Model | Resolution | Lengths | Ratios | Text to video | First-frame | Last-frame | Ingredients/references | Notes |
|---|---|---|---|---|---|---|---|---|
| Gemini Omni Flash 1.1 | 720p or draft 360p | 4, 6, 8, 10s | 9:16 / 16:9 | Yes | Yes | Yes | Yes | Cheapest configured default depends on resolution; 10s is specifically supported |
| Veo 3.1 Lite | As website offers | 4, 6, 8s | 9:16 / 16:9 | Yes | Yes | Yes | 8s only | Extend supported in certain combinations |
| Veo 3.1 Fast | As website offers | 4, 6, 8s | 9:16 / 16:9 | Yes | Yes | Yes | 8s only | No extend in current docs |
| Veo 3.1 Quality | As website offers | 4, 6, 8s in text/frame modes | 9:16 / 16:9 | Yes | Yes | Yes | Not supported | Credit page lists 8s Quality; verify actual UI |

**Video editing:** Omni Flash lists video-to-video editing up to 10 seconds, cost separately specified. V1 inclusion is a decision gate, not an accepted MVP promise.

## Image generation

| Provider | Model | Default inference | Verification needed |
|---|---|---|---|
| Google Flow | Nano Banana Pro | Default for Google AI Ultra, according to docs | Confirm selectable and supported ratio for active account |
| Google Flow | Nano Banana 2 Lite | Docs describe as default no-charge model | Confirm account/region and current UI name |
| Google Flow | Nano Banana 2.1 | Standard image model documented | Confirm UI label and access |
| Gemini Chat | Image generation via its accessible UI | Model picker and exact underlying name may not be visible | Never claim Nano Banana Pro is selected unless UI verifies it |

## Validation algorithm

1. Read current account-visible model labels and site-provided available settings, without reading auth tokens.
2. Check desired model/mode/ratio/duration/resolution/variation tuple against current capability matrix.
3. Apply controls through visible UI.
4. Read back actual selection immediately before submission.
5. Block and explain mismatch, unavailable model, plan constraint or unknown cost; no silent fallback.
6. Record a dated sanitized capability snapshot for debugging.

## Follow-up

[[RES-009]] maintains the capability matrix. [[VID-005]] implements a typed validation module. [[QA-009]] tests invalid combinations, especially Veo at 10 seconds and cross-resolution cost drift.
