import { z } from 'zod';

export const ProviderSchema = z.enum(['flow', 'gemini']);
export type Provider = z.infer<typeof ProviderSchema>;

export const MediaKindSchema = z.enum(['video', 'image']);
export type MediaKind = z.infer<typeof MediaKindSchema>;

export const JobStatusSchema = z.enum([
  'draft',
  'ready',
  'pending',
  'submitting',
  'generating',
  'verifying',
  'downloading',
  'completed',
  'needs-review',
  'policy-refusal',
  'failed',
]);
export type JobStatus = z.infer<typeof JobStatusSchema>;

export const VideoAspectSchema = z.enum(['9:16', '16:9', '1:1']);
export type VideoAspect = z.infer<typeof VideoAspectSchema>;

export const VideoDurationSchema = z.enum(['4s', '6s', '8s', '10s']);
export type VideoDuration = z.infer<typeof VideoDurationSchema>;

export const VideoPresetSchema = z.object({
  id: z.string(),
  name: z.string(),
  provider: ProviderSchema,
  model: z.string(),
  aspect: VideoAspectSchema,
  duration: VideoDurationSchema,
  resolution: z.string(),
  creditsPerOutput: z.number().int().nonnegative(),
});
export type VideoPreset = z.infer<typeof VideoPresetSchema>;

export const DEFAULT_OMNI_PRESET: VideoPreset = {
  id: 'omni-flash-720p-10s-9-16',
  name: 'Omni Flash 720p / 10s / 9:16 Portrait',
  provider: 'flow',
  model: 'omni-flash-1.1',
  aspect: '9:16',
  duration: '10s',
  resolution: '720p',
  creditsPerOutput: 15,
};
