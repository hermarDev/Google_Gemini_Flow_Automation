/**
 * AI Media Automator — Typography & Icon Standards
 * Strictly aligned with RES-014, RES-017, and CORE-010
 *
 * Rules:
 * 1. Zero external web fonts (avoids CSP violations, license costs, tracking).
 * 2. Strict system font stacks for both Sans-Serif and Monospace.
 * 3. Icon size vocabulary strictly defined (12px, 14px, 16px, 20px, 24px).
 * 4. Zero emoji-as-icon navigation: all iconography uses SVGs (Lucide) with accessible aria attributes.
 */

export const TYPOGRAPHY_STACK = {
  sans: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  mono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
} as const;

export const TYPOGRAPHY_SCALES = {
  caption: {
    className: 'text-[11px] leading-tight font-medium',
    size: '11px',
    lineHeight: '14px',
    usage: 'Badges, pill statuses, helper footnotes, timestamps',
  },
  bodySmall: {
    className: 'text-xs leading-normal',
    size: '12px',
    lineHeight: '16px',
    usage: 'Side panel labels, button text, table rows, compact forms',
  },
  body: {
    className: 'text-sm leading-normal',
    size: '14px',
    lineHeight: '20px',
    usage: 'Workspace prose, modal text, main queue item descriptions',
  },
  subheading: {
    className: 'text-base font-semibold leading-snug tracking-tight',
    size: '16px',
    lineHeight: '22px',
    usage: 'Section headers, card titles, drawer headers',
  },
  heading: {
    className: 'text-lg font-bold leading-snug tracking-tight',
    size: '18px',
    lineHeight: '24px',
    usage: 'Primary view titles (Workspace Create, Queue, Settings)',
  },
  monoCode: {
    className: 'font-mono text-xs leading-relaxed',
    size: '12px',
    lineHeight: '18px',
    usage: 'Prompt editor, job IDs, parameters, credit costs, JSON views',
  },
} as const;

export const ICON_SIZES = {
  xs: {
    px: 12,
    className: 'w-3 h-3',
    usage: 'Inline status dots, tiny table action indicators',
  },
  sm: {
    px: 14,
    className: 'w-3.5 h-3.5',
    usage: 'Buttons in side panel, input field prefixes/suffixes',
  },
  base: {
    px: 16,
    className: 'w-4 h-4',
    usage: 'Standard navigation rail, primary toolbar buttons',
  },
  md: {
    px: 20,
    className: 'w-5 h-5',
    usage: 'Section header icons, empty state accents',
  },
  lg: {
    px: 24,
    className: 'w-6 h-6',
    usage: 'Empty state illustration anchors, dialog warning emblems',
  },
} as const;

/**
 * Checks if a string contains any emoji character.
 * Used in tests and static analysis to enforce the zero-emoji navigation rule.
 */
export function containsEmoji(str: string): boolean {
  const emojiRegex = /[\p{Emoji_Presentation}\p{Extended_Pictographic}]/u;
  return emojiRegex.test(str);
}
