# Product UX specification — not AI slop

## Visual objective

Create a purposeful professional media-production tool, closer to a compact creative workstation than an influencer AI dashboard. Inspiration: restrained typographic precision, subtle chrome, meaningful status, and predictable controls. **Do not copy another product's proprietary visual system.**

## Explicitly prohibited defaults

- Purple-to-blue giant gradients, fake glass cards on every surface, excessive shadows/glows, meaningless animated particles.
- Random emojis as navigation icons, generic AI illustrations, invented analytics/kpis, glowing robotic heads.
- Gigantic hero banners in an extension sidepanel, oversized whitespace hiding primary actions, uniform cards for dissimilar data.
- Placeholder charts with fabricated metrics or a fake estimated-progress percentage from Google rendering.
- Inconsistent capitalization, button copy like 'Unleash Creativity' instead of a clear verb, modal-on-modal flows.

## Component hierarchy

**Side panel width-conscious order:** Connection and target → Image/Video mode → model/provider → prompt or media attachment → ratio/duration/resolution/output count → item credit estimate → Generate/Queue. Advanced settings collapsed only if not safety critical. Keep 'Start' disabled until readiness is verified.

**Workspace:** Left compact navigation (Create, Queue, Library, History, Settings). Central list or gallery. Right context inspector only when an item selected. No unnecessary three-column layout on small widths.

**Queue:** Table/list rows should show content preview, provider, model, ratio, actual state, credits estimate, output status and context actions. Batch totals and cost warning stick near Start, not buried in Settings.

**Library:** Actual media thumbnails at consistent aspect fit, provider and status metadata, filters, details, open/download and 'Use as video reference'.

## Design tokens (proposed, subject to wireframe QA)

| Token | Starting choice | Rationale |
|---|---|---|
| Font | System UI stack, optional locally bundled open-license sans | Familiar, fast, low memory |
| Base body | 13–14px compact UI, zoom-responsive | Side panel density |
| Spacing | 4px base scale (4/8/12/16/24/32) | Rhythmic grouping |
| Radius | 6px inputs, 8px surfaces, 10px dialogs | Restrained, not bubbly |
| Border | Low-contrast neutral 1px | Delineation without card explosion |
| Accent | One accessible, restrained brand color | Clear action emphasis |
| Status | Color + icon + text, never color alone | Accessibility |
| Motion | 100–180ms subtle transitions where useful; prefers-reduced-motion respected | No decorative animation burden |

## Interaction behavior

- Keyboard-only: predictable tab order, visible focus, no page-level shortcuts that steal typing.
- Native browser text selection and clipboard behavior; prompt drafts persist without auto-submitting.
- Show **credits per output × output count = estimated total** near action.
- If provider UI differs from planned settings, stop and show expected vs observed instead of hiding a coercion.
- Resume/Cancel always explain whether a submitted paid job can still complete in Google.
- Errors have *what happened*, *what can be safely tried*, and *whether credits may already have been used*.
- Empty states use a one-sentence explanation plus next action, not art filler.
- Loading states identify stage rather than promising false countdowns.

## Wireframes required before UI coding

1. Gemini image creation, narrow sidepanel.
2. Flow video Create with Omni default, 10s/720p/9:16/15-credit estimate.
3. Switch to Veo where 10s becomes unavailable with clear explanation.
4. Image input attachment and image-to-video preview.
5. Queue: paused, blocked and ambiguous paid-submission rows.
6. Library image/video search and media inspector.
7. Approval dialog for batch with 2+ video outputs and total cost.
8. Signed-out account / unsupported region / provider UI changed.

Every screen must pass the checklist in [[DESIGN-SYSTEM]].
