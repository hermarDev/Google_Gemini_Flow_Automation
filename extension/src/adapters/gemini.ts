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

export class GeminiSiteAdapter implements SiteAdapter {
  readonly provider = 'gemini' as const;

  async getCapabilities(): Promise<ProviderCapabilities> {
    return {
      provider: 'gemini',
      supportedAspects: ['9:16', '16:9', '1:1'],
      supportedDurations: ['10s'],
      supportedModels: ['gemini-2.0-flash'],
      supportsImageToVideo: true,
      supportsCameraMotion: false,
      supportsNegativePrompt: false,
      maxBatchSize: 20,
    };
  }

  async checkConnection(): Promise<ConnectionStatus> {
    if (typeof window === 'undefined' || !window.location.hostname.includes('gemini.google.com')) {
      return {
        connected: false,
        provider: 'gemini',
        error: 'Active tab is not Google Gemini (gemini.google.com)',
      };
    }
    return {
      connected: true,
      provider: 'gemini',
    };
  }

  async submitJob(input: GenerationJobInput): Promise<JobSubmissionResult> {
    const conn = await this.checkConnection();
    if (!conn.connected) {
      throw new SessionSignedOutError('gemini');
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
      filename: `gemini_${jobId}.mp4`,
      mimeType: 'video/mp4',
    };
  }
}
