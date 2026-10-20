import {
  SiteAdapter,
  ProviderCapabilities,
  ConnectionStatus,
  GenerationJobInput,
  JobSubmissionResult,
  JobPollResult,
  MediaExtractResult,
  AdapterError,
  PolicyRefusalError,
  AmbiguousSubmissionError,
  SelectorNotFoundError,
  ModelUnavailableError,
  MissingTabError,
  SessionSignedOutError,
  CreditDepletedError,
} from './types.ts';
import { Provider } from '../shared/types.ts';

export interface MockAdapterOptions {
  provider?: Provider;
  connected?: boolean;
  creditBalance?: number;
  simulateFailureMode?:
    | 'none'
    | 'policy-refusal'
    | 'ambiguous-submission'
    | 'signed-out'
    | 'lost-tab'
    | 'selector-not-found'
    | 'model-unavailable'
    | 'credit-depleted';
  pollIntervalCount?: number;
}

export class MockSiteAdapter implements SiteAdapter {
  readonly provider: Provider;
  private options: MockAdapterOptions;
  private activeJobs = new Map<string, { step: number; input: GenerationJobInput }>();

  constructor(options: MockAdapterOptions = {}) {
    this.provider = options.provider || 'flow';
    this.options = {
      connected: true,
      creditBalance: 250,
      simulateFailureMode: 'none',
      pollIntervalCount: 2,
      ...options,
    };
  }

  async getCapabilities(): Promise<ProviderCapabilities> {
    return {
      provider: this.provider,
      supportedAspects: ['9:16', '16:9', '1:1'],
      supportedDurations: ['4s', '6s', '8s', '10s'],
      supportedModels: ['gemini-2.0-flash', 'veo-3.1-quality'],
      supportsImageToVideo: true,
      supportsCameraMotion: true,
      supportsNegativePrompt: false,
      maxBatchSize: 50,
    };
  }

  async checkConnection(): Promise<ConnectionStatus> {
    if (!this.options.connected || this.options.simulateFailureMode === 'signed-out') {
      return {
        connected: false,
        provider: this.provider,
        error: 'User not signed into Google',
      };
    }
    return {
      connected: true,
      provider: this.provider,
      userEmail: 'user@example.com',
      creditBalance: this.options.creditBalance,
    };
  }

  async submitJob(input: GenerationJobInput): Promise<JobSubmissionResult> {
    if (this.options.simulateFailureMode === 'signed-out') {
      throw new SessionSignedOutError(this.provider);
    }
    if (this.options.simulateFailureMode === 'lost-tab') {
      throw new MissingTabError(this.provider);
    }
    if (this.options.simulateFailureMode === 'selector-not-found') {
      throw new SelectorNotFoundError('[data-submit]', `${this.provider} submit control`);
    }
    if (this.options.simulateFailureMode === 'model-unavailable') {
      throw new ModelUnavailableError(input.model, this.provider);
    }
    if (this.options.simulateFailureMode === 'credit-depleted') {
      throw new CreditDepletedError(0, input.estimatedCredits);
    }
    if (this.options.simulateFailureMode === 'ambiguous-submission') {
      throw new AmbiguousSubmissionError(
        'Submit button click timeout: generation request state unclear. Marking needs-review.'
      );
    }

    this.activeJobs.set(input.id, { step: 0, input });
    return {
      jobId: input.id,
      status: 'generating',
      startedAt: Date.now(),
    };
  }

  async pollJobStatus(jobId: string): Promise<JobPollResult> {
    const job = this.activeJobs.get(jobId);
    if (!job) {
      return {
        jobId,
        status: 'failed',
        error: new AdapterError('Job not found', 'UNKNOWN_ERROR', false, false),
      };
    }

    job.step += 1;

    if (this.options.simulateFailureMode === 'policy-refusal' && job.step >= 1) {
      return {
        jobId,
        status: 'policy-refusal',
        error: new PolicyRefusalError(
          'Content flagged by safety filters',
          'SAFETY_POLICY_VIOLATION'
        ),
      };
    }

    const maxSteps = this.options.pollIntervalCount || 2;
    if (job.step < maxSteps) {
      return {
        jobId,
        status: 'generating',
        progressPercent: Math.round((job.step / maxSteps) * 100),
      };
    }

    // Complete
    return {
      jobId,
      status: 'completed',
      progressPercent: 100,
      mediaUrl: 'blob:chrome-extension://ai-media-automator/mock-video.mp4',
    };
  }

  async abortJob(jobId: string): Promise<boolean> {
    return this.activeJobs.delete(jobId);
  }

  async extractMedia(jobId: string): Promise<MediaExtractResult> {
    return {
      jobId,
      mediaUrl: 'blob:chrome-extension://ai-media-automator/mock-video.mp4',
      filename: `mock_${jobId}.mp4`,
      mimeType: 'video/mp4',
    };
  }
}
