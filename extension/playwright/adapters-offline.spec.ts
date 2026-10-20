import { expect, test, isAllowedOfflineRequest } from './fixtures.ts';
import { isFlowCanvas } from '../src/content/flow.ts';
import { isGeminiChat } from '../src/content/gemini.ts';
import { FlowSiteAdapter } from '../src/adapters/flow.ts';
import { GeminiSiteAdapter } from '../src/adapters/gemini.ts';
import { MockSiteAdapter } from '../src/adapters/mock.ts';
import {
  createMessage,
  parseExtensionMessage,
  validateMessageOrigin,
} from '../src/protocol/messages.ts';
import {
  AmbiguousSubmissionError,
  GenerationJobInput,
  PolicyRefusalError,
} from '../src/adapters/types.ts';

const mockJobInput: GenerationJobInput = {
  id: 'job_offline_smoke_1',
  prompt: 'Offline deterministic browser fixture',
  model: 'veo-3.1-quality',
  aspect: '16:9',
  duration: '10s',
  estimatedCredits: 100,
};

const mockSubmit = createMessage('SUBMIT_JOB', 'workspace', {
  jobId: 'job_offline_smoke_1',
  provider: 'flow',
  prompt: 'Offline deterministic browser fixture',
  model: 'veo-3.1-quality',
  aspect: '16:9',
  duration: '10s',
  estimatedCredits: 100,
});

test('content script host guards reject unrelated and lookalike domains without Google access', async ({
  page,
}) => {
  await page.goto('data:text/html,<title>Offline adapter fixture</title>');
  const results = {
    flow: isFlowCanvas('flow.google.com'),
    gemini: isGeminiChat('gemini.google.com'),
    flowLookalike: isFlowCanvas('flow.google.com.attacker.invalid'),
    geminiLookalike: isGeminiChat('gemini.google.com.attacker.invalid'),
  };
  expect(results).toEqual({
    flow: true,
    gemini: true,
    flowLookalike: false,
    geminiLookalike: false,
  });
});

test('offline fixture rejects loopback origins other than the exact preview endpoint', async ({
  page,
}) => {
  await page.goto('data:text/html,<title>Offline network policy fixture</title>');
  const acceptedOrigins = {
    expectedPreview: isAllowedOfflineRequest('http://127.0.0.1:4173/src/workspace/index.html'),
    alternatePort: isAllowedOfflineRequest('http://127.0.0.1:4174/'),
    alternateScheme: isAllowedOfflineRequest('https://127.0.0.1:4173/'),
    localhostAlias: isAllowedOfflineRequest('http://localhost:4173/'),
    externalHost: isAllowedOfflineRequest('https://example.invalid/'),
    dataUrl: isAllowedOfflineRequest('data:text/html,<title>Offline</title>'),
  };

  expect(acceptedOrigins).toEqual({
    expectedPreview: true,
    alternatePort: false,
    alternateScheme: false,
    localhostAlias: false,
    externalHost: false,
    dataUrl: true,
  });
});

test('offline fixture actively aborts unapproved network fetch requests', async ({ page }) => {
  await page.goto('data:text/html,<title>Offline network policy active abort fixture</title>');
  const fetchThrew = await page.evaluate(async () => {
    try {
      await fetch('https://example.invalid/');
      return false;
    } catch {
      return true;
    }
  });
  expect(fetchThrew).toBe(true);
});

test('production message parser rejects malformed messages and validates allowed origins', () => {
  const malformed = { type: 'SUBMIT_JOB', payload: {} };
  expect(parseExtensionMessage(malformed).success).toBe(false);
  expect(validateMessageOrigin({ origin: 'https://evil.invalid' }).valid).toBe(false);
  expect(validateMessageOrigin({ origin: 'https://flow.google.com' }).valid).toBe(true);
  expect(validateMessageOrigin({ origin: 'https://gemini.google.com' }).valid).toBe(true);
});

