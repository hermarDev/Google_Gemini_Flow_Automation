# Ticket-to-Code Traceability Convention

- **Ticket Reference:** [[CORE-006-create-obsidian-ticket-to-code-traceability-convention|CORE-006]]
- **Auditor / Lead Developer:** Hermes Agent
- **Date:** 2026-10-19
- **Status:** Approved / Convention Enforced

---

## 1. Branch Naming Standard

Every feature, fix, research, or infrastructure task must operate on its own dedicated git branch branched from `main`:

```text
ticket/<TICKET-ID>-<short-descriptive-slug>
```

### Valid Examples
- `ticket/RES-018-sprint-0-exit-gate`
- `ticket/CORE-001-initialize-source-repo`
- `ticket/CORE-006-traceability-convention`

### Prohibited Patterns
- `main` (never commit directly to `main`)
- `feature/something` (missing ticket ID)
- `dev` or `test-branch` (untargeted)

---

## 2. Commit Message Convention

All commits must follow the Conventional Commits specification with the mandatory ticket ID enclosed in scope:

```text
<type>(<TICKET-ID>): <imperative summary in lowercase>
```

### Allowed Types
- `feat`: New feature or user-facing capability.
- `fix`: Bug fix or defect resolution.
- `docs`: Documentation, research finding, or Agile ticket updates.
- `test`: Unit, integration, or fixture tests.
- `ci`: GitHub Actions workflows or automation pipeline.
- `refactor`: Internal code restructuring without behavioral change.

### Valid Examples
- `docs(RES-018): approve Sprint 0 exit gate and development backlog`
- `feat(CORE-001): initialize isolated extension workspace and contracts`
- `ci(CORE-005): implement GitHub Actions CI quality gates for PRs`

---

## 3. Pull Request Protocol

1. **Title:** Must mirror the primary commit title: `<type>(<TICKET-ID>): <summary>`.
2. **Template:** Must use `.github/PULL_REQUEST_TEMPLATE.md` containing:
   - Ticket reference and sprint/epic context.
   - Acceptance criteria checklist.
   - Exact test commands run and terminal output evidence.
   - Security and secret clearance sign-off.
3. **No Self-Merge / No Force-Push:** Feature branches are pushed to GitHub, PR opened against `main`, and left for peer/owner review. The lead developer never self-approves or force-pushes.

---

## 4. Obsidian Ticket Lifecycle & Backlinks

Every ticket in `04-Tickets/` adheres to the following transition lifecycle:

1. **Activation:**
   - Update frontmatter: `status: in-progress`, `assignee: <agent-id>`.
   - Update `03-Sprints/<Sprint-XX>/<Sprint-XX>.md` to `in-progress`.
2. **Execution & Evidence:**
   - Check off completed acceptance criteria items `[x]`.
   - Append row to `## Work log` with date, actor, concrete summary, and markdown link to produced artifact or test.
3. **Closure:**
   - Update frontmatter: `status: done`, `updated: <YYYY-MM-DD>`.
   - Fill `## Closure` block with files changed, test results, PR link, reviewer name, and follow-ups.
   - Update sprint checklist in `03-Sprints/<Sprint-XX>/<Sprint-XX>.md`.
   - Run `python3 tools/validate_backlog.py` to ensure zero broken links or schema violations.

---

## 5. Secret Protection & Vault Isolation

- Never commit `.env`, private keys, passwords, or personal credentials.
- All references in tickets to local paths must be relative or sanitized.
- All tokens/cookies in test fixtures must use synthetic mocks (`mock-token`, `[REDACTED]`).
