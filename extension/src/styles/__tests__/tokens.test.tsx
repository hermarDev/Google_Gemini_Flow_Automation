import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { tokens } from '../tokens.ts';
import { TokenSample } from '../TokenSample.tsx';

describe('Design Tokens & Spacing System (CORE-009 / RES-014)', () => {
  it('defines valid surface and text tokens with high contrast', () => {
    expect(tokens.colors.surface.background).toBe('#09090b');
    expect(tokens.colors.surface.panel).toBe('#18181b');
    expect(tokens.colors.text.primary).toBe('#f4f4f5');
    expect(tokens.colors.text.secondary).toBe('#a1a1aa');
  });

  it('enforces non-slop constraint: no purple/magenta neon primary brand colors', () => {
    const primary = tokens.colors.brand.primary.toLowerCase();
    const bg = tokens.colors.surface.background.toLowerCase();

    // Must not be purple/magenta (#8b5cf6, #d946ef, etc.)
    expect(primary).not.toMatch(/#(8b5cf6|d946ef|a855f7|c084fc)/);
    // Background must be dark neutral zinc, not dark purple (#0f0728, etc.)
    expect(bg).toBe('#09090b');
  });

  it('enforces 4px spacing scale adherence', () => {
    const spacingEntries = Object.entries(tokens.spacing);
    expect(spacingEntries.length).toBeGreaterThan(5);

    for (const [step, px] of spacingEntries) {
      const num = parseInt(px.replace('px', ''), 10);
      if (step === '0') {
        expect(num).toBe(0);
      } else {
        expect(num % 4).toBe(0);
      }
    }
  });

  it('renders TokenSample reference without crashing', () => {
    render(<TokenSample />);
    expect(screen.getByText('Design Token Reference')).toBeDefined();
    expect(screen.getByText('Surface Colors')).toBeDefined();
    expect(screen.getByText('Status & Truth-in-State Colors')).toBeDefined();
  });
});
