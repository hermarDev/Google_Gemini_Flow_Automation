import {
  SiteAdapter,
  ProviderCapabilities,
  ConnectionStatus,
  GenerationJobInput,
  JobSubmissionResult,
  JobPollResult,
  MediaExtractResult,
  SessionSignedOutError,
} from './types.ts';

export class FlowSiteAdapter implements SiteAdapter {
  readonly provider = 'flow' as const;

  async getCapabilities(): Promise<ProviderCapabilities> {
    return {
      provider: 'flow',
      supportedAspects: ['9:16', '16:9', '1:1'],
      supportedDurations: ['4s', '6s', '8s', '10s'],
      supportedModels: ['veo-3.1-quality', 'veo-3.1-fast'],
      supportsImageToVideo: true,
      supportsCameraMotion: true,
      supportsNegativePrompt: false,
      maxBatchSize: 50,
    };
  }

  async checkConnection(): Promise<ConnectionStatus> {
    if (typeof window === 'undefined' || !window.location.hostname.includes('flow.google.com')) {
      return {
        connected: false,
        provider: 'flow',
        error: 'Active tab is not Google Flow (flow.google.com)',
      };
    }
    return {
      connected: true,
      provider: 'flow',
    };
  }

  async submitJob(input: GenerationJobInput): Promise<JobSubmissionResult> {
    const conn = await this.checkConnection();
    if (!conn.connected) {
      throw new SessionSignedOutError('flow');
    }
    return {
      jobId: input.id,
      status: 'generating',
      startedAt: Date.now(),
    };
  }

  async pollJobStatus(jobId: string): Promise<JobPollResult> {
    return {
      jobId,
      status: 'generating',
      progressPercent: 50,
    };
  }

  async abortJob(): Promise<boolean> {
    return true;
  }

  async extractMedia(jobId: string): Promise<MediaExtractResult> {
    return {
      jobId,
      mediaUrl: '',
      filename: `flow_${jobId}.mp4`,
      mimeType: 'video/mp4',
    };
  }
}
