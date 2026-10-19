import { z } from 'zod';
import {
  JobStatusSchema,
  ProviderSchema,
  VideoAspectSchema,
  VideoDurationSchema,
} from '../shared/types.ts';

/* =========================================================================
   Message Types & Senders
   ========================================================================= */

export const MessageSenderRoleSchema = z.enum(['sidepanel', 'workspace', 'background', 'content']);
export type MessageSenderRole = z.infer<typeof MessageSenderRoleSchema>;

/* Payloads */

export const PingPayloadSchema = z.object({
  nonce: z.string().min(1),
});

export const PongPayloadSchema = z.object({
  nonce: z.string().min(1),
  activeTabs: z.number().int().nonnegative(),
});

export const CheckTabStatusPayloadSchema = z.object({
  tabId: z.number().int().optional(),
});

export const TabStatusResultPayloadSchema = z.object({
  tabId: z.number().int(),
  provider: ProviderSchema.nullable(),
  connected: z.boolean(),
  url: z.string().url().optional(),
  title: z.string().optional(),
});

export const SubmitJobPayloadSchema = z.object({
  jobId: z.string().min(1),
  provider: ProviderSchema,
  prompt: z.string().min(1),
  model: z.string().min(1),
  aspect: VideoAspectSchema,
  duration: VideoDurationSchema,
  estimatedCredits: z.number().int().nonnegative(),
});

export const JobStatusChangedPayloadSchema = z.object({
  jobId: z.string().min(1),
  status: JobStatusSchema,
  progressPercent: z.number().min(0).max(100).optional(),
  mediaUrl: z.string().optional(),
  error: z.string().optional(),
});

export const AbortJobPayloadSchema = z.object({
  jobId: z.string().min(1),
  reason: z.string().optional(),
});

/* Discriminated Union for Typed Messages */

export const ExtensionMessageSchema = z.discriminatedUnion('type', [
  z.object({
    messageId: z.string().min(1),
    correlationId: z.string().optional(),
    timestamp: z.number().int().positive(),
    sender: MessageSenderRoleSchema,
    type: z.literal('PING'),
    payload: PingPayloadSchema,
  }),
  z.object({
    messageId: z.string().min(1),
    correlationId: z.string().optional(),
    timestamp: z.number().int().positive(),
    sender: MessageSenderRoleSchema,
    type: z.literal('PONG'),
    payload: PongPayloadSchema,
  }),
  z.object({
    messageId: z.string().min(1),
    correlationId: z.string().optional(),
    timestamp: z.number().int().positive(),
    sender: MessageSenderRoleSchema,
    type: z.literal('CHECK_TAB_STATUS'),
    payload: CheckTabStatusPayloadSchema,
  }),
  z.object({
    messageId: z.string().min(1),
    correlationId: z.string().optional(),
    timestamp: z.number().int().positive(),
    sender: MessageSenderRoleSchema,
    type: z.literal('TAB_STATUS_RESULT'),
    payload: TabStatusResultPayloadSchema,
  }),
  z.object({
    messageId: z.string().min(1),
    correlationId: z.string().optional(),
    timestamp: z.number().int().positive(),
    sender: MessageSenderRoleSchema,
    type: z.literal('SUBMIT_JOB'),
    payload: SubmitJobPayloadSchema,
  }),
  z.object({
    messageId: z.string().min(1),
    correlationId: z.string().optional(),
    timestamp: z.number().int().positive(),
    sender: MessageSenderRoleSchema,
    type: z.literal('JOB_STATUS_CHANGED'),
    payload: JobStatusChangedPayloadSchema,
  }),
  z.object({
    messageId: z.string().min(1),
    correlationId: z.string().optional(),
    timestamp: z.number().int().positive(),
    sender: MessageSenderRoleSchema,
    type: z.literal('ABORT_JOB'),
    payload: AbortJobPayloadSchema,
  }),
]);

export type ExtensionMessage = z.infer<typeof ExtensionMessageSchema>;

/* =========================================================================
   Security & Origin Validation Guards
   ========================================================================= */

export interface SenderValidationResult {
  valid: boolean;
  reason?: string;
}

/**
 * Validates that an incoming Chrome runtime message originated from an authorized internal component.
 * Disallows untrusted web page origin spoofing or external extensions.
 */
export function validateMessageOrigin(
  sender: { id?: string; url?: string; origin?: string },
  expectedExtensionId?: string
): SenderValidationResult {
  // If Chrome runtime provides extension id, it must match
  if (expectedExtensionId && sender.id && sender.id !== expectedExtensionId) {
    return {
      valid: false,
      reason: `Unauthorized extension ID: ${sender.id}. Expected ${expectedExtensionId}.`,
    };
  }

  // If sender has an origin, it must either be the chrome-extension:// scheme or authorized Google domains
  if (sender.origin) {
    const isExtensionOrigin = sender.origin.startsWith('chrome-extension://');
    const isFlowOrigin = sender.origin === 'https://flow.google.com';
    const isGeminiOrigin = sender.origin === 'https://gemini.google.com';

    if (!isExtensionOrigin && !isFlowOrigin && !isGeminiOrigin) {
      return {
        valid: false,
        reason: `Untrusted sender origin: "${sender.origin}". Rejected by message protocol security guard.`,
      };
    }
  }

  // If sender has a URL, check domain whitelist
  if (sender.url) {
    const isExtensionUrl = sender.url.startsWith('chrome-extension://');
    const isFlowUrl = sender.url.startsWith('https://flow.google.com');
    const isGeminiUrl = sender.url.startsWith('https://gemini.google.com');

    if (!isExtensionUrl && !isFlowUrl && !isGeminiUrl) {
      return {
        valid: false,
        reason: `Untrusted sender URL: "${sender.url}". Rejected by message protocol security guard.`,
      };
    }
  }

  return { valid: true };
}

/**
 * Safe message parser: validates structure, rejects malformed payloads without side effects.
 */
export function parseExtensionMessage(raw: unknown): {
  success: boolean;
  message?: ExtensionMessage;
  error?: string;
} {
  const result = ExtensionMessageSchema.safeParse(raw);
  if (!result.success) {
    const errText = result.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`).join('; ');
    return {
      success: false,
      error: `Malformed extension message: ${errText}`,
    };
  }
  return {
    success: true,
    message: result.data,
  };
}

/**
 * Factory helper to construct valid message envelopes
 */
export function createMessage<T extends ExtensionMessage['type']>(
  type: T,
  sender: MessageSenderRole,
  payload: Extract<ExtensionMessage, { type: T }>['payload'],
  correlationId?: string
): Extract<ExtensionMessage, { type: T }> {
  return {
    messageId: `msg_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
    correlationId,
    timestamp: Date.now(),
    sender,
    type,
    payload,
  } as Extract<ExtensionMessage, { type: T }>;
}
