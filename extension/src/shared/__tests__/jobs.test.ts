import { describe, it, expect, beforeEach } from 'vitest';
import {
  getStoredJobs,
  addMockJob,
  updateJobStatus,
  clearStoredJobs,
  subscribeToJobs,
  JOBS_STORAGE_KEY,
  simulateJobExecution,
} from '../jobs.ts';
import { VEO_FAST_PRESET } from '../profiles.ts';

describe('Persistent Job Queue & Status (CORE-020)', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('initializes with an empty job list when storage is clean', async () => {
    const jobs = await getStoredJobs();
    expect(jobs).toEqual([]);
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
