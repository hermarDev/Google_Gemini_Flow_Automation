/**
 * AI Media Automator — Semantic Design Tokens
 * Strictly aligned with RES-014 (Non-Slop Visual Design Principles)
 * Restrained dark theme, 4px grid, accessible contrast (WCAG 2.1 AA/AAA)
 */

export const tokens = {
  colors: {
    surface: {
      background: '#09090b', // zinc-950
      panel: '#18181b', // zinc-900
      subtle: '#27272a', // zinc-800
      hover: '#3f3f46', // zinc-700
    },
    text: {
      primary: '#f4f4f5', // zinc-100 (16.1:1 contrast on #09090b)
      secondary: '#a1a1aa', // zinc-400 (7.2:1 contrast on #09090b)
      muted: '#71717a', // zinc-500
      inverse: '#09090b', // zinc-950
    },
    border: {
      subtle: '#27272a', // zinc-800
      muted: '#3f3f46', // zinc-700
      focus: '#3b82f6', // blue-500
    },
    brand: {
      primary: '#2563eb', // blue-600
      primaryHover: '#1d4ed8', // blue-700
      primaryActive: '#1e40af', // blue-800
      accent: '#60a5fa', // blue-400
    },
    status: {
      idle: '#71717a', // zinc-500
      rendering: '#60a5fa', // blue-400
      success: '#10b981', // emerald-500
      warning: '#f59e0b', // amber-500
      danger: '#f43f5e', // rose-500
    },
  },
  spacing: {
    0: '0px',
    1: '4px',
    2: '8px',
    3: '12px',
    4: '16px',
    5: '20px',
    6: '24px',
    8: '32px',
    10: '40px',
    12: '48px',
    16: '64px',
  },
  typography: {
    fontSans:
      'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    fontMono:
      'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
    sizes: {
      xs: { fontSize: '11px', lineHeight: '14px' },
      sm: { fontSize: '12px', lineHeight: '16px' },
      base: { fontSize: '13px', lineHeight: '18px' },
      md: { fontSize: '14px', lineHeight: '20px' },
      lg: { fontSize: '16px', lineHeight: '24px' },
      xl: { fontSize: '20px', lineHeight: '28px' },
    },
    weights: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },
  },
  radii: {
    none: '0px',
    sm: '2px',
    base: '4px',
    md: '6px',
    lg: '8px',
    full: '9999px',
  },
  shadows: {
    none: 'none',
    subtle: '0 1px 2px 0 rgba(0, 0, 0, 0.4)',
    panel: '0 4px 6px -1px rgba(0, 0, 0, 0.5), 0 2px 4px -2px rgba(0, 0, 0, 0.5)',
  },
} as const;

export type DesignTokens = typeof tokens;
