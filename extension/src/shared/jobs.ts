import { z } from 'zod';
import {
  JobStatus,
  JobStatusSchema,
  Provider,
  ProviderSchema,
  VideoAspectSchema,
  VideoDurationSchema,
  VideoPreset,
  DEFAULT_OMNI_PRESET,
} from './types.ts';

export const JOBS_STORAGE_KEY = 'ai_media_automator_jobs';

const StoredJobItemSchema = z
  .object({
    id: z.string().min(1),
    prompt: z.string(),
    profileId: z.string().min(1),
    profileName: z.string(),
    provider: ProviderSchema,
    status: JobStatusSchema,
    createdAt: z.number().finite().nonnegative(),
    updatedAt: z.number().finite().nonnegative(),
    credits: z.number().int().nonnegative(),
    aspect: VideoAspectSchema,
    duration: VideoDurationSchema,
    errorMessage: z.string().optional(),
    progressPercent: z.number().min(0).max(100).optional(),
  })
  .passthrough();

function validateStoredJobs(value: unknown): JobItem[] {
  if (!Array.isArray(value)) throw new Error('Stored jobs data is not a valid list.');
  return value.map((job, index) => {
    const result = StoredJobItemSchema.safeParse(job);
    if (!result.success) {
      const issues = result.error.issues.map(
        (issue) => `${issue.path.join('.')}: ${issue.message}`
      );
      throw new Error(`Stored job at index ${index} is invalid: ${issues.join('; ')}`);
    }
    return result.data;
  });
}

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

const JOBS_STORAGE_LOCK = 'ai-media-automator-jobs';
let storageWriteQueue: Promise<void> = Promise.resolve();

function withSerializedStorageWrite<T>(operation: () => Promise<T>): Promise<T> {
  const queueStorageWrite = <V>(run: () => Promise<V>): Promise<V> => {
    const result = storageWriteQueue.then(run, run);
    storageWriteQueue = result.then(
      () => undefined,
      () => undefined
    );
    return result;
  };
  return queueStorageWrite(async () => {
    if (typeof navigator === 'undefined' || !navigator.locks) return operation();
    return await navigator.locks.request<Promise<T>>(JOBS_STORAGE_LOCK, { mode: 'exclusive' }, () =>
      operation()
    );
  });
}

export interface JobExecutionControl {
  signal: AbortSignal;
  pause(): void;
  resume(): void;
  cancel(): void;
  waitUntilResumed(): Promise<boolean>;
}

export function createJobExecutionControl(): JobExecutionControl {
  const controller = new AbortController();
  let paused = false;
  let resumePromise: Promise<void> | undefined;
  let resolveResume: (() => void) | undefined;

  const resume = () => {
    if (!paused) return;
    paused = false;
    resolveResume?.();
    resolveResume = undefined;
    resumePromise = undefined;
  };

  return {
    signal: controller.signal,
    pause() {
      if (paused || controller.signal.aborted) return;
      paused = true;
      resumePromise = new Promise<void>((resolve) => {
        resolveResume = resolve;
      });
    },
    resume,
    cancel() {
      controller.abort();
      resume();
    },
    async waitUntilResumed() {
      if (controller.signal.aborted) return false;
      if (!paused || !resumePromise) return true;
      return new Promise<boolean>((resolve) => {
        const finish = (resumed: boolean) => {
          controller.signal.removeEventListener('abort', onAbort);
          resolve(resumed && !controller.signal.aborted);
        };
        const onAbort = () => finish(false);
        controller.signal.addEventListener('abort', onAbort, { once: true });
        resumePromise?.then(() => finish(true));
      });
    },
  };
}

async function waitForStage(signal?: AbortSignal): Promise<boolean> {
  if (signal?.aborted) return false;
  if (!signal) {
    await new Promise((resolve) => setTimeout(resolve, 60));
    return true;
  }
  return new Promise<boolean>((resolve) => {
    const timeout = setTimeout(() => {
      signal.removeEventListener('abort', abort);
      resolve(true);
    }, 60);
    const abort = () => {
      clearTimeout(timeout);
      signal.removeEventListener('abort', abort);
      resolve(false);
    };
    signal.addEventListener('abort', abort, { once: true });
  });
}

export async function getStoredJobs(): Promise<JobItem[]> {
  if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
    const res = await chrome.storage.local.get(JOBS_STORAGE_KEY);
    const jobs = res[JOBS_STORAGE_KEY];
    if (jobs === undefined) return [];
    return validateStoredJobs(jobs);
  }

  if (typeof localStorage !== 'undefined') {
    const raw = localStorage.getItem(JOBS_STORAGE_KEY);
    if (!raw) return [];
    return validateStoredJobs(JSON.parse(raw) as unknown);
  }
  return [];
}