test('adapter connection reports false on the offline unapproved-host fixture', async ({
  page,
}) => {
  await page.goto('data:text/html,<title>Offline unrelated host fixture</title>');
  await expect(new FlowSiteAdapter().checkConnection()).resolves.toMatchObject({
    connected: false,
  });
  await expect(new GeminiSiteAdapter().checkConnection()).resolves.toMatchObject({
    connected: false,
  });
  const inPageHostRejection = await page.evaluate(() => {
    return {
      flowMatches: window.location.hostname === 'flow.google.com',
      geminiMatches: window.location.hostname === 'gemini.google.com',
    };
  });
  expect(inPageHostRejection).toEqual({ flowMatches: false, geminiMatches: false });
  expect(isFlowCanvas('flow.google.com.evil.invalid')).toBe(false);
  expect(isGeminiChat('gemini.google.com.evil.invalid')).toBe(false);
  expect(isFlowCanvas('notflow.google.com')).toBe(false);
  expect(isGeminiChat('notgemini.google.com')).toBe(false);
});

test('mock adapter failures preserve review and refusal statuses', async () => {
  const selectorAdapter = new MockSiteAdapter({ simulateFailureMode: 'selector-not-found' });
  const unavailableAdapter = new MockSiteAdapter({ simulateFailureMode: 'model-unavailable' });
  const signedOutAdapter = new MockSiteAdapter({ simulateFailureMode: 'signed-out' });
  const lostTabAdapter = new MockSiteAdapter({ simulateFailureMode: 'lost-tab' });
  const ambiguousAdapter = new MockSiteAdapter({ simulateFailureMode: 'ambiguous-submission' });

  await expect(selectorAdapter.submitJob(mockJobInput)).rejects.toMatchObject({
    code: 'SELECTOR_NOT_FOUND',
    requiresReview: true,
  });
  await expect(unavailableAdapter.submitJob(mockJobInput)).rejects.toMatchObject({
    code: 'MODEL_UNAVAILABLE',
  });
  await expect(signedOutAdapter.submitJob(mockJobInput)).rejects.toMatchObject({
    code: 'SESSION_SIGNED_OUT',
  });
  await expect(lostTabAdapter.submitJob(mockJobInput)).rejects.toMatchObject({
    code: 'MISSING_TAB',
  });
  await expect(ambiguousAdapter.submitJob(mockJobInput)).rejects.toMatchObject({
    code: 'AMBIGUOUS_SUBMISSION',
    requiresReview: true,
  });

  const policyAdapter = new MockSiteAdapter({ simulateFailureMode: 'policy-refusal' });
  await policyAdapter.submitJob(mockJobInput);
  const policyResult = await policyAdapter.pollJobStatus(mockJobInput.id);
  expect(policyResult.status).toBe('policy-refusal');
  expect(policyResult.error).toBeInstanceOf(PolicyRefusalError);

  const ambiguous = new AmbiguousSubmissionError('Submission outcome is unknown');
  expect(ambiguous.requiresReview).toBe(true);
});

test('mock SUBMIT_JOB passes the production message schema', () => {
  const parsed = parseExtensionMessage(mockSubmit);
  expect(parsed.success).toBe(true);
  expect(parsed.message?.type).toBe('SUBMIT_JOB');
  expect(mockSubmit.payload.estimatedCredits).toBe(100);
});

test('malformed SUBMIT_JOB is rejected before any provider action', () => {
  const parsed = parseExtensionMessage({ type: 'SUBMIT_JOB', payload: {} });
  const providerActions = parsed.success && parsed.message?.type === 'SUBMIT_JOB' ? ['submit'] : [];
  expect({ valid: parsed.success, providerActions }).toEqual({ valid: false, providerActions: [] });
});

test('synthetic SUBMIT_JOB fixture contains no account data and estimates credits only', () => {
  expect(mockSubmit.payload.estimatedCredits).toBeGreaterThan(0);
  expect(JSON.stringify(mockSubmit)).not.toMatch(/email|cookie|token|password/i);
  expect(mockSubmit.payload.estimatedCredits).toBe(100);
});
