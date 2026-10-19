import { VideoPreset, DEFAULT_OMNI_PRESET } from './types.ts';
export { DEFAULT_OMNI_PRESET };

export const OMNI_BUDGET_PRESET: VideoPreset = {
  id: 'omni-flash-360p-10s-9-16',
  name: 'Omni Flash 360p / 10s / 9:16 Budget',
  provider: 'flow',
  model: 'omni-flash-1.1',
  aspect: '9:16',
  duration: '10s',
  resolution: '360p',
  creditsPerOutput: 10,
};

export const VEO_FAST_PRESET: VideoPreset = {
  id: 'veo-2-fast-720p-6s-16-9',
  name: 'Veo 2.0 Fast / 6s / 16:9 Landscape',
  provider: 'flow',
  model: 'veo-2.0',
  aspect: '16:9',
  duration: '6s',
  resolution: '720p',
  creditsPerOutput: 25,
};

export const AVAILABLE_PROFILES: VideoPreset[] = [
  DEFAULT_OMNI_PRESET,
  OMNI_BUDGET_PRESET,
  VEO_FAST_PRESET,
];

export const PROFILE_STORAGE_KEY = 'ai_media_automator_active_profile_id';

export async function getActiveProfile(): Promise<VideoPreset> {
  let profileId: string | null = null;
  try {
    if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
      const res = await chrome.storage.local.get(PROFILE_STORAGE_KEY);
      profileId = (res[PROFILE_STORAGE_KEY] as string) || null;
    } else if (typeof localStorage !== 'undefined') {
      profileId = localStorage.getItem(PROFILE_STORAGE_KEY);
    }
  } catch {
    profileId = null;
  }

  const found = AVAILABLE_PROFILES.find((p) => p.id === profileId);
  return found || DEFAULT_OMNI_PRESET;
}

export async function setActiveProfile(profileId: string): Promise<VideoPreset> {
  const profile = AVAILABLE_PROFILES.find((p) => p.id === profileId) || DEFAULT_OMNI_PRESET;
  try {
    if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
      await chrome.storage.local.set({ [PROFILE_STORAGE_KEY]: profile.id });
    } else if (typeof localStorage !== 'undefined') {
      localStorage.setItem(PROFILE_STORAGE_KEY, profile.id);
    }
    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('ai_media_automator_profile_changed', { detail: profile })
      );
    }
  } catch {
    // Ignore storage errors in test environments
  }
  return profile;
}
