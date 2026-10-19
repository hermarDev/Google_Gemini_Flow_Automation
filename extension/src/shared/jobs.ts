import { JobStatus, Provider, VideoPreset, DEFAULT_OMNI_PRESET } from './types.ts';

export const JOBS_STORAGE_KEY = 'ai_media_automator_jobs';

export interface JobItem {
  id: string;
  prompt: string;
  profileId: string;
  profileName: string;
  provider: Provider;
  status: JobStatus;
  createdAt: number;
  updatedAt: number;
  credits: number;
  aspect: string;
  duration: string;
  errorMessage?: string;
  progressPercent?: number;
}

export async function getStoredJobs(): Promise<JobItem[]> {
  try {
    if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
      const res = await chrome.storage.local.get(JOBS_STORAGE_KEY);
      const jobs = res[JOBS_STORAGE_KEY];
      return Array.isArray(jobs) ? (jobs as JobItem[]) : [];
    } else if (typeof localStorage !== 'undefined') {
      const raw = localStorage.getItem(JOBS_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) ? (parsed as JobItem[]) : [];
      }
    }
  } catch {
    // Return empty list on read errors
  }
  return [];
}

export async function saveStoredJobs(jobs: JobItem[]): Promise<void> {
  try {
    if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
      await chrome.storage.local.set({ [JOBS_STORAGE_KEY]: jobs });
    } else if (typeof localStorage !== 'undefined') {
      localStorage.setItem(JOBS_STORAGE_KEY, JSON.stringify(jobs));
    }
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('ai_media_automator_jobs_changed', { detail: jobs }));
    }
  } catch {
    // Ignore storage write errors in restricted contexts
  }
}

export async function updateJobStatus(
  id: string,
  status: JobStatus,
  updates: Partial<Omit<JobItem, 'id' | 'createdAt'>> = {}
): Promise<JobItem | null> {
  const jobs = await getStoredJobs();
  const idx = jobs.findIndex((j) => j.id === id);
  if (idx === -1) return null;

  const updated: JobItem = {
    ...jobs[idx],
    ...updates,
    status,
    updatedAt: Date.now(),
  };
  jobs[idx] = updated;
  await saveStoredJobs(jobs);
  return updated;
}

export async function simulateJobExecution(
  id: string,
  failureMode: 'none' | 'policy-refusal' | 'ambiguous-submission' | 'selector-not-found' = 'none'
): Promise<void> {
  // Step 1: Submitting
  await new Promise((r) => setTimeout(r, 60));
  await updateJobStatus(id, 'submitting', { progressPercent: 15 });

  // Handle failure modes
  if (failureMode === 'policy-refusal') {
    await new Promise((r) => setTimeout(r, 60));
    await updateJobStatus(id, 'policy-refusal', {
      errorMessage: 'Safety policy refusal: prompt flagged for restricted content.',
      progressPercent: 0,
    });
    return;
  }

  if (failureMode === 'ambiguous-submission') {
    await new Promise((r) => setTimeout(r, 60));
    await updateJobStatus(id, 'needs-review', {
      errorMessage:
        'Ambiguous submission state: confirmation dialog disappeared without confirmation.',
      progressPercent: 20,
    });
    return;
  }

  if (failureMode === 'selector-not-found') {
    await new Promise((r) => setTimeout(r, 60));
    await updateJobStatus(id, 'failed', {
      errorMessage:
        'DOM selector "button[aria-label=\'Generate\']" not found. Site layout may have changed.',
      progressPercent: 0,
    });
    return;
  }

  // Step 2: Generating
  await new Promise((r) => setTimeout(r, 60));
  await updateJobStatus(id, 'generating', { progressPercent: 50 });

  // Step 3: Completed
  await new Promise((r) => setTimeout(r, 60));
  await updateJobStatus(id, 'completed', { progressPercent: 100 });
}

export async function addMockJob(params: {
  prompt: string;
  profile?: VideoPreset;
  failureMode?: 'none' | 'policy-refusal' | 'ambiguous-submission' | 'selector-not-found';
}): Promise<JobItem> {
  const profile = params.profile || DEFAULT_OMNI_PRESET;
  const currentJobs = await getStoredJobs();
  const now = Date.now();
  const id = `job_${now}_${Math.random().toString(36).substring(2, 7)}`;

  const newJob: JobItem = {
    id,
    prompt: params.prompt.trim(),
    profileId: profile.id,
    profileName: profile.name,
    provider: profile.provider,
    status: 'pending',
    createdAt: now,
    updatedAt: now,
    credits: profile.creditsPerOutput,
    aspect: profile.aspect,
    duration: profile.duration,
    progressPercent: 0,
  };

  const updatedJobs = [newJob, ...currentJobs];
  await saveStoredJobs(updatedJobs);

  // Non-blocking simulated execution
  simulateJobExecution(id, params.failureMode || 'none').catch(() => {
    // Ignore internal simulation rejections
  });

  return newJob;
}

export async function clearStoredJobs(): Promise<void> {
  await saveStoredJobs([]);
}

export function subscribeToJobs(callback: (jobs: JobItem[]) => void): () => void {
  const handleCustomEvent = (e: Event) => {
    const detail = (e as CustomEvent<JobItem[]>).detail;
    if (Array.isArray(detail)) {
      callback(detail);
    } else {
      getStoredJobs().then(callback);
    }
  };

  const handleStorageEvent = (e: StorageEvent) => {
    if (e.key === JOBS_STORAGE_KEY) {
      getStoredJobs().then(callback);
    }
  };

  let chromeListener: ((changes: { [key: string]: chrome.storage.StorageChange }) => void) | null =
    null;

  if (typeof window !== 'undefined') {
    window.addEventListener('ai_media_automator_jobs_changed', handleCustomEvent);
    window.addEventListener('storage', handleStorageEvent);
  }

  if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.onChanged) {
    chromeListener = (changes) => {
      if (changes[JOBS_STORAGE_KEY]) {
        getStoredJobs().then(callback);
      }
    };
    chrome.storage.onChanged.addListener(chromeListener);
  }

  return () => {
    if (typeof window !== 'undefined') {
      window.removeEventListener('ai_media_automator_jobs_changed', handleCustomEvent);
      window.removeEventListener('storage', handleStorageEvent);
    }
    if (
      chromeListener &&
      typeof chrome !== 'undefined' &&
      chrome.storage &&
      chrome.storage.onChanged
    ) {
      chrome.storage.onChanged.removeListener(chromeListener);
    }
  };
}
