import React from 'react';
import { Activity, AlertCircle, CheckCircle2, FolderOpen, Play, Settings } from 'lucide-react';
import { TYPOGRAPHY_SCALES, ICON_SIZES } from './typography.ts';

export const TypographyReference: React.FC = () => {
  return (
    <div className="p-6 bg-surface-background text-primary-text space-y-6 max-w-4xl font-sans">
      <header className="border-b border-border-subtle pb-4">
        <h1 className="text-xl font-bold tracking-tight">Typography & Icon Standards</h1>
        <p className="text-secondary-text text-sm mt-1">
          Accessible system font stack, strict scale hierarchy, and SVG icon vocabulary (CORE-010).
        </p>
      </header>

      {/* Typography Hierarchy */}
      <section className="space-y-3">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-secondary-text">
          Type Hierarchy
        </h2>
        <div className="border border-border-subtle rounded divide-y divide-border-subtle bg-surface-panel">
          {Object.entries(TYPOGRAPHY_SCALES).map(([name, scale]) => (
            <div key={name} className="p-3 flex items-start justify-between gap-4">
              <div className="w-48 shrink-0">
                <span className="text-xs font-mono text-brand-accent block">{name}</span>
                <span className="text-[11px] text-secondary-text">
                  {scale.size} / {scale.lineHeight}
                </span>
              </div>
              <div className="flex-1">
                <p className={scale.className}>The quick brown fox jumps over the lazy dog.</p>
                <p className="text-[11px] text-muted-text mt-1">{scale.usage}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Icon Vocabulary */}
      <section className="space-y-3">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-secondary-text">
          Icon Size Vocabulary (SVG only, zero emoji)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          <div className="border border-border-subtle rounded p-3 bg-surface-panel flex flex-col items-center text-center">
            <Activity
              className={`${ICON_SIZES.xs.className} text-status-rendering mb-2`}
              aria-hidden="true"
            />
            <span className="text-xs font-mono font-medium">xs ({ICON_SIZES.xs.px}px)</span>
            <span className="text-[10px] text-secondary-text mt-1">{ICON_SIZES.xs.usage}</span>
          </div>

          <div className="border border-border-subtle rounded p-3 bg-surface-panel flex flex-col items-center text-center">
            <Play
              className={`${ICON_SIZES.sm.className} text-brand-accent mb-2`}
              aria-hidden="true"
            />
            <span className="text-xs font-mono font-medium">sm ({ICON_SIZES.sm.px}px)</span>
            <span className="text-[10px] text-secondary-text mt-1">{ICON_SIZES.sm.usage}</span>
          </div>

          <div className="border border-border-subtle rounded p-3 bg-surface-panel flex flex-col items-center text-center">
            <Settings
              className={`${ICON_SIZES.base.className} text-primary-text mb-2`}
              aria-hidden="true"
            />
            <span className="text-xs font-mono font-medium">base ({ICON_SIZES.base.px}px)</span>
            <span className="text-[10px] text-secondary-text mt-1">{ICON_SIZES.base.usage}</span>
          </div>

          <div className="border border-border-subtle rounded p-3 bg-surface-panel flex flex-col items-center text-center">
            <FolderOpen
              className={`${ICON_SIZES.md.className} text-brand-primary mb-2`}
              aria-hidden="true"
            />
            <span className="text-xs font-mono font-medium">md ({ICON_SIZES.md.px}px)</span>
            <span className="text-[10px] text-secondary-text mt-1">{ICON_SIZES.md.usage}</span>
          </div>

          <div className="border border-border-subtle rounded p-3 bg-surface-panel flex flex-col items-center text-center">
            <AlertCircle
              className={`${ICON_SIZES.lg.className} text-status-warning mb-2`}
              aria-hidden="true"
            />
            <span className="text-xs font-mono font-medium">lg ({ICON_SIZES.lg.px}px)</span>
            <span className="text-[10px] text-secondary-text mt-1">{ICON_SIZES.lg.usage}</span>
          </div>
        </div>
      </section>

      {/* Screen Reader Compliance Notice */}
      <section className="p-3 rounded border border-border-subtle bg-surface-panel text-xs space-y-1">
        <div className="flex items-center gap-1.5 font-semibold text-status-success">
          <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
          <span>Screen Reader Standard Enforced</span>
        </div>
        <p className="text-secondary-text text-[11px]">
          Decorative icons always declare{' '}
          <code className="font-mono text-zinc-300">aria-hidden="true"</code>. Interactive icon-only
          buttons declare explicit <code className="font-mono text-zinc-300">aria-label</code> tags.
        </p>
      </section>
    </div>
  );
};
