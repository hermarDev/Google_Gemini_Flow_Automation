# AI Media Automator — Chrome MV3 Extension

A privacy-first, local-first Chrome Manifest V3 companion extension for Google Flow and Google Gemini Chat. Designed for content creators, creative directors, and automation engineers to generate, track, and curate media batches safely with deterministic fail-safe states.

---

## 1. Project Structure

```text
extension/
├── src/
│   ├── background/        # Event-driven MV3 service worker
│   ├── content/           # Isolated-world DOM adapters (Gemini & Flow)
│   ├── sidepanel/         # Compact active-tab companion UI (React)
│   ├── workspace/         # Full-page manager (Create, Queue, Library, History, Settings)
│   ├── shared/            # Typed schemas, state machines, IndexedDB store, utils
│   └── assets/            # Static icons, styles, and fixtures
├── manifest.json          # Chrome MV3 manifest specification
├── package.json           # Scripts, dependencies, and lockfile definition
├── tsconfig.json          # Strict TypeScript compiler options
└── vite.config.ts         # Multi-entry Vite bundler configuration
```

---

## 2. Development Setup

### Prerequisites
- Node.js >= 20.0.0 (tested on Node v22.x on Fedora Linux)
- npm >= 10.0.0
- Google Chrome / Chromium >= 116.0 (supporting `chrome.sidePanel`)

### Installation
```bash
cd extension
npm install
```

### Build & Test
```bash
# Typecheck
npm run typecheck

# Run automated tests
npm run test

# Production build
npm run build
```

---

## 3. Chrome Web Store & Safety Guarantees

- **Zero Credentials / Zero Cookies:** Never accesses or stores Google authentication tokens, session cookies, or user credentials.
- **Zero CAPTCHA / Bot Evasion:** Halts immediately on bot challenges, entering `needs-review`.
- **Zero Blind Retries:** Any ambiguous remote generation state halts the queue to prevent runaway credit deductions.
- **100% Clean-Room Architecture:** All code authored clean-room under the MIT license.
