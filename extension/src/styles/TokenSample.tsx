import React from 'react';
import { tokens } from './tokens.ts';

export const TokenSample: React.FC = () => {
  return (
    <div className="p-6 bg-surface-background text-primary-text space-y-6 max-w-4xl font-sans">
      <header className="border-b border-border-subtle pb-4">
        <h1 className="text-xl font-bold tracking-tight">Design Token Reference</h1>
        <p className="text-secondary-text text-sm mt-1">
          Semantically named color, typography, spacing, and radius tokens (RES-014 / CORE-009).
        </p>
      </header>

      {/* Surface Colors */}
      <section className="space-y-3">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-secondary-text">
          Surface Colors
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {Object.entries(tokens.colors.surface).map(([name, hex]) => (
            <div key={name} className="border border-border-subtle rounded p-3 bg-surface-panel">
              <div
                className="w-full h-10 rounded border border-border-subtle mb-2"
                style={{ backgroundColor: hex }}
              />
              <span className="text-xs font-medium block text-primary-text">{name}</span>
              <span className="text-[11px] font-mono text-secondary-text">{hex}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Status Colors */}
      <section className="space-y-3">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-secondary-text">
          Status & Truth-in-State Colors
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {Object.entries(tokens.colors.status).map(([name, hex]) => (
            <div key={name} className="border border-border-subtle rounded p-3 bg-surface-panel">
              <div
                className="w-full h-8 rounded border border-border-subtle mb-2"
                style={{ backgroundColor: hex }}
              />
              <span className="text-xs font-medium block capitalize text-primary-text">{name}</span>
              <span className="text-[11px] font-mono text-secondary-text">{hex}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Spacing & Radii */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-secondary-text">
            Radii Tokens
          </h2>
          <div className="space-y-2">
            {Object.entries(tokens.radii).map(([name, val]) => (
              <div
                key={name}
                className="flex items-center justify-between p-2 rounded bg-surface-panel border border-border-subtle text-xs"
              >
                <span className="font-mono text-primary-text">{name}</span>
                <span className="text-secondary-text">{val}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-secondary-text">
            4px Spacing Grid
          </h2>
          <div className="space-y-2">
            {Object.entries(tokens.spacing)
              .slice(0, 6)
              .map(([step, px]) => (
                <div
                  key={step}
                  className="flex items-center justify-between p-2 rounded bg-surface-panel border border-border-subtle text-xs"
                >
                  <span className="font-mono text-primary-text">space-{step}</span>
                  <span className="text-secondary-text">{px}</span>
                </div>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
};
