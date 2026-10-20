import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  getStoredJobs,
  addMockJob,
  updateJobStatus,
  clearStoredJobs,
  subscribeToJobs,
  JOBS_STORAGE_KEY,
  simulateJobExecution,
  createJobExecutionControl,
} from '../jobs.ts';
import { VEO_FAST_PRESET } from '../profiles.ts';

describe('Persistent Job Queue & Status (CORE-020)', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('rejects malformed persisted job records instead of trusting the TypeScript type', async () => {
    localStorage.setItem(
      JOBS_STORAGE_KEY,
      JSON.stringify([
        {
          id: 'job-invalid-status',
          prompt: 'Malformed stored job',
          profileId: 'omni-flash',
          profileName: 'Omni Flash',
          provider: 'flow',
          status: 'rendered',
          createdAt: 1,
          updatedAt: 1,
          credits: 15,
          aspect: '9:16',
          duration: '10s',
        },
      ])
    );

    await expect(getStoredJobs()).rejects.toThrow('Stored job at index 0 is invalid');
  });

  it('rejects corrupted JSON in local storage without returning an empty queue', async () => {
    localStorage.setItem(JOBS_STORAGE_KEY, '{not valid JSON');

    await expect(getStoredJobs()).rejects.toThrow();
  });

  it('adds and persists mock generation job with selected profile attributes', async () => {
    const job = await addMockJob({
      prompt: 'Surreal neon forest at dusk',
      profile: VEO_FAST_PRESET,
    });

    expect(job.id).toBeDefined();
    expect(job.prompt).toBe('Surreal neon forest at dusk');
    expect(job.profileId).toBe(VEO_FAST_PRESET.id);
    expect(job.profileName).toBe(VEO_FAST_PRESET.name);
    expect(job.credits).toBe(25);
    expect(job.aspect).toBe('16:9');
    expect(job.status).toBe('pending');

    const stored = await getStoredJobs();
    expect(stored).toHaveLength(1);
    expect(stored[0].id).toBe(job.id);
    expect(localStorage.getItem(JOBS_STORAGE_KEY)).toContain('Surreal neon forest');
  });

  it('updates job status and attaches error or progress metadata', async () => {
    const job = await addMockJob({
      prompt: 'Hyperlapse city traffic',
    });

    const updated = await updateJobStatus(job.id, 'generating', { progressPercent: 65 });
    expect(updated?.status).toBe('generating');
    expect(updated?.progressPercent).toBe(65);

    const reloaded = await getStoredJobs();
    expect(reloaded[0].status).toBe('generating');
    expect(reloaded[0].progressPercent).toBe(65);
  });

  it('safely handles simulated policy refusal without uncaught exception', async () => {
    const job = await addMockJob({
      prompt: 'Restricted celebrity likeness simulation',
      failureMode: 'policy-refusal',
    });

    await simulateJobExecution(job.id, 'policy-refusal');

    const stored = await getStoredJobs();
    const target = stored.find((j) => j.id === job.id);
    expect(target?.status).toBe('policy-refusal');
    expect(target?.errorMessage).toContain('Safety policy refusal');
  });

  it('safely handles ambiguous submission by moving job to needs-review', async () => {
    const job = await addMockJob({
      prompt: 'Glitch in matrix submission',
      failureMode: 'ambiguous-submission',
    });

    await simulateJobExecution(job.id, 'ambiguous-submission');

    const stored = await getStoredJobs();
    const target = stored.find((j) => j.id === job.id);
    expect(target?.status).toBe('needs-review');
    expect(target?.errorMessage).toContain('Ambiguous submission state');
  });

  it('serializes concurrent job writes so no enqueue is lost', async () => {
    const jobs = await Promise.all([
      addMockJob({ prompt: 'Concurrent first job' }),
      addMockJob({ prompt: 'Concurrent second job' }),
    ]);

    const stored = await getStoredJobs();
    expect(stored.map((job) => job.id).sort()).toEqual(jobs.map((job) => job.id).sort());
  });

  it('uses the cross-context Web Lock for Chrome storage mutations', async () => {
    const originalChrome = globalThis.chrome;
    const originalLocks = navigator.locks;
    const stored: Record<string, unknown> = {};
    const lockRequest = vi.fn(
      async (_name: string, _options: LockOptions, callback: () => Promise<unknown>) => callback()
    );
    Object.defineProperty(navigator, 'locks', {
      configurable: true,
      value: { request: lockRequest },
    });
    Object.defineProperty(globalThis, 'chrome', {
      configurable: true,
      value: {
        storage: {
          local: {
            get: vi.fn(async (key: string) => ({ [key]: stored[key] })),
            set: vi.fn(async (values: Record<string, unknown>) => Object.assign(stored, values)),
          },
        },
      },
    });

    try {
      await Promise.all([
        addMockJob({ prompt: 'Cross-context first' }),
        addMockJob({ prompt: 'Cross-context second' }),
      ]);
      expect(lockRequest).toHaveBeenCalledTimes(2);
      expect(stored[JOBS_STORAGE_KEY] as unknown[]).toHaveLength(2);
    } finally {
      Object.defineProperty(globalThis, 'chrome', { configurable: true, value: originalChrome });
      Object.defineProperty(navigator, 'locks', { configurable: true, value: originalLocks });
    }
  });

  it('reports storage read failures rather than overwriting the queue', async () => {
    const originalChrome = globalThis.chrome;
    const existingJob = { id: 'existing-job', status: 'pending' };
    const set = vi.fn();
    Object.defineProperty(globalThis, 'chrome', {
      configurable: true,
      value: {
        storage: {
          local: {
            get: vi.fn(async () => {
              throw new Error('storage read unavailable');
            }),
            set,
          },
        },
      },
    });

    try {
      await expect(addMockJob({ prompt: 'Do not replace stored queue' })).rejects.toThrow(
        'storage read unavailable'
      );
      expect(existingJob.status).toBe('pending');
      expect(set).not.toHaveBeenCalled();
    } finally {
      Object.defineProperty(globalThis, 'chrome', { configurable: true, value: originalChrome });
    }
  });

  it('reports storage write failures instead of claiming a job was saved', async () => {
    const originalChrome = globalThis.chrome;
    Object.defineProperty(globalThis, 'chrome', {
      configurable: true,
      value: {
        storage: {
          local: {
            get: vi.fn(async () => ({})),
            set: vi.fn(async () => {
              throw new Error('storage unavailable');
            }),
          },
        },
      },
    });

    try {
      await expect(addMockJob({ prompt: 'Must not pretend to persist' })).rejects.toThrow(
        'storage unavailable'
      );
    } finally {
      Object.defineProperty(globalThis, 'chrome', { configurable: true, value: originalChrome });
    }
  });

  it('does not overwrite a terminal job status with stale mock progress', async () => {
    const job = await addMockJob({ prompt: 'Terminal status guard test' });
    await updateJobStatus(job.id, 'failed', { errorMessage: 'Cancelled by user.' });

    const staleUpdate = await updateJobStatus(
      job.id,
      'submitting',
      { progressPercent: 15 },
      { expectedStatuses: ['pending'] }
    );

    expect(staleUpdate?.status).toBe('failed');
    expect(staleUpdate?.errorMessage).toBe('Cancelled by user.');
    expect((await getStoredJobs()).find((item) => item.id === job.id)?.status).toBe('failed');
  });

  it('does not advance a cancelled mock execution', async () => {
    const control = createJobExecutionControl();
    control.pause();
    const job = await addMockJob({ prompt: 'Cancelable mock job', control });
    const execution = simulateJobExecution(job.id, 'none', control);

    await new Promise((resolve) => setTimeout(resolve, 70));
    const pausedJob = (await getStoredJobs()).find((item) => item.id === job.id);
    expect(pausedJob?.status).toBe('pending');

    control.cancel();
    await execution;
    const cancelledJob = (await getStoredJobs()).find((item) => item.id === job.id);
    expect(cancelledJob?.status).toBe('pending');
  });

  it('cancels a paused execution and persists its terminal failure status', async () => {
    const control = createJobExecutionControl();
    control.pause();
    const job = await addMockJob({ prompt: 'Persist cancellation status', control });
    await updateJobStatus(job.id, 'submitting', {}, { expectedStatuses: ['pending'] });

    const cancelled = await updateJobStatus(
      job.id,
      'failed',
      { errorMessage: 'Cancelled by user.' },
      { expectedStatuses: ['pending', 'submitting', 'generating'] }
    );

    expect(cancelled?.status).toBe('failed');
    expect(cancelled?.errorMessage).toBe('Cancelled by user.');
  });

  it('subscribes to Chrome storage changes and cleans up listener on unsubscribe', async () => {
    let listener: ((changes: Record<string, chrome.storage.StorageChange>) => void) | undefined;
    const addListener = vi.fn((callback: typeof listener) => {
      listener = callback;
    });
    const removeListener = vi.fn();
    const originalChrome = globalThis.chrome;
    const validStoredJob = {
      id: 'changed-in-another-context',
      prompt: 'Stored from another context',
      profileId: 'omni-flash',
      profileName: 'Omni Flash',
      provider: 'flow',
      status: 'pending',
      createdAt: 1,
      updatedAt: 1,
      credits: 15,
      aspect: '9:16',
      duration: '10s',
    };
    Object.defineProperty(globalThis, 'chrome', {
      configurable: true,
      value: {
        storage: {
          local: {
            get: vi.fn(async () => ({
              [JOBS_STORAGE_KEY]: [validStoredJob],
            })),
          },
          onChanged: { addListener, removeListener },
        },
      },
    });

    try {
      const callback = vi.fn();
      const unsubscribe = subscribeToJobs(callback);
      listener?.({ [JOBS_STORAGE_KEY]: { newValue: [{ id: 'changed-in-another-context' }] } });
      await vi.waitFor(() => expect(callback).toHaveBeenCalledWith([validStoredJob]));
      unsubscribe();
      expect(removeListener).toHaveBeenCalledWith(listener);
    } finally {
      Object.defineProperty(globalThis, 'chrome', { configurable: true, value: originalChrome });
    }
  });

  it('subscribes to job changes and cleans up listener on unsubscribe', async () => {
    let callCount = 0;
    const unsub = subscribeToJobs(() => {
      callCount++;
    });

    await addMockJob({ prompt: 'Event subscription test' });
    expect(callCount).toBeGreaterThanOrEqual(1);

    unsub();
    const beforeCount = callCount;
    await addMockJob({ prompt: 'Post-unsubscribe test' });
    expect(callCount).toBe(beforeCount);
  });

  it('clears stored jobs completely when requested', async () => {
    await addMockJob({ prompt: 'Job 1' });
    await addMockJob({ prompt: 'Job 2' });
    expect(await getStoredJobs()).toHaveLength(2);

    await clearStoredJobs();
    expect(await getStoredJobs()).toHaveLength(0);
  });
});
