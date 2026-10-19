# Maintenance and incident runbook

## Detect incompatibilities

- Adapter logs an explicit provider UI version signature or selector set ID.
- Unknown screen state blocks further clicks for that job and offers safe 'Review in Google' action.
- Create a bug ticket with redacted screenshot/fixture, expected vs observed controls, browser version and account capability.

## Triage severity

- **P0:** Unauthorized/duplicate credit-spending, token exposure or unsafe system access — stop affected automation immediately.
- **P1:** High failure rate with lost file or wrong model/duration — disable affected adapter/preset.
- **P2:** Non-costing UI/control error with safe workaround.
- **P3:** Cosmetic, documentation or minor accessibility issue.

## Hotfix process

1. Stop affected provider adapter via local feature flag, preserving queue/history.
2. Reproduce safely in mock before using paid test.
3. Patch centrally owned selector or capability catalog with fallback-to-stop.
4. Add regression fixture, security review and clear release notes.
5. Roll out tested extension update; reconcile stranded `needs-review` jobs manually.

## Pricing update process

- Compare official Google Flow credits help with live UI and subscription tier.
- Update dated price snapshot and model capability fixtures.
- Invalidate stale user approvals and presets if effective cost/settings changed.
- Log what changed and when; do not claim provider charge was exactly the estimate.

## Data recovery

- Export job/asset metadata first; back up browser profile securely if possible.
- Never edit browser's protected extension storage or user profile by guesswork.
- Repair migrations through reviewed script and unit tests, not manual deleting IndexedDB.
