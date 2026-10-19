import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TYPOGRAPHY_STACK, ICON_SIZES, containsEmoji } from '../typography.ts';
import { WORKSPACE_NAV } from '../../workspace/WorkspaceApp.tsx';
import { TypographyReference } from '../TypographyReference.tsx';

describe('Typography & Icon Standards (CORE-010 / RES-014)', () => {
  it('uses pure system font stack without remote web font URLs', () => {
    expect(TYPOGRAPHY_STACK.sans).not.toMatch(/https?:\/\//i);
    expect(TYPOGRAPHY_STACK.mono).not.toMatch(/https?:\/\//i);
    expect(TYPOGRAPHY_STACK.sans).toContain('-apple-system');
    expect(TYPOGRAPHY_STACK.mono).toContain('ui-monospace');
  });

  it('prohibits emoji characters in navigation items and labels', () => {
    // Check all workspace navigation definitions
    for (const item of WORKSPACE_NAV) {
      expect(containsEmoji(item.label)).toBe(false);
    }

    // Direct sanity check on containsEmoji helper
    expect(containsEmoji('🎬 Queue')).toBe(true);
    expect(containsEmoji('🚀 Generate')).toBe(true);
    expect(containsEmoji('Settings')).toBe(false);
    expect(containsEmoji('Create')).toBe(false);
  });

  it('defines structured icon size vocabulary from 12px to 24px', () => {
    expect(ICON_SIZES.xs.px).toBe(12);
    expect(ICON_SIZES.sm.px).toBe(14);
    expect(ICON_SIZES.base.px).toBe(16);
    expect(ICON_SIZES.md.px).toBe(20);
    expect(ICON_SIZES.lg.px).toBe(24);

    expect(ICON_SIZES.xs.className).toBe('w-3 h-3');
    expect(ICON_SIZES.sm.className).toBe('w-3.5 h-3.5');
    expect(ICON_SIZES.base.className).toBe('w-4 h-4');
    expect(ICON_SIZES.md.className).toBe('w-5 h-5');
    expect(ICON_SIZES.lg.className).toBe('w-6 h-6');
  });

  it('renders TypographyReference component without crashing', () => {
    render(<TypographyReference />);
    expect(screen.getByText('Typography & Icon Standards')).toBeDefined();
    expect(screen.getByText(/accessible system font stack/i)).toBeDefined();
    expect(screen.getByText(/zero emoji/i)).toBeDefined();
  });
});
