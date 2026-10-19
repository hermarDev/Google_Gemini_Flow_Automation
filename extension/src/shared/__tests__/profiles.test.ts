import { describe, it, expect, beforeEach } from 'vitest';
import {
  AVAILABLE_PROFILES,
  DEFAULT_OMNI_PRESET,
  OMNI_BUDGET_PRESET,
  VEO_FAST_PRESET,
  getActiveProfile,
  setActiveProfile,
  PROFILE_STORAGE_KEY,
} from '../profiles.ts';

describe('Profile Selection & Configuration (CORE-020)', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('exposes documented baseline presets including omni 720p, 360p budget, and veo', () => {
    expect(AVAILABLE_PROFILES).toHaveLength(3);

    const omni720 = AVAILABLE_PROFILES.find((p) => p.id === DEFAULT_OMNI_PRESET.id);
    expect(omni720).toBeDefined();
    expect(omni720?.creditsPerOutput).toBe(15);
    expect(omni720?.aspect).toBe('9:16');
    expect(omni720?.duration).toBe('10s');

    const budget = AVAILABLE_PROFILES.find((p) => p.id === OMNI_BUDGET_PRESET.id);
    expect(budget).toBeDefined();
    expect(budget?.creditsPerOutput).toBe(10);
    expect(budget?.resolution).toBe('360p');

    const veo = AVAILABLE_PROFILES.find((p) => p.id === VEO_FAST_PRESET.id);
    expect(veo).toBeDefined();
    expect(veo?.creditsPerOutput).toBe(25);
    expect(veo?.aspect).toBe('16:9');
  });

  it('defaults to Gemini Omni Flash preset when no profile is saved', async () => {
    const active = await getActiveProfile();
    expect(active.id).toBe(DEFAULT_OMNI_PRESET.id);
    expect(active.name).toContain('Omni Flash 720p');
  });

  it('persists selected profile to local storage and updates active profile', async () => {
    const chosen = await setActiveProfile(VEO_FAST_PRESET.id);
    expect(chosen.id).toBe(VEO_FAST_PRESET.id);
    expect(localStorage.getItem(PROFILE_STORAGE_KEY)).toBe(VEO_FAST_PRESET.id);

    const reloaded = await getActiveProfile();
    expect(reloaded.id).toBe(VEO_FAST_PRESET.id);
  });
});
