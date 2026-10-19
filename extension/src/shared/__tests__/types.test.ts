import { describe, it, expect } from 'vitest';
import {
  DEFAULT_OMNI_PRESET,
  VideoPresetSchema,
  JobStatusSchema,
  ProviderSchema,
} from '../types.ts';

describe('Shared Contract & Types', () => {
  it('validates default Omni Flash preset against schema', () => {
    const parsed = VideoPresetSchema.parse(DEFAULT_OMNI_PRESET);
    expect(parsed.provider).toBe('flow');
    expect(parsed.model).toBe('omni-flash-1.1');
    expect(parsed.aspect).toBe('9:16');
    expect(parsed.duration).toBe('10s');
    expect(parsed.creditsPerOutput).toBe(15);
  });

  it('validates fail-safe terminal job statuses', () => {
    expect(JobStatusSchema.parse('needs-review')).toBe('needs-review');
    expect(JobStatusSchema.parse('policy-refusal')).toBe('policy-refusal');
    expect(JobStatusSchema.parse('completed')).toBe('completed');
    expect(() => JobStatusSchema.parse('invalid-status')).toThrow();
  });

  it('validates approved providers only', () => {
    expect(ProviderSchema.parse('flow')).toBe('flow');
    expect(ProviderSchema.parse('gemini')).toBe('gemini');
    expect(() => ProviderSchema.parse('unsupported')).toThrow();
  });
});
