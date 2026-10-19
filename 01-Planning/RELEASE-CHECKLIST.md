# Release gates and packaging

## Security and legality

- [ ] No token interception, CAPTCHA solver, private API bridge or anti-detection evasion feature.
- [ ] All used upstream code has confirmed license and attribution at exact commit.
- [ ] MV3 least-permission manifest reviewed and CSP tested.
- [ ] No network analytics or remote scripts by default; privacy documentation completed.
- [ ] No unreviewed critical dependency vulnerabilities.

## User workflows and safety

- [ ] Gemini and Flow image flows pass fixture tests and permitted manual smoke.
- [ ] Omni Flash default and alternate Veo selection are accurately documented.
- [ ] 9:16/16:9 and 8s/10s supported/unsupported combinations covered.
- [ ] Actual selected model/resolution/duration/output count rechecked before cost-bearing submit.
- [ ] Download records indicate complete only after actual completed media.
- [ ] Queue does not silently resubmit uncertain paid attempts across reload/crash.
- [ ] User can stop future queue work and understand already-submitted generation semantics.
- [ ] Credit estimates are dated and validated against active UI.

## Product polish

- [ ] Wireframes reviewed and anti-slop style checklist passed.
- [ ] Both themes, keyboard navigation, 200% zoom and screen reader sampled.
- [ ] All empty/error/blocked states are actionable and clear.
- [ ] New user install/troubleshoot docs validated.

## Release engineering

- [ ] Clean build from lockfile; stable output hash and ZIP.
- [ ] QA screenshots and test results linked from relevant tickets.
- [ ] Privacy, attribution, changelog, browser requirements and known limitations published.
- [ ] No unresolved critical bugs or known dangerous permissions.
- [ ] Owner approves release/no-go and release version.

**A mock-only test is not equivalent to a verified live Google Flow account capability.** Explicitly label account-dependent skipped checks.
