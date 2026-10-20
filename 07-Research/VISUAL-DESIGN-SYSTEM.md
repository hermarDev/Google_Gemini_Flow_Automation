# Non-Slop Visual Design System & Principles

- **Ticket Reference:** [[RES-014-define-non-slop-visual-design-principles|RES-014]]
- **Auditor:** Hermes Agent / Lead Developer
- **Audit Date:** 2026-10-19
- **Status:** Approved / Standards Enforced

---

## 1. Visual Design Philosophy: Restrained Engineering Instrument

The AI Media Automator is designed as a precision creative workstation, not a playful marketing generator. Visual hierarchy is achieved through typographic weight and subtle value contrast rather than bright saturated accents, neon glows, or decorative graphics.

### Core Tenets
1. **Clarity Over Novelty:** Every pixel serves a functional purpose: indicating state, displaying metadata, or enabling control.
2. **Information Density with Breathing Room:** Compact 13–14px typography scaled to fit within a 380px Chrome Side Panel without horizontal scrolling.
3. **Truth in State Representation:** Never invent fake progress spinners or speculative percentages. If Google Flow is rendering asynchronously, state is accurately reported as `rendering_remote` with elapsed time, not a fake incrementing progress bar.

---

## 2. Design Tokens and Foundations

### Color Tokens (Dark Theme Default, High-Contrast Accessible)
- **Background Base:** `#09090b` (Zinc-950)
- **Surface Elevation 1:** `#18181b` (Zinc-900)
- **Surface Elevation 2:** `#27272a` (Zinc-800)
- **Borders & Dividers:** `#3f3f46` (Zinc-700, 1px solid)
- **Text Primary:** `#f4f4f5` (Zinc-100, contrast > 12:1)
- **Text Secondary / Muted:** `#a1a1aa` (Zinc-400, contrast > 4.5:1)
- **Accent Primary (Action):** `#3b82f6` (Blue-500, clean restrained blue; not neon indigo/purple)
- **Accent Hover:** `#2563eb` (Blue-600)
- **Semantic Success (`completed`):** `#10b981` (Emerald-500)
- **Semantic Warning (`needs-review`):** `#f59e0b` (Amber-500)
- **Semantic Error / Block (`policy-refusal` / `failed`):** `#ef4444` (Red-500)

### Typography
- **Font Stack:** `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif` (Zero remote Google Font network requests; zero render-blocking web fonts).
- **Size Scale:**
  - `text-xs`: 11px / 14px (Badges, timestamps, credit tags)
  - `text-sm`: 13px / 18px (Base UI, table cells, form labels)
  - `text-base`: 14px / 20px (Workspace body text, primary inputs)
  - `text-lg`: 16px / 22px (Panel headers, view titles)
  - `font-mono`: `"JetBrains Mono", "Fira Code", monospace` (Prompts, IDs, hashes)

### Spacing & Layout
- **Base Grid:** 4px rhythmic scale: `4px`, `8px`, `12px`, `16px`, `24px`, `32px`.
- **Corner Radii:**
  - Micro (`rounded-sm`): 4px for badges and chip tags.
  - Standard (`rounded`): 6px for form inputs, dropdowns, and buttons.
  - Container (`rounded-md`): 8px for modals, cards, and dropdown menus.
  - Zero pill shapes (`rounded-full`) on functional buttons.

### Motion & Transitions
- Transitions strictly limited to `opacity` and `background-color` over `100ms–150ms ease-out`.
- Zero transform animations (no bouncy spring effects, scale jumps, or 3D skews).
- Full compliance with `@media (prefers-reduced-motion: reduce)`: all transitions set to `0ms`.

---

## 3. Explicit Prohibited Anti-Patterns ("AI Slop" Blacklist)

