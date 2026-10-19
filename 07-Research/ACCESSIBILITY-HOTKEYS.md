# Accessibility, Focus Management & Hotkey Safety Standards

Document ID: `ACCESSIBILITY-HOTKEYS`
Associated Ticket: `CORE-018`
Standard: WCAG 2.1 AA / Section 508

---

## 1. Focus Management Principles

1. **Skip-to-Content Links:**
   - Both the Extension Side Panel and the Full-Page Workspace must provide an accessible skip link as the very first focusable element (`href="#sidepanel-main"` and `href="#workspace-main"`).
   - Styled with `.sr-only focus:not-sr-only`, ensuring visual concealment until focused via keyboard `Tab`.

2. **Modal Dialog Focus Trapping:**
   - When any dialog or modal surfaces, keyboard focus immediately moves to the first interactive child element.
   - Pressing `Tab` from the last focusable element wraps focus back to the first.
   - Pressing `Shift+Tab` from the first focusable element wraps focus to the last.
   - Pressing `Escape` invokes dismissal.
   - Upon closing or unmounting, focus automatically restores to the element that originally triggered the modal (`previousActiveElement`).

3. **Visible Focus Rings:**
   - High-contrast, non-subtle outline: `outline: 2px solid #3b82f6` with `outline-offset: 2px`.
   - Never suppress `:focus` or `:focus-visible` without a custom accessible alternative.

---

## 2. Strict Prohibition on Host Page Global Hotkey Hijacking

### Critical Rule: Zero Injection of Unscoped Keyboard Shortcuts
Content scripts running in `flow.google.com` and `gemini.google.com` are strictly **prohibited** from listening for or intercepting global hotkeys (such as `Ctrl+Enter`, `Ctrl+C`, `Cmd+K`, `Escape`, etc.) on the host page.

### Rationale:
1. Google Flow and Gemini Chat have their own native keyboard workflows (e.g. `Enter` to send message, `Shift+Enter` for multiline prompt, `Escape` to close canvas nodes).
2. Intercepting host keystrokes breaks user input flow, creates browser-level accessibility violations, and risks triggering anti-bot heuristics.
3. Extension hotkeys are valid **only** within extension-owned surfaces:
   - Within the Extension Side Panel
   - Within the Full-Page Workspace (`src/workspace/index.html`)

---

## 3. Reduced Motion Compliance

Per WCAG 2.3.3, animations and transitions must immediately collapse when `prefers-reduced-motion: reduce` is detected in the operating system:

```css
@media (prefers-reduced-motion: reduce) {
  *,
  ::before,
  ::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```
