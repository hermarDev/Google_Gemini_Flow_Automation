import React from 'react';
import { Moon, Sun, Monitor } from 'lucide-react';
import { useTheme, ThemePreference } from '../../styles/theme.ts';

export const ThemeToggle: React.FC = () => {
  const { preference, setTheme } = useTheme();

  const options: Array<{
    value: ThemePreference;
    label: string;
    icon: React.FC<{ className?: string }>;
  }> = [
    { value: 'system', label: 'System', icon: Monitor },
    { value: 'dark', label: 'Dark', icon: Moon },
    { value: 'light', label: 'Light', icon: Sun },
  ];

  return (
    <div className="flex items-center p-0.5 rounded border border-zinc-800 bg-zinc-950 text-xs">
      {options.map(({ value, label, icon: Icon }) => {
        const isSelected = preference === value;
        return (
          <button
            key={value}
            type="button"
            onClick={() => setTheme(value)}
            aria-pressed={isSelected}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded transition-colors ${
              isSelected
                ? 'bg-zinc-800 text-zinc-100 font-medium'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Icon className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{label}</span>
          </button>
        );
      })}
    </div>
  );
};
