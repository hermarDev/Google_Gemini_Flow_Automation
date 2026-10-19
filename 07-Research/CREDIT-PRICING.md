# Google Flow Credits and Quota Rules

- **Ticket Reference:** [[RES-010-verify-google-flow-credits-and-quota-rules|RES-010]]
- **Auditor:** Hermes Agent / Lead Developer
- **Audit Date:** 2026-10-19
- **Official Documentation:** [Google Flow Credits & Pricing (Docs #16526234)](https://support.google.com/flow/answer/16526234?hl=en)
- **Status:** Verified Date-Stamped Pricing Baseline

---

## 1. Core Billing Model: Per-Output vs. Per-Prompt

A critical finding of this audit is that Google Flow deducts credits **per generated output**, NOT per submitted prompt request.
- If a user configures a prompt to produce $V$ variations (e.g. 2 or 4 outputs per prompt), Google bills $V \times \text{PricePerOutput}$.
- **Strict Invariant:** The extension must NEVER silently increment or default variations above 1 without displaying the multiplied credit total for explicit user confirmation.

### Mathematical Cost Formula
$$\text{TotalEstimatedCredits} = \sum_{i=1}^{N} \Big( \text{UnitPrice}(\text{model}_i, \text{duration}_i, \text{resolution}_i, \text{tier}) \times \text{outputs}_i \Big)$$

---

## 2. Date-Stamped Reference Pricing Schedule (As of 2026-10-19)

> **Important Notice:** The prices below reflect Google Flow's public reference as of 2026-10-19. They are **date-stamped planning baselines**, not immutable constants. Live DOM UI badges take precedence over static lookup tables.

| Model | Duration | Resolution | Credits / Generated Output (Standard / Non-Ultra) | Credits / Generated Output (Google AI Ultra Tier) | Operational Notes |
|---|---|---|---|---|---|
| **Gemini Omni Flash 1.1** | **10 seconds** | **720p** | **15 credits** | **15 credits** | **Recommended Default Baseline** |
| Gemini Omni Flash 1.1 | 8 seconds | 720p | 12 credits | 12 credits | Standard short video |
| Gemini Omni Flash 1.1 | 6 seconds | 720p | 10 credits | 10 credits | Rapid iteration |
| Gemini Omni Flash 1.1 | 4 seconds | 720p | 7 credits | 7 credits | Minimum duration |
| Gemini Omni Flash 1.1 | 10 seconds | 360p | 7 credits | 7 credits | Budget economy preset |
| Gemini Omni Flash 1.1 | 8 seconds | 360p | 6 credits | 6 credits | Budget economy preset |
| Gemini Omni Flash 1.1 | 6 seconds | 360p | 5 credits | 5 credits | Budget economy preset |
| Gemini Omni Flash 1.1 | 4 seconds | 360p | 4 credits | 4 credits | Budget economy preset |
| Veo 3.1 Lite | 4–8 seconds | 720p/1080p | 10 credits | 5 credits | 50% discount on Ultra |
| Veo 3.1 Fast | 4–8 seconds | 720p/1080p | 20 credits | 10 credits | 50% discount on Ultra |
| Veo 3.1 Quality | 8 seconds | 1080p | 100 credits | 100 credits | High-cost tier; requires warning dialog |
| Omni Flash Video Edit | Up to 10s | 720p | 40 credits | 40 credits | Transform / video-to-video |
| Nano Banana 2 Lite | Static image | Standard | 0 credits | 0 credits | Free default tier model |
| Nano Banana Pro / 2.1 | Static image | High-res | Plan quota / 0–2 credits | Plan quota | Premium image generation |

---

## 3. Plan and Regional Quota Rules

1. **Google AI Ultra Tier:**
   - Receives discounted unit pricing on Veo 3.1 Fast (10 credits) and Veo 3.1 Lite (5 credits).
   - Higher monthly allowance and priority generation queue.
2. **Standard / Non-Ultra Accounts:**
   - Standard unit pricing (Fast: 20, Lite: 10).
   - Lower monthly allotment; prone to daily/hourly rate limit throttle.
3. **Free Tier / Zero Credit Exhaustion:**
   - When credits reach 0, Google Flow blocks Generate actions for paid models with a disabled button and an "Insufficient Credits" modal.
   - Nano Banana 2 Lite remains available for zero-credit text-to-image testing.

---

## 4. Cost Authorization and Anti-Surprise Controls

To satisfy Master Plan Principle #1 ("No surprise charges"):
1. **Pre-Run Budget Summary:** Side panel calculates and renders total credits required for the entire queued batch before the user clicks "Start Batch".
2. **Balance Validation Gate:** Content script reads user's current credit balance from the Flow header DOM:
   - If $\text{AvailableCredits} < \text{EstimatedCost}$, the run is blocked with `insufficient-credits`.
3. **Intent Hash Verification:** The generate action binds to an intent token:
   $$\text{Hash}(\text{model}, \text{resolution}, \text{duration}, \text{outputsPerPrompt}, \text{unitPrice})$$
   If Google's UI has mutated or silently switched to a different model tier, execution halts immediately.
4. **Needs-Review State on Interruption:** If a paid submit was dispatched and the page refreshes, crashes, or drops connection, the extension flags the job as `needs-review` for manual reconciliation. Automated duplicate submissions are strictly barred.
