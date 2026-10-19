# Product requirements specification

## Core user stories

| Code | User need | Expected outcome | Tracked in |
|---|---|---|---|
| PRD-01 | Generate an image through Gemini without repetitive UI work | Select chat, submit exact prompt once, detect full-size image and download | [[EPIC-003]] |
| PRD-02 | Generate/edit an image through Flow | Choose project, permitted Nano Banana model, ratio, count and references; download | [[EPIC-004]] |
| PRD-03 | Generate an affordable portrait video | Default Omni Flash 720p 10s 9:16; confirm 15 credits/output when valid | [[EPIC-005]] |
| PRD-04 | Choose an alternate video engine | Veo optional; supported durations and costs visibly update | [[EPIC-005]] |
| PRD-05 | Create landscape content | Select 16:9 for image/video when model supports it | [[EPIC-004]], [[EPIC-005]] |
| PRD-06 | Manage multiple prompts | Import/prompts queue, pause future work, recover safely | [[EPIC-006]] |
| PRD-07 | Retrieve all finished media | Verified downloads, named files, local media library/history | [[EPIC-007]] |
| PRD-08 | Turn image into motion | Select a downloaded Gemini/Flow image as Flow video reference | [[EPIC-007]] |
| PRD-09 | Limit credits | Display estimated total, require approval and stop on cap | [[EPIC-008]] |
| PRD-10 | Know what happened | Accurate states, diagnostic logs, downloads and errors | [[EPIC-006]], [[EPIC-009]] |

## Functional constraints

**Provider/authentication:** User opens and signs in to Google sites themselves. The extension only sees explicitly approved origins. Detect sign-out and switched chat/project. Never ask for or store Google passwords. Support one active submission per controlled provider tab.

**Image:** Prompt text, optional supported image reference, visible model selection, supported aspect ratios and output count. Discover original/full-size downloads; handle multiple results and old media tiles.

**Video:** Configure model, generation mode, 4/6/8/10s where supported, 9:16/16:9, resolution, variations, references. Reconfirm provider UI and cost before generating. Favor Omni Flash; make Veo an explicit selection, not silent fallback.

**Queue:** Draft/ready/preflight/submitted/generating/downloading/completed/error/review. A queued item can be removed without cost. An already submitted item may continue spending credits even after the extension is paused.

**Downloads:** Chrome's Download API accepts a **relative path under Downloads**. No arbitrary absolute Fedora path by default. Show user folder preview, collision strategy and actual download completion state.

**Storage:** Local-only configuration/job metadata by default. Persist schema versions, typed errors and reconciliation markers. Do not dump full sensitive chat content into diagnostics. User can export/wipe app metadata with confirmation.

**Visual requirements:** No dashboard decoration without a useful function. Dense but readable layout, clear control grouping, deliberate typography, light/dark, accessible errors, keyboard navigation and responsive panels.

## Nonfunctional acceptance

- **Reliability:** No silent paid retries on uncertain submission; status recovery on browser/worker lifecycle interruptions.
- **Security:** Least privilege, no remote code execution or third-party auth extraction, validate messaging, sanitize filenames and exported logs.
- **Maintainability:** All site selectors centralized in provider adapters; fixtures and version-aware failure stops.
- **Performance:** Fast startup, smooth sidepanel, bounded memory when many jobs/assets; measure rather than assume targets.
- **Privacy:** No required backend or external analytics. One user-controlled local browser profile.
- **Compatibility:** Chromium MV3 browsers documented/tested; Firefox not a V1 guarantee.
- **Access limits:** Respect provider plans, rate limits, quotas and content policy; never attempt bypass.

## Edge-case catalogue

1. Already signed out when extension starts.
2. Wrong tab, project, or Gemini conversation selected.
3. Model option disappears after provider UI update.
4. 10-second duration selected while Veo is active.
5. Gemini Nano Banana mode not available to that user.
6. An API/UI refuses reference upload, or reference is too large.
7. Provider charges/accepts request, but tab closes before acknowledgement.
8. A successful asset appears in provider UI but download fails.
9. Browser download returns HTML/login page instead of media.
10. A prompt requests 4 outputs instead of 1, multiplying credits.
11. Different account/subscription changes pricing mid-session.
12. User runs two extension windows controlling the same site tab.
13. Chrome suspends the extension worker while video renders.
14. Stale URL or file is deleted after library metadata exists.
15. Quota/content policy denies generation; retries must stop.
16. Service-worker update/data migration during queue activity.

See individual ticket acceptance criteria for detailed test coverage.
