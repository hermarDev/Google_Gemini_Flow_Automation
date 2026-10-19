import { describe, it, expect } from 'vitest';
import {
  createSiteAdapter,
  MockSiteAdapter,
  FlowSiteAdapter,
  GeminiSiteAdapter,
  PolicyRefusalError,
  AmbiguousSubmissionError,
  CreditDepletedError,
  SessionSignedOutError,
  SelectorNotFoundError,
  GenerationJobInput,
} from '../index.ts';

const mockJobInput: GenerationJobInput = {
  id: 'job-test-001',
  prompt: 'Cinematic drone shot of misty mountain peaks',
  model: 'veo-3.1-quality',
  aspect: '16:9',
  duration: '10s',
  estimatedCredits: 100,
};

describe('Adapter Interfaces & Mock Transport (CORE-016)', () => {
  describe('Polymorphism and Swappability', () => {
    it('creates Flow adapter transparently via factory', () => {
      const adapter = createSiteAdapter('flow');
      expect(adapter).toBeInstanceOf(FlowSiteAdapter);
      expect(adapter.provider).toBe('flow');
    });

    it('creates Gemini adapter transparently via factory', () => {
      const adapter = createSiteAdapter('gemini');
      expect(adapter).toBeInstanceOf(GeminiSiteAdapter);
      expect(adapter.provider).toBe('gemini');
    });

    it('creates Mock adapter transparently when useMock is enabled', () => {
      const adapter = createSiteAdapter('flow', { useMock: true });
      expect(adapter).toBeInstanceOf(MockSiteAdapter);
      expect(adapter.provider).toBe('flow');
    });

    it('returns valid capabilities schema across all adapters', async () => {
      const flowCaps = await new FlowSiteAdapter().getCapabilities();
      const geminiCaps = await new GeminiSiteAdapter().getCapabilities();
      const mockCaps = await new MockSiteAdapter().getCapabilities();

      expect(flowCaps.provider).toBe('flow');
      expect(geminiCaps.provider).toBe('gemini');
      expect(mockCaps.maxBatchSize).toBeGreaterThan(0);
    });
  });

  describe('Mock Adapter Execution Lifecycle', () => {
    it('simulates complete job submission and polling to completion', async () => {
      const adapter = new MockSiteAdapter({ pollIntervalCount: 2 });

      const subResult = await adapter.submitJob(mockJobInput);
      expect(subResult.jobId).toBe('job-test-001');
      expect(subResult.status).toBe('generating');

      // Poll 1: generating
      const poll1 = await adapter.pollJobStatus('job-test-001');
      expect(poll1.status).toBe('generating');
      expect(poll1.progressPercent).toBe(50);

      // Poll 2: completed
      const poll2 = await adapter.pollJobStatus('job-test-001');
      expect(poll2.status).toBe('completed');
      expect(poll2.progressPercent).toBe(100);
      expect(poll2.mediaUrl).toBeDefined();

      const media = await adapter.extractMedia('job-test-001');
      expect(media.filename).toContain('job-test-001');
      expect(media.mimeType).toBe('video/mp4');
    });
  });

  describe('Failure Safety & Typed Error Handling', () => {
    it('throws SessionSignedOutError when user is not authenticated', async () => {
      const adapter = new MockSiteAdapter({ simulateFailureMode: 'signed-out' });
      await expect(adapter.submitJob(mockJobInput)).rejects.toThrow(SessionSignedOutError);
    });

    it('throws CreditDepletedError when balance is zero', async () => {
      const adapter = new MockSiteAdapter({ simulateFailureMode: 'credit-depleted' });
      await expect(adapter.submitJob(mockJobInput)).rejects.toThrow(CreditDepletedError);
    });

    it('throws AmbiguousSubmissionError with requiresReview=true on timeout', async () => {
      const adapter = new MockSiteAdapter({ simulateFailureMode: 'ambiguous-submission' });
      try {
        await adapter.submitJob(mockJobInput);
        expect.unreachable('Should have thrown AmbiguousSubmissionError');
      } catch (err) {
        expect(err).toBeInstanceOf(AmbiguousSubmissionError);
        const ambErr = err as AmbiguousSubmissionError;
        expect(ambErr.code).toBe('AMBIGUOUS_SUBMISSION');
        expect(ambErr.requiresReview).toBe(true);
      }
    });

    it('transitions to policy-refusal when safety filters flag prompt', async () => {
      const adapter = new MockSiteAdapter({ simulateFailureMode: 'policy-refusal' });
      await adapter.submitJob(mockJobInput);

      const poll = await adapter.pollJobStatus('job-test-001');
      expect(poll.status).toBe('policy-refusal');
      expect(poll.error).toBeInstanceOf(PolicyRefusalError);
      expect(poll.error?.code).toBe('POLICY_REFUSAL');
    });

    it('formats SelectorNotFoundError with selector and context', () => {
      const err = new SelectorNotFoundError('button[aria-label="Generate"]', 'flow canvas submit');
      expect(err.code).toBe('SELECTOR_NOT_FOUND');
      expect(err.requiresReview).toBe(true);
      expect(err.message).toContain('button[aria-label="Generate"]');
    });
  });
});