| Prohibited Anti-Pattern | Reason for Exclusion | Approved Replacement |
|---|---|---|
| **Purple/Violet Neon Gradients** | Visual cliché; causes eye fatigue; poor contrast. | Solid neutral dark backgrounds with restrained slate/blue accents. |
| **Glassmorphism (`backdrop-blur`)** | Severe GPU memory/compositing lag inside browser extensions. | Opaque solid surface elevations (`Zinc-900` over `Zinc-950`). |
| **Decorative Emoji Icons** (e.g. 🚀, 🤖, ✨) | Inconsistent cross-OS rendering; childish aesthetic. | Clean 16px monochrome SVG icons (Lucide icon set). |
| **Fabricated Progress Bars** | Fake smoothness misleads user on remote server time. | Real phase badge + live elapsed duration timer (`00:42`). |
| **Marketing Copy Buttons** ("Ignite Imagination") | Ambiguous action consequence. | Direct imperative verbs ("Generate 10s Video", "Queue Batch"). |
| **Hidden Credit Calculation** | Can lead to accidental credit exhaustion. | Bold inline summary (`15 credits × 4 = 60 credits`) directly adjacent to CTA. |

---

## 4. Annotated Low-Fidelity Screen Checklist

### Screen A: Side Panel Companion (`sidepanel.html` - 380px)

```text
┌──────────────────────────────────────────────────────────┐
│ [● Connected: Flow / Project-42]           [⚙ Settings] │ <- Status Header
├──────────────────────────────────────────────────────────┤
│ Mode: [ Video (Omni Flash) ▼ ]  Preset: [ 9:16 / 10s ▼ ] │ <- Compact Selectors
│                                                          │
│ Prompt:                                                  │
│ ┌──────────────────────────────────────────────────────┐ │
│ │ A cinematic macro tracking shot of rain falling on   │ │ <- Monospace Input
│ │ obsidian stones at dusk, photorealistic...           │ │    (Min 3 lines)
│ └──────────────────────────────────────────────────────┘ │
│                                                          │
│ Variations: [ - ] [ 1 ] [ + ]      Cost: 15 credits/item │ <- Explicit Cost Multiplier
├──────────────────────────────────────────────────────────┤
│ Total: 15 Credits (Balance: 240)    [ + Add ] [ Run Now] │ <- Cost summary adjacent to CTA
├──────────────────────────────────────────────────────────┤
│ ACTIVE QUEUE (1/4 Running)                               │
│ [⟳ Rendering] Scene_01 (Omni Flash, 10s)         00:24s  │ <- Real Phase + Elapsed Time
│ [⏸ Pending  ] Scene_02 (Omni Flash, 10s)         --:--   │
│                                                          │
│ [ ⏸ Pause All ]                     [ ✕ Cancel Batch ]   │ <- Safety Abort Controls
└──────────────────────────────────────────────────────────┘
```

### Screen B: Pre-Run Financial Approval Modal

```text
┌──────────────────────────────────────────────────────────┐
│ CONFIRM BATCH GENERATION                                 │
├──────────────────────────────────────────────────────────┤
│ You are about to submit 8 video generation jobs to Flow. │
│                                                          │
│ Model:            Gemini Omni Flash 720p                 │
│ Duration / Ratio: 10 seconds / 9:16 Portrait             │
│ Unit Cost:        15 Google Flow Credits / output        │
│ Total Batch Cost: 120 Google Flow Credits                │
│ Account Balance:  250 Credits -> 130 Credits remaining  │
│                                                          │
│ [!] Google deducts credits upon generation dispatch.     │
│     Cancellations during render cannot refund credits.   │
├──────────────────────────────────────────────────────────┤
│ [ Cancel ]                       [ Authorize 120 Credits]│
└──────────────────────────────────────────────────────────┘
```

### UI Verification Checklist
- [x] Text contrast exceeds WCAG AA (minimum 4.5:1 for body, 3:1 for headers).
- [x] Interactive targets have minimum 32px height/width for mouse accuracy.
- [x] Form inputs maintain distinct visible outline on `:focus-visible` (`2px solid #3b82f6`).
- [x] No emoji used in functional navigation or status indicators.
- [x] Cost math ($N \times \text{Unit} = \text{Total}$) rendered directly next to action trigger.
- [x] Zero speculative gradients, floating particles, or unverified progress bars.
