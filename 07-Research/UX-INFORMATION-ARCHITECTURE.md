# UX Information Architecture Specification

- **Ticket Reference:** [[RES-013-define-ux-information-architecture|RES-013]]
- **Auditor:** Hermes Agent / Lead Developer
- **Audit Date:** 2026-10-19
- **Status:** Approved / Architecture Established

---

## 1. Dual-Surface Architecture: Side Panel vs. Full-Page Workspace

To balance high-density desktop workflows with low-friction in-tab companion automation, the extension divides capabilities across two dedicated surfaces:

```text
┌────────────────────────────────────────────────────────────────────────┐
│                   AI MEDIA AUTOMATOR DUAL SURFACES                     │
├───────────────────────────────────┬────────────────────────────────────┤
│ 1. SIDE PANEL (sidepanel.html)    │ 2. WORKSPACE (workspace.html)      │
│    Width: 380px–480px fixed       │    Width: Full responsive window   │
│    Context: Active Google Tab     │    Context: Independent Management │
├───────────────────────────────────┼────────────────────────────────────┤
│ • Tab Handshake & Connection Lock │ • [Create] Multi-prompt / CSV bulk │
│ • Quick Prompt & Preset Selector  │ • [Queue] Detailed batch manager   │
│ • Live Execution Tracker          │ • [Library] High-res asset gallery │
│ • Pause / Resume / Stop Controls  │ • [History] Audit ledger & reports │
│ • Quick Credit Balance & Burn Est │ • [Settings] Presets & Diagnostics │
└───────────────────────────────────┴────────────────────────────────────┘
```

---

## 2. Information Hierarchy and View Mapping (Workspace)

The Full-Page Workspace utilizes a compact left-rail navigation bar routing cleanly between five dedicated views without nested modal hierarchies or redundant screens:

### View 1: Create (`/create`)
- **Header:** Provider Selector (`Google Flow` | `Google Gemini Chat`) + Target Tab Lock Status.
- **Composer Panel:**
  - Prompt text area supporting multiline input and batch delimiter parsing (`---` or newline).
  - Mode selector buttons: `t2v`, `i2v` (Frame Dropzone), `c2v` (Asset References), `t2i`, `i2i`.
  - Setting controls: Model dropdown, Aspect Ratio (`9:16`, `16:9`, `1:1`), Duration (`4s`, `6s`, `8s`, `10s`), Output Variations (`1–4`).
- **Batch CSV/TXT Importer:** Drag-and-drop file parser with table preview mapping columns (`Prompt`, `Negative`, `Ratio`, `Duration`).
- **Footer Authorization Bar:** Real-time credit estimator: `N prompts × V variations × Unit Price = Total Credits`. Primary action button: `Add to Queue` or `Start Now`.

### View 2: Queue (`/queue`)
- **Queue Summary Bar:** Total items, Active item, Remaining duration estimate, Aggregate credit spend, and Master Controls (`Pause All`, `Resume`, `Clear Completed`, `Cancel All`).
- **Data Table / Card List:**
  - Columns: `#`, `Mode`, `Thumbnail / Assets`, `Prompt Preview`, `Model & Ratio`, `Status Badge`, `Credit Cost`, `Actions`.
  - Strict Status Badges: `pending`, `generating`, `verifying`, `downloading`, `completed`, `needs-review`, `policy-refusal`, `failed`.
  - Inline Action Menus: Move Up, Move Down, Edit Prompt, Remove, Re-try (only if unbilled).

### View 3: Library (`/library`)
- **Filter Toolbar:** Filter by Provider (`Flow` vs `Gemini`), Media Type (`Video` vs `Image`), Aspect Ratio, Date Range, and Search by Prompt keyword.
- **Media Asset Grid:** Clean aspect-ratio matching thumbnail cards with hover metadata badges.
- **Asset Detail Drawer:** Slides out on asset click:
  - Full-resolution preview player (MP4 / PNG).
  - Metadata: Exact prompt text, model version, generation timestamp, download path, seed (if available), credit cost.
  - Quick Actions: `Open in Folder`, `Copy Prompt`, `Send to Flow Video as Reference (i2v/c2v)`.

### View 4: History (`/history`)
- **Run Audit Ledger:** Historical log of all completed and aborted batch runs.
- **Financial Accounting:** Running ledger of Google credits consumed per date/project.
- **Reporting:** Export run evidence as structured `run-report-<timestamp>.json` or CSV for creator accounting.

### View 5: Settings (`/settings`)
- **Preset Defaults:** Set preferred default video profile (e.g. `Gemini Omni Flash 720p / 10s / 9:16`).
- **Storage & Paths:** Subfolder template string (e.g. `AI-Media-Automator/{provider}/{project}/`), storage quota cleanup.
- **Developer & Diagnostics:** Mock Adapter toggle, DOM selector health status, sanitized debug log viewer.

---

## 3. Workflow Validation Tests (Three Representative Journeys)

### Workflow Test 1: Fast Single-Prompt Generation from Active Tab
- **Path:** User is on Google Flow tab -> Clicks Side Panel icon -> Types prompt -> Clicks Generate.
- **Validation:** Entire flow executes within 400px Side Panel. No workspace navigation required. Zero redundant clicks.

### Workflow Test 2: Bulk 20-Scene Script Production
- **Path:** User opens Full Workspace -> Selects `/create` -> Uploads `scenes.csv` -> Reviews 20-row table -> Confirms `20 × 15 = 300 credits` -> Clicks "Queue All" -> Workspace switches to `/queue` showing live progress bar.
- **Validation:** High-density data entry isolated to full desktop width; progress monitoring smoothly hands off between workspace and side panel.

### Workflow Test 3: Asset Chaining (Gemini Image -> Flow Video)
- **Path:** User goes to `/library` -> Selects Gemini concept image -> Clicks "Send to Flow Video" -> App navigates to `/create` with Flow pre-selected, mode set to `i2v`, and image pinned to Start Frame dropzone.
- **Validation:** Seamless pipeline handoff without downloading to desktop and manually dragging back into the browser.
