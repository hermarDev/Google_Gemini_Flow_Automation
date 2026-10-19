import { z } from 'zod';
import { ProviderSchema, VideoAspectSchema, VideoDurationSchema } from './types.ts';

export const CURRENT_SETTINGS_SCHEMA_VERSION = 1;
export const SETTINGS_STORAGE_KEY = 'ai_media_automator_settings';

export const AppSettingsSchema = z.object({
  schemaVersion: z.number().int().positive().default(CURRENT_SETTINGS_SCHEMA_VERSION),
  defaultProvider: ProviderSchema.default('flow'),
  defaultAspect: VideoAspectSchema.default('9:16'),
  defaultDuration: VideoDurationSchema.default('10s'),
  downloadSubfolderPattern: z
    .string()
    .min(1)
    .max(100)
    .default('AI-Media-Automator/{date}')
    .refine((val) => !val.includes('..'), {
      message: 'Subfolder pattern cannot contain parent directory traversal ("..")',
    }),
  autoDownloadOnComplete: z.boolean().default(true),
  theme: z.enum(['dark', 'light', 'system']).default('system'),
  notificationsEnabled: z.boolean().default(true),
  useMockAdapter: z.boolean().default(false),
});

export type AppSettings = z.infer<typeof AppSettingsSchema>;

export const DEFAULT_APP_SETTINGS: AppSettings = AppSettingsSchema.parse({});

/**
 * Validates and safely loads settings from chrome.storage.local or localStorage.
 * If corrupt, missing, or invalid, returns default settings safely.
 */
export async function getAppSettings(): Promise<AppSettings> {
  let rawData: unknown = null;

  try {
    if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
      const res = await chrome.storage.local.get(SETTINGS_STORAGE_KEY);
      rawData = res[SETTINGS_STORAGE_KEY];
    } else if (typeof localStorage !== 'undefined') {
      const stored = localStorage.getItem(SETTINGS_STORAGE_KEY);
      if (stored) {
        rawData = JSON.parse(stored);
      }
    }
  } catch (err) {
    console.warn('[Settings] Failed to read storage, falling back to defaults:', err);
    return DEFAULT_APP_SETTINGS;
  }

  if (!rawData || typeof rawData !== 'object') {
    return DEFAULT_APP_SETTINGS;
  }

  const parsed = AppSettingsSchema.safeParse(rawData);
  if (!parsed.success) {
    console.warn(
      '[Settings] Corrupt settings schema detected, resetting to defaults:',
      parsed.error.issues
    );
    return DEFAULT_APP_SETTINGS;
  }

  return parsed.data;
}

/**
 * Validates and persists partial or full settings.
 */
export async function saveAppSettings(updates: Partial<AppSettings>): Promise<AppSettings> {
  const current = await getAppSettings();
  const merged = {
    ...current,
    ...updates,
    schemaVersion: CURRENT_SETTINGS_SCHEMA_VERSION,
  };

  const parsed = AppSettingsSchema.safeParse(merged);
  if (!parsed.success) {
    throw new Error(`Invalid settings: ${parsed.error.issues.map((i) => i.message).join(', ')}`);
  }

  const validated = parsed.data;

  try {
    if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
      await chrome.storage.local.set({ [SETTINGS_STORAGE_KEY]: validated });
    } else if (typeof localStorage !== 'undefined') {
      localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(validated));
    }
  } catch (err) {
    console.error('[Settings] Failed to save settings:', err);
    throw err;
  }

  return validated;
}

/**
 * Resets settings to factory defaults.
 */
export async function resetAppSettings(): Promise<AppSettings> {
  return saveAppSettings(DEFAULT_APP_SETTINGS);
}
