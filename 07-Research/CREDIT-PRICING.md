# Google Flow credits (official public reference, 2026-10-19)

Source: https://support.google.com/flow/answer/16526234?hl=en (computer). **Public list can change at any time; actual Google UI is the authoritative last check before a credit-spending action.** Google says prices are **per generated output**, and one request can produce multiple outputs.

| Model | Duration | Credits / generated output | Notes |
|---|---|---|---|
| **Gemini Omni Flash 720p** | **10 seconds** | **15** | **Preferred default** |
| Gemini Omni Flash 720p | 8 seconds | 12 | Shorter alternative |
| Gemini Omni Flash 720p | 6 seconds | 10 | — |
| Gemini Omni Flash 720p | 4 seconds | 7 | — |
| Gemini Omni Flash 360p | 10 seconds | 7 | Budget alternative |
| Gemini Omni Flash 360p | 8 seconds | 6 | Budget alternative |
| Gemini Omni Flash 360p | 6 seconds | 5 | — |
| Gemini Omni Flash 360p | 4 seconds | 4 | — |
| Veo 3.1 Lite | 4/6/8 seconds | 10 non-Ultra / 5 Ultra | Plan dependent |
| Veo 3.1 Fast | 4/6/8 seconds | 20 non-Ultra / 10 Ultra | Plan dependent |
| Veo 3.1 Quality | 8 seconds | 100 | Live UI compatibility check required |
| Gemini Omni Flash video edits | Eligible edit | 40 | Different operation; not ordinary generation |

**Note:** Official help also describes lower-priority Veo Lite access for some Ultra plan configurations; avoid assuming a universally available price/model variant. Subscription and regional restrictions are not determined by this plan.

## Cost estimation

`estimatedCredits = currentConfirmedPricePerGeneratedOutput × requestedOutputs`

If 3 videos use Omni Flash 720p at 10 seconds: `15 × 3 = 45` estimated credits. If a request creates 2 outputs when user expected 1, Google says cost is per generation, so **never silently increase output count**.

## Cost authorization contract

- Use actual available model/resolution/duration/count from Flow page, not only our selected UI state.
- Date-stamp the price catalog and show `estimate` rather than `charged` in the library.
- Show unknown/stale cost visibly; require explicit consent or prohibit multi-output batch until confirmed.
- Bind user approval to a hash of provider, project, model, mode, ratio, resolution, duration, output count and estimated total.
- On drift, expire approval and require the user to review again.
- On uncertain paid submission, do not retry automatically. User reviews Google creations/history/credit activity before deciding.
- Do not claim the extension knows the authoritative Google credit balance unless provided through an allowed, reliable visible UI integration.

## Reference links

- [Google Flow credits](https://support.google.com/flow/answer/16526234?hl=en)
- [Flow features](https://support.google.com/flow/answer/16352836?hl=en-PH)
