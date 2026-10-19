import { describe, it, expect, vi } from 'vitest';
import {
  createMessage,
  parseExtensionMessage,
  validateMessageOrigin,
  MessageRouter,
} from '../index.ts';

describe('Extension Message Protocol & Security Guards (CORE-017)', () => {
  describe('Message Envelope Creation & Parsing', () => {
    it('creates a valid PING message envelope', () => {
      const msg = createMessage('PING', 'sidepanel', { nonce: 'nonce-123' }, 'corr-456');

      expect(msg.type).toBe('PING');
      expect(msg.sender).toBe('sidepanel');
      expect(msg.payload.nonce).toBe('nonce-123');
      expect(msg.correlationId).toBe('corr-456');
      expect(msg.timestamp).toBeGreaterThan(0);
      expect(msg.messageId).toContain('msg_');
    });

    it('successfully parses valid SUBMIT_JOB message', () => {
      const msg = createMessage('SUBMIT_JOB', 'workspace', {
        jobId: 'job-999',
        provider: 'flow',
        prompt: 'Volcanic eruption aerial view',
        model: 'veo-3.1-quality',
        aspect: '16:9',
        duration: '10s',
        estimatedCredits: 100,
      });

      const parsed = parseExtensionMessage(msg);
      expect(parsed.success).toBe(true);
      expect(parsed.message?.type).toBe('SUBMIT_JOB');
    });

    it('rejects unknown message types safely without throwing', () => {
      const badMessage = {
        messageId: 'msg_1',
        timestamp: Date.now(),
        sender: 'sidepanel',
        type: 'UNAUTHORIZED_INJECTION',
        payload: {},
      };

      const parsed = parseExtensionMessage(badMessage);
      expect(parsed.success).toBe(false);
      expect(parsed.error).toContain('Malformed extension message');
    });

    it('rejects message with missing required payload fields', () => {
      const incompleteMessage = {
        messageId: 'msg_2',
        timestamp: Date.now(),
        sender: 'sidepanel',
        type: 'SUBMIT_JOB',
        payload: {
          jobId: 'job-1',
          // missing prompt, model, etc.
        },
      };

      const parsed = parseExtensionMessage(incompleteMessage);
      expect(parsed.success).toBe(false);
      expect(parsed.error).toContain('Malformed extension message');
    });
  });

  describe('Origin Validation & Security Guards', () => {
    it('accepts messages from internal chrome-extension:// origins', () => {
      const res = validateMessageOrigin({ origin: 'chrome-extension://abcdefghijklmnop' });
      expect(res.valid).toBe(true);
    });

    it('accepts messages from whitelisted Google domains (flow.google.com and gemini.google.com)', () => {
      const flowRes = validateMessageOrigin({ origin: 'https://flow.google.com' });
      expect(flowRes.valid).toBe(true);

      const geminiRes = validateMessageOrigin({ origin: 'https://gemini.google.com' });
      expect(geminiRes.valid).toBe(true);
    });

    it('rejects messages from untrusted web origins', () => {
      const res = validateMessageOrigin({ origin: 'https://evil-attacker.com' });
      expect(res.valid).toBe(false);
      expect(res.reason).toContain('Untrusted sender origin');
    });

    it('rejects messages when extension ID does not match expected ID', () => {
      const res = validateMessageOrigin({ id: 'wrong-id' }, 'correct-extension-id');
      expect(res.valid).toBe(false);
      expect(res.reason).toContain('Unauthorized extension ID');
    });
  });

  describe('MessageRouter Dispatching', () => {
    it('dispatches valid message to registered handler', async () => {
      const router = new MessageRouter();
      const handler = vi.fn().mockResolvedValue({ status: 'pong-received' });

      router.register('PING', handler);

      const pingMsg = createMessage('PING', 'sidepanel', { nonce: 'test-nonce' });
      const response = await router.dispatch(pingMsg, {
        origin: 'chrome-extension://test-extension',
      });

      expect(response.handled).toBe(true);
      expect(response.result).toEqual({ status: 'pong-received' });
      expect(handler).toHaveBeenCalledTimes(1);
    });

    it('blocks dispatch and executes zero handlers when origin is untrusted', async () => {
      const router = new MessageRouter();
      const handler = vi.fn();

      router.register('SUBMIT_JOB', handler);

      const jobMsg = createMessage('SUBMIT_JOB', 'content', {
        jobId: 'job-1',
        provider: 'flow',
        prompt: 'test',
        model: 'veo',
        aspect: '9:16',
        duration: '10s',
        estimatedCredits: 15,
      });

      const response = await router.dispatch(jobMsg, { origin: 'https://malicious.com' });

      expect(response.handled).toBe(false);
      expect(response.error).toContain('Untrusted sender origin');
      expect(handler).not.toHaveBeenCalled();
    });

    it('blocks dispatch when message payload is malformed', async () => {
      const router = new MessageRouter();
      const handler = vi.fn();

      router.register('PING', handler);

      const malformed = { type: 'PING', payload: {} }; // missing messageId, sender, etc.
      const response = await router.dispatch(malformed, {
        origin: 'chrome-extension://test-extension',
      });

      expect(response.handled).toBe(false);
      expect(response.error).toContain('Malformed extension message');
      expect(handler).not.toHaveBeenCalled();
    });
  });
});