export async function saveStoredJobs(jobs: JobItem[]): Promise<void> {
  if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
    await chrome.storage.local.set({ [JOBS_STORAGE_KEY]: jobs });
  } else if (typeof localStorage !== 'undefined') {
    localStorage.setItem(JOBS_STORAGE_KEY, JSON.stringify(jobs));
  } else {
    throw new Error('Persistent job storage is unavailable in this context.');
  }
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('ai_media_automator_jobs_changed', { detail: jobs }));
  }
}

export async function updateJobStatus(
  id: string,
  status: JobStatus,
  updates: Partial<Omit<JobItem, 'id' | 'createdAt'>> = {},
  options: { expectedStatuses?: JobStatus[] } = {}
): Promise<JobItem | null> {
  return withSerializedStorageWrite(async () => {
    const jobs = await getStoredJobs();
    const idx = jobs.findIndex((job) => job.id === id);
    if (idx === -1) return null;

    const current = jobs[idx];
    if (options.expectedStatuses && !options.expectedStatuses.includes(current.status))
      return current;

    const updated: JobItem = {
      ...current,
      ...updates,
      status,
      updatedAt: Date.now(),
    };
    jobs[idx] = updated;
    await saveStoredJobs(jobs);
    return updated;
  });
}

export async function simulateJobExecution(
  id: string,
  failureMode: 'none' | 'policy-refusal' | 'ambiguous-submission' | 'selector-not-found' = 'none',
  control?: JobExecutionControl
): Promise<void> {
  const stage = async () => {
    if (!(await waitForStage(control?.signal)) || control?.signal.aborted) return false;
    return control ? control.waitUntilResumed() : true;
  };

  if (!(await stage()) || control?.signal.aborted) return;
  await updateJobStatus(
    id,
    'submitting',
    { progressPercent: 15 },
    { expectedStatuses: ['pending'] }
  );
  if (control?.signal.aborted) return;

  if (failureMode === 'policy-refusal') {
    if (!(await stage()) || control?.signal.aborted) return;
    await updateJobStatus(
      id,
      'policy-refusal',
      {
        errorMessage: 'Safety policy refusal: prompt flagged for restricted content.',
        progressPercent: 0,
      },
      { expectedStatuses: ['submitting'] }
    );
    return;
  }

  if (failureMode === 'ambiguous-submission') {
    if (!(await stage()) || control?.signal.aborted) return;
    await updateJobStatus(
      id,
      'needs-review',
      {
        errorMessage:
          'Ambiguous submission state: confirmation dialog disappeared without confirmation.',
        progressPercent: 20,
      },
      { expectedStatuses: ['submitting'] }
    );
    return;
  }

  if (failureMode === 'selector-not-found') {
    if (!(await stage()) || control?.signal.aborted) return;
    await updateJobStatus(
      id,
      'failed',
      {
        errorMessage:
          'Target selector not found. No submission was performed; check the page layout and try again.',
        progressPercent: 0,
      },
      { expectedStatuses: ['submitting'] }
    );
    return;
  }

  if (!(await stage()) || control?.signal.aborted) return;
  await updateJobStatus(
    id,
    'generating',
    { progressPercent: 50 },
    { expectedStatuses: ['submitting'] }
  );
  if (control?.signal.aborted) return;

  if (!(await stage()) || control?.signal.aborted) return;
  await updateJobStatus(
    id,
    'completed',
    { progressPercent: 100 },
    { expectedStatuses: ['generating'] }
  );
}

export async function addMockJob(params: {
  prompt: string;
  profile?: VideoPreset;
  failureMode?: 'none' | 'policy-refusal' | 'ambiguous-submission' | 'selector-not-found';
  control?: JobExecutionControl;
}): Promise<JobItem> {
  const profile = params.profile || DEFAULT_OMNI_PRESET;
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

  await withSerializedStorageWrite(async () => {
    const currentJobs = await getStoredJobs();
    await saveStoredJobs([newJob, ...currentJobs]);
  });

  const scheduleExecution = () => {
    if (params.control?.signal.aborted) return;
    simulateJobExecution(id, params.failureMode || 'none', params.control).catch(() => {
      // Keep last successful state visible if mock progression cannot continue.
    });
  };

  if (typeof chrome !== 'undefined' && chrome.storage?.local && typeof window === 'undefined') {
    const onStored = (changes: Record<string, chrome.storage.StorageChange>) => {
      const addedJobs = changes[JOBS_STORAGE_KEY]?.newValue as JobItem[] | undefined;
      if (!addedJobs?.some((job) => job.id === id)) return;
      chrome.storage.onChanged.removeListener(onStored);
      scheduleExecution();
    };
    chrome.storage.onChanged.addListener(onStored);
  } else if (!params.control?.signal.aborted) {
    scheduleExecution();
  }

  return newJob;
}

export async function clearStoredJobs(): Promise<void> {
  await withSerializedStorageWrite(() => saveStoredJobs([]));
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
