import { z } from 'zod';
import {
  Provider,
  JobStatus,
  VideoAspect,
  VideoDuration,
  ProviderSchema,
  VideoAspectSchema,
  VideoDurationSchema,
} from '../shared/types.ts';

/* =========================================================================
   Typed Adapter Error Hierarchy
   ========================================================================= */

export type AdapterErrorCode =
  | 'SELECTOR_NOT_FOUND'
  | 'MODEL_UNAVAILABLE'
  | 'SESSION_SIGNED_OUT'
  | 'MISSING_TAB'
  | 'CREDIT_DEPLETED'
  | 'POLICY_REFUSAL'
  | 'RATE_LIMITED'
  | 'AMBIGUOUS_SUBMISSION'
  | 'NETWORK_ERROR'
  | 'UNKNOWN_ERROR';

export class AdapterError extends Error {
  readonly code: AdapterErrorCode;
  readonly recoverable: boolean;
  readonly requiresReview: boolean;

  constructor(
    message: string,
    code: AdapterErrorCode,
    recoverable = false,
    requiresReview = false
  ) {
    super(message);
    this.name = 'AdapterError';
    this.code = code;
    this.recoverable = recoverable;
    this.requiresReview = requiresReview;
  }
}

export class SelectorNotFoundError extends AdapterError {
  constructor(selector: string, context: string) {
    super(
      `DOM selector "${selector}" not found during ${context}. Site layout may have changed.`,
      'SELECTOR_NOT_FOUND',
      false,
      true
    );
  }
}

export class ModelUnavailableError extends AdapterError {
  constructor(model: string, provider: Provider) {
    super(
      `Model "${model}" is currently unavailable or not enabled on ${provider}.`,
      'MODEL_UNAVAILABLE',
      false,
      false
    );
  }
}

export class MissingTabError extends AdapterError {
  constructor(provider: Provider) {
    super(
      `No active tab is available for ${provider}. Submission stopped safely.`,
      'MISSING_TAB',
      true,
      false
    );
  }
}

export class SessionSignedOutError extends AdapterError {
  constructor(provider: Provider) {
    super(
      `No active authenticated Google session found for ${provider}. Please sign in.`,
      'SESSION_SIGNED_OUT',
      true,
      false
    );
  }
}

export class CreditDepletedError extends AdapterError {
  constructor(currentBalance: number, requiredCredits: number) {
    super(
      `Insufficient Google Flow credits: balance is ${currentBalance}, but job requires ${requiredCredits}.`,
      'CREDIT_DEPLETED',
      false,
      false
    );
  }
}

export class PolicyRefusalError extends AdapterError {
  readonly refusalReason?: string;

  constructor(message: string, reason?: string) {
    super(message, 'POLICY_REFUSAL', false, false);
    this.refusalReason = reason;
  }
}

export class AmbiguousSubmissionError extends AdapterError {
  constructor(message: string) {
    super(
      message,
      'AMBIGUOUS_SUBMISSION',
      false,
      true // Must transition job to 'needs-review' to prevent blind credit-wasting replay!
    );
  }
}

/* =========================================================================
   Adapter Data Contracts & Schemas
   ========================================================================= */

export const ProviderCapabilitiesSchema = z.object({
  provider: ProviderSchema,
  supportedAspects: z.array(VideoAspectSchema),
  supportedDurations: z.array(VideoDurationSchema),
  supportedModels: z.array(z.string()),
  supportsImageToVideo: z.boolean(),
  supportsCameraMotion: z.boolean(),
  supportsNegativePrompt: z.boolean(),
  maxBatchSize: z.number().int().positive(),
});
export type ProviderCapabilities = z.infer<typeof ProviderCapabilitiesSchema>;

export const ConnectionStatusSchema = z.object({
  connected: boolean(),
  provider: ProviderSchema,
  userEmail: z.string().optional(),
  creditBalance: z.number().int().nonnegative().optional(),
  error: z.string().optional(),
});
function boolean() {
  return z.boolean();
}
export type ConnectionStatus = z.infer<typeof ConnectionStatusSchema>;

export interface GenerationJobInput {
  id: string;
  prompt: string;
  model: string;
  aspect: VideoAspect;
  duration: VideoDuration;
  referenceImageBase64?: string;
  estimatedCredits: number;
}

export interface JobSubmissionResult {
  jobId: string;
  status: JobStatus;
  startedAt: number;
}

export interface JobPollResult {
  jobId: string;
  status: JobStatus;
  progressPercent?: number;
  mediaUrl?: string;
  error?: AdapterError;
}

export interface MediaExtractResult {
  jobId: string;
  mediaUrl: string;
  filename: string;
  mimeType: string;
}

/* =========================================================================
   SiteAdapter Polymorphic Interface
   ========================================================================= */

export interface SiteAdapter {
  readonly provider: Provider;
  getCapabilities(): Promise<ProviderCapabilities>;
  checkConnection(): Promise<ConnectionStatus>;
  submitJob(input: GenerationJobInput): Promise<JobSubmissionResult>;
  pollJobStatus(jobId: string): Promise<JobPollResult>;
  abortJob(jobId: string): Promise<boolean>;
  extractMedia(jobId: string): Promise<MediaExtractResult>;
}
