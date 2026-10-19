import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import {
  applyThemeClass,
  getStoredThemePreference,
  setStoredThemePreference,
  THEME_STORAGE_KEY,
} from '../theme.ts';
import { ThemeToggle } from '../../components/ui/ThemeToggle.tsx';

describe('Light, Dark & System Theme Management (CORE-013 / RES-014)', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.className = '';
  });

  it('applies dark class to document.documentElement when dark is resolved', () => {
    applyThemeClass('dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);

    applyThemeClass('light');
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });

  it('persists and retrieves theme preference in localStorage', () => {
    expect(getStoredThemePreference()).toBe('system');

    setStoredThemePreference('dark');
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe('dark');
    expect(getStoredThemePreference()).toBe('dark');

    setStoredThemePreference('light');
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe('light');
    expect(getStoredThemePreference()).toBe('light');
  });

  it('renders ThemeToggle with all 3 options and responds to user click', () => {
    // Mock matchMedia
    window.matchMedia = vi.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    render(<ThemeToggle />);

    const darkBtn = screen.getByRole('button', { name: /dark/i });
    const lightBtn = screen.getByRole('button', { name: /light/i });
    const systemBtn = screen.getByRole('button', { name: /system/i });

    expect(darkBtn).toBeDefined();
    expect(lightBtn).toBeDefined();
    expect(systemBtn).toBeDefined();

    fireEvent.click(darkBtn);
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe('dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);

    fireEvent.click(lightBtn);
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe('light');
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });
});
