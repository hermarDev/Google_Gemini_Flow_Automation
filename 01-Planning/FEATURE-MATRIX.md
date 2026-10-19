# Feature and delivery matrix

**Status key:** `Planned` means ticketed but not implemented; `Research` means user/account/UI verification still needed. The existence of a GitHub repository claiming a feature is **not our runtime verification**.

| Feature | Gemini | Flow Image | Flow Video | Delivery sprint | State |
|---|---|---|---|---|---|
| Login/session readiness | Yes | Yes | Yes | 2–4 | Planned |
| Batch prompt queue | Yes | Yes | Yes | 5 | Planned |
| Select target chat/project | Chat | Project | Project | 2–4 | Planned |
| Nano Banana Pro | Account/UI dependent | Account/UI dependent | N/A | 2–3 | Research |
| Omni Flash 360p/720p | N/A | N/A | When available | 4 | Research |
| Veo Lite/Fast/Quality | N/A | N/A | When available | 4 | Research |
| 9:16 or 16:9 | UI dependent | Supported where offered | Supported where offered | 3–4 | Research |
| 8 seconds | N/A | N/A | Omni/Veo modes where supported | 4 | Planned |
| 10 seconds | N/A | N/A | Omni supported modes; not Veo by default | 4 | Planned |
| Frame to video | N/A | Image source | Yes | 4, 6 | Planned |
| References/ingredients | Optional upload | Optional upload | Mode-specific | 3–4 | Planned |
| Auto download | Full-size image | Original image | MP4 | 2–4, 6 | Planned |
| Asset gallery/history | Yes | Yes | Yes | 6 | Planned |
| Credit confirmation | May be quota/plan-based | If priced by Flow | Mandatory preflight | 4–7 | Planned |
| Human-visible recovery | Yes | Yes | Yes | 2–5 | Planned |
| Video editing | N/A | N/A | Omni feature conditional | Research + post-MVP gate | Deferred |

## User-visible boundaries

- **Default** is a preference, not a guarantee that the active Google account exposes the model.
- **Selected model** and **actual site model** must match before `Generate` is clicked.
- **Asset downloaded** requires a completed file event, not merely a detected preview.
- **Credits spent** must never be asserted from a local estimate alone.

## Open decisions

- Confirm Gemini image-generation model identity: some Gemini UIs do not expose a literal Nano Banana Pro picker.
- Validate Flow 360p/720p and Veo model availability with the user's plan.
- Decide whether single-provider long-running tab must remain foreground-visible for permitted interactions.
- Determine whether a real live smoke test can be performed within explicitly approved credits.
