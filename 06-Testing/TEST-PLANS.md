# Test plan catalogue

| Suite | Mock required | Live permitted only after approval | Tickets |
|---|---|---|---|
| Gemini composer & full image download | Yes | Yes | GEM-004 → GEM-018 |
| Flow image models / ratios / outputs | Yes | Yes | IMG-003 → IMG-018 |
| Omni/Veo duration and costs | Yes | Yes | VID-005 → VID-022 |
| Queue lifecycle, recovery and duplicate prevention | Yes | Not required for crash injection | JOB-001 → JOB-020 |
| File paths, MIME and asset chain | Yes | Optional source asset proof | LIB-001 → LIB-018 |
| Permission, privacy and security | Yes | No paid work needed | QA-001 → QA-007 |
| Release cross-browser, a11y and perf | Yes | Controlled smoke where applicable | QA-008 → QA-024 |

Use [[TEST-STRATEGY]] for evidence standards, and place redacted screenshots/logs in `06-Testing/Evidence/` with the ticket ID in the filename.
