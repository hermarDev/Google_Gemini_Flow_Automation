import { describe, it, expect, beforeEach } from 'vitest';
import {
  getAppSettings,
  saveAppSettings,
  resetAppSettings,
  DEFAULT_APP_SETTINGS,
  SETTINGS_STORAGE_KEY,
  CURRENT_SETTINGS_SCHEMA_VERSION,
} from '../settings.ts';

describe('App Settings Persistence (CORE-015)', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('returns safe defaults when settings are missing', async () => {
    const settings = await getAppSettings();
    expect(settings).toEqual(DEFAULT_APP_SETTINGS);
    expect(settings.schemaVersion).toBe(CURRENT_SETTINGS_SCHEMA_VERSION);
  });

  it('persists and restores user preferences across reloads', async () => {
    await saveAppSettings({
      defaultProvider: 'gemini',
      defaultAspect: '16:9',
      theme: 'dark',
      autoDownloadOnComplete: false,
    });

    // Verify raw JSON persistence
    const stored = localStorage.getItem(SETTINGS_STORAGE_KEY);
    expect(stored).not.toBeNull();

    const settings = await getAppSettings();
    expect(settings.defaultProvider).toBe('gemini');
    expect(settings.defaultAspect).toBe('16:9');
    expect(settings.theme).toBe('dark');
    expect(settings.autoDownloadOnComplete).toBe(false);
    expect(settings.schemaVersion).toBe(CURRENT_SETTINGS_SCHEMA_VERSION);
  });

  it('falls back to default values when saved settings have corrupt schema', async () => {
    localStorage.setItem(
      SETTINGS_STORAGE_KEY,
      JSON.stringify({ schemaVersion: -1, defaultProvider: 'invalid-provider' })
    );

    const settings = await getAppSettings();
    expect(settings).toEqual(DEFAULT_APP_SETTINGS);
  });

  it('falls back to defaults when raw settings JSON cannot be parsed', async () => {
    localStorage.setItem(SETTINGS_STORAGE_KEY, '{ invalid json !!!');

    const settings = await getAppSettings();
    expect(settings).toEqual(DEFAULT_APP_SETTINGS);
  });

  it('rejects unsafe download subfolder directory traversal patterns', async () => {
    await expect(saveAppSettings({ downloadSubfolderPattern: '../../etc/passwd' })).rejects.toThrow(
      'parent directory traversal'
    );
  });

  it('resets all settings to factory defaults', async () => {
    await saveAppSettings({ theme: 'dark', defaultProvider: 'gemini' });
    const reset = await resetAppSettings();
    expect(reset).toEqual(DEFAULT_APP_SETTINGS);
    expect(await getAppSettings()).toEqual(DEFAULT_APP_SETTINGS);
  });
});
