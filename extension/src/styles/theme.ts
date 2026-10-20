import { useEffect, useState } from 'react';

export type ThemePreference = 'dark' | 'light' | 'system';
export type ResolvedTheme = 'dark' | 'light';

export const THEME_STORAGE_KEY = 'ai_media_automator_theme_preference';

/**
 * Checks system dark mode preference via matchMedia
 */
export function getSystemTheme(): ResolvedTheme {
  if (typeof window !== 'undefined' && window.matchMedia) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return 'dark'; // Default fallback is dark per ADR-001
}

/**
 * Applies the resolved theme class to document.documentElement
 */
export function applyThemeClass(theme: ResolvedTheme): void {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  if (theme === 'dark') {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
}

/**
 * Retrieves persisted theme preference synchronously from localStorage or chrome.storage
 */
export function getStoredThemePreference(): ThemePreference {
  try {
    if (typeof localStorage !== 'undefined') {
      const stored = localStorage.getItem(THEME_STORAGE_KEY);
      if (stored === 'dark' || stored === 'light' || stored === 'system') {
        return stored;
      }
    }
  } catch {
    // Storage access unavailable
  }
  return 'system';
}

/**
 * Persists theme preference to storage
 */
export function setStoredThemePreference(theme: ThemePreference): void {
  try {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    }
  } catch {
    // Storage access unavailable
  }

  if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
    chrome.storage.local.set({ [THEME_STORAGE_KEY]: theme }).catch(() => {});
  }
}

/**
 * React Hook for theme management
 */
export function useTheme() {
  const [preference, setPreference] = useState<ThemePreference>(() => getStoredThemePreference());
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>(() => {
    const pref = getStoredThemePreference();
    return pref === 'system' ? getSystemTheme() : pref;
  });

  useEffect(() => {
    const handleSystemChange = () => {
      if (preference === 'system') {
        const currentSystem = getSystemTheme();
        setResolvedTheme(currentSystem);
        applyThemeClass(currentSystem);
      }
    };

    const mediaQuery = window.matchMedia?.('(prefers-color-scheme: dark)');
    if (mediaQuery?.addEventListener) {
      mediaQuery.addEventListener('change', handleSystemChange);
    }

    return () => {
      if (mediaQuery?.removeEventListener) {
        mediaQuery.removeEventListener('change', handleSystemChange);
      }
    };
  }, [preference]);

  const setTheme = (newPref: ThemePreference) => {
    setPreference(newPref);
    setStoredThemePreference(newPref);
    const resolved = newPref === 'system' ? getSystemTheme() : newPref;
    setResolvedTheme(resolved);
    applyThemeClass(resolved);
  };

  return {
    preference,
    resolvedTheme,
    setTheme,
  };
}
