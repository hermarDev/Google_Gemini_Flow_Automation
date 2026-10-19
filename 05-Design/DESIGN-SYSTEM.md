# Design system & UI quality gate

## Required design artifacts

- Semantic token sheet covering both themes and all statuses.
- Annotated low-fidelity wireframes at sidepanel and desktop workspace dimensions.
- Component inventory with **default / hover / focused / disabled / loading / error / success** states.
- 200% zoom and responsive overflow demonstrations.
- Text/label vocabulary and empty/error copy examples.
- Input spec for prompt editor (paste/multiline), reference image picker and media controls.

## Quality checklist

- [ ] A first-time user can identify the primary task within a glance.
- [ ] All interactive controls use plain-language labels and visible, keyboard-reachable focus.
- [ ] Ratios/durations/models are not shown as available when provider doesn't offer them.
- [ ] Error status can be understood without color or animation.
- [ ] No unnecessary dashboard widgets, AI-generated filler slogans, glows or background art.
- [ ] All color tokens pass target contrast; both light and dark modes tested.
- [ ] Media previews preserve original aspect ratio and are not stretched.
- [ ] Destructive and credit-consuming actions have direct explanation and consent.
- [ ] Long titles, 9:16 thumbnails, 16:9 clips and thousands of queue items do not break layout.

## Prototype review template

| View | Screenshot link | Visual QA | Keyboard QA | Copy QA | Reviewer |
|---|---|---|---|---|---|
| Create / image | Pending | — | — | — | — |
| Create / video | Pending | — | — | — | — |
| Queue | Pending | — | — | — | — |
| Library | Pending | — | — | — | — |
| Settings | Pending | — | — | — | — |

Do not implement a high-fidelity UI before design review of the core workflows.
