import { describe, it, expect, afterEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { SidePanel } from '../SidePanel.tsx';
import { createMessage, parseExtensionMessage } from '../../protocol/messages.ts';
import {
  clearStoredJobs,
  getStoredJobs,
  addMockJob,
  JOBS_STORAGE_KEY,
  updateJobStatus,
} from '../../shared/jobs.ts';

describe('SidePanel Shell Component', () => {
  let chromeBeforeTest: typeof globalThis.chrome;
  let originalGet: typeof chrome.storage.local.get;
  let delayedGet: ReturnType<typeof vi.fn> | undefined;
  let finishRead: ((value: Record<string, unknown>) => void) | undefined;
  let mockLastError: chrome.runtime.LastError | undefined;

  beforeEach(() => {
    chromeBeforeTest = globalThis.chrome;
    delayedGet = undefined;
    finishRead = undefined;
    mockLastError = undefined;
    vi.useRealTimers();

    if (!chromeBeforeTest) {
      const storage: Record<string, unknown> = {};
      const listeners = new Set<(changes: Record<string, chrome.storage.StorageChange>) => void>();
      const chromeMock = {
        storage: {
          local: {
            get: vi.fn(async (key: string) => ({ [key]: storage[key] })),
            set: vi.fn(async (values: Record<string, unknown>) => {
              const changes: Record<string, chrome.storage.StorageChange> = {};
              for (const [key, value] of Object.entries(values)) {
                changes[key] = { oldValue: storage[key], newValue: value };
                storage[key] = value;
              }
              listeners.forEach((listener) => listener(changes));
            }),
          },
          onChanged: {
            addListener: (
              listener: (changes: Record<string, chrome.storage.StorageChange>) => void
            ) => listeners.add(listener),
            removeListener: (
              listener: (changes: Record<string, chrome.storage.StorageChange>) => void
            ) => listeners.delete(listener),
          },
        },
        runtime: {
          get lastError() {
            return undefined;
          },
          getURL: (path: string) => `chrome-extension://test/${path}`,
        },
        tabs: {
          create: vi.fn(),
          query: vi.fn((_query: unknown, callback: (tabs: chrome.tabs.Tab[]) => void) =>
            callback([])
          ),
          onActivated: { addListener: vi.fn(), removeListener: vi.fn() },
          onUpdated: { addListener: vi.fn(), removeListener: vi.fn() },
        },
      };
      Object.defineProperty(globalThis, 'chrome', {
        configurable: true,
        value: chromeMock as unknown as typeof chrome,
      });
    }
    originalGet = globalThis.chrome.storage.local.get;
  });

  const installActiveGeminiTab = (reply?: unknown, runtimeError?: string) => {
    const baseChrome = globalThis.chrome;
    const listeners = new Set<(tabId: number) => void>();
    const runtime = { getURL: baseChrome.runtime.getURL };
    Object.defineProperty(runtime, 'lastError', { get: () => mockLastError });
    let queryTab = {
      id: 7,
      title: 'Gemini conversation',
      url: 'https://gemini.google.com/app/conversation-123',
    };
    const query = vi.fn((_query: unknown, callback: (tabs: chrome.tabs.Tab[]) => void) =>
      callback([queryTab as chrome.tabs.Tab])
    );
    const sendMessage = vi.fn(
      (_tabId: number, _message: unknown, callback: (response?: unknown) => void) => {
        queueMicrotask(() => {
          mockLastError = runtimeError ? { message: runtimeError } : undefined;
          callback(reply);
          mockLastError = undefined;
        });
      }
    );
    const tabEvent = {
      addListener: vi.fn((listener: (tabId: number) => void) => listeners.add(listener)),
      removeListener: vi.fn((listener: (tabId: number) => void) => listeners.delete(listener)),
    };
    Object.defineProperty(globalThis, 'chrome', {
      configurable: true,
      value: {
        ...baseChrome,
        runtime,
        tabs: {
          ...baseChrome.tabs,
          query,
          sendMessage,
          onActivated: tabEvent,
          onUpdated: tabEvent,
        },
      },
    });
    return {
      sendMessage,
      activateTab: (tabId: number) => {
        queryTab =
          tabId === 8
            ? { id: 8, title: 'Flow', url: 'https://flow.google.com/project/1' }
            : {
                id: 7,
                title: 'Gemini conversation',
                url: 'https://gemini.google.com/app/conversation-123',
              };
        listeners.forEach((listener) => listener(tabId));
      },
      query,
      tabEvent,
    };
  };

  afterEach(() => {
    if (delayedGet && globalThis.chrome?.storage?.local) {
      Object.defineProperty(globalThis.chrome.storage.local, 'get', {
        configurable: true,
        value: originalGet,
      });
    }
    Object.defineProperty(globalThis, 'chrome', {
      configurable: true,
      value: chromeBeforeTest ?? globalThis.chrome,
    });
  });

  it('renders connected Google Flow tab status', () => {
    render(
      <SidePanel
        initialConnection={{
          connected: true,
          provider: 'flow',
          title: 'Flow Canvas - Project Alpha',
          url: 'https://flow.google.com/project/alpha',
        }}
      />
    );

    expect(screen.getByText('Flow Canvas - Project Alpha')).toBeDefined();
    expect(screen.getByText('Omni Flash 720p / 10s / 9:16 Portrait')).toBeDefined();
    expect(screen.getByText('15 credits/item')).toBeDefined();
  });

  it('defaults disconnected and disables generation when no tab was detected', () => {
    render(<SidePanel />);

    expect(screen.getByText('No Active Google Session')).toBeDefined();
    expect((screen.getByRole('button', { name: /generate/i }) as HTMLButtonElement).disabled).toBe(
      true
    );
  });

  it('shows disconnected warning for a non-Google explicit tab', () => {
    render(
      <SidePanel
        initialConnection={{
          connected: false,
          provider: null,
        }}
      />
    );

    expect(screen.getByText('No Active Google Session')).toBeDefined();
    expect((screen.getByRole('button', { name: /generate/i }) as HTMLButtonElement).disabled).toBe(
      true
    );
  });

  it('tracks the active tab and accepts only the exact Google Flow/Gemini HTTPS hosts', async () => {
    const listeners = new Set<(tabId: number) => void>();
    const onActivated = {
      addListener: (listener: (tabId: number) => void) => listeners.add(listener),
      removeListener: (listener: (tabId: number) => void) => listeners.delete(listener),
    };
    const onUpdated = {
      addListener: (listener: (tabId: number) => void) => listeners.add(listener),
      removeListener: (listener: (tabId: number) => void) => listeners.delete(listener),
    };
    let currentUrl = 'https://flow.google.com/project/1';
    const query = (_options: unknown, callback: (tabs: chrome.tabs.Tab[]) => void) =>
      callback([{ id: 1, title: 'Flow', url: currentUrl } as chrome.tabs.Tab]);
    Object.defineProperty(globalThis, 'chrome', {
      configurable: true,
      value: { runtime: {}, tabs: { query, onActivated, onUpdated } },
    });

    try {
      render(<SidePanel />);
      await waitFor(() => expect(screen.getByText('Attached')).toBeDefined());
      fireEvent.change(screen.getByPlaceholderText(/describe camera movement/i), {
        target: { value: 'Host detection test' },
      });
      expect(
        (screen.getByRole('button', { name: /generate/i }) as HTMLButtonElement).disabled
      ).toBe(false);

      currentUrl = 'https://flow.google.com.attacker.invalid/project/1';
      act(() => listeners.forEach((listener) => listener(1)));
      await waitFor(() => expect(screen.getByText('Disconnected')).toBeDefined());
      expect(
        (screen.getByRole('button', { name: /generate/i }) as HTMLButtonElement).disabled
      ).toBe(true);
    } finally {
      // The suite-level cleanup restores the Chrome test double after each test.
    }
  });

  it('requires the Gemini content-script handshake before reporting a ready conversation', async () => {
    const reply = createMessage('TAB_STATUS_RESULT', 'content', {
      tabId: 7,
      provider: 'gemini',
      connected: true,
    });
    const { sendMessage } = installActiveGeminiTab(reply);

    render(<SidePanel />);

    await waitFor(() => expect(screen.getByText('Attached')).toBeDefined());
    expect(sendMessage).toHaveBeenCalledTimes(1);
    const [tabId, rawMessage] = sendMessage.mock.calls[0] ?? [];
    expect(tabId).toBe(7);
    const message = parseExtensionMessage(rawMessage);
    expect(message.message).toMatchObject({
      type: 'CHECK_TAB_STATUS',
      payload: { tabId: 7 },
    });
  });

  it('shows an actionable Gemini not-ready state and disables Generate when no composer is ready', async () => {
    const { sendMessage } = installActiveGeminiTab(
      createMessage('TAB_STATUS_RESULT', 'content', {
        tabId: 7,
        provider: 'gemini',
        connected: false,
      })
    );

    render(<SidePanel />);

    expect(await screen.findByText('Gemini conversation not ready')).toBeDefined();
    expect(
      screen.getByText(
        'Open a Gemini conversation, sign in if prompted, and wait for the prompt box to load. This readiness check does not submit a generation.'
      )
    ).toBeDefined();
    expect(sendMessage).toHaveBeenCalledTimes(1);
    expect((screen.getByRole('button', { name: /generate/i }) as HTMLButtonElement).disabled).toBe(
      true
    );
  });

  it.each([
    ['a missing content script response', undefined, undefined],
    ['a runtime messaging error', undefined, 'Could not establish connection'],
    [
      'a response for the wrong tab',
      createMessage('TAB_STATUS_RESULT', 'content', {
        tabId: 8,
        provider: 'gemini',
        connected: true,
      }),
      undefined,
    ],
  ])('fails closed on %s', async (_caseName, reply, runtimeError) => {
    installActiveGeminiTab(reply, runtimeError);

    render(<SidePanel />);

    expect(await screen.findByText('Gemini conversation not ready')).toBeDefined();
    expect((screen.getByRole('button', { name: /generate/i }) as HTMLButtonElement).disabled).toBe(
      true
    );
  });

  it('rechecks a loading Gemini tab until its composer becomes ready and continues monitoring', async () => {
    vi.useFakeTimers();
    const { sendMessage } = installActiveGeminiTab(
      createMessage('TAB_STATUS_RESULT', 'content', {
        tabId: 7,
        provider: 'gemini',
        connected: false,
      })
    );
    sendMessage.mockImplementationOnce((_tabId, _message, callback) => {
      queueMicrotask(() =>
        callback(
          createMessage('TAB_STATUS_RESULT', 'content', {
            tabId: 7,
            provider: 'gemini',
            connected: false,
          })
        )
      );
    });
    sendMessage.mockImplementationOnce((_tabId, _message, callback) => {
      queueMicrotask(() =>
        callback(
          createMessage('TAB_STATUS_RESULT', 'content', {
            tabId: 7,
            provider: 'gemini',
            connected: true,
          })
        )
      );
    });

    render(<SidePanel />);
    await act(async () => {
      await Promise.resolve();
    });
    expect(screen.getByText('Gemini conversation not ready')).toBeDefined();

    await act(async () => {
      await vi.advanceTimersByTimeAsync(2000);
    });
    expect(screen.getByText('Attached')).toBeDefined();
    const callsAfterReady = sendMessage.mock.calls.length;

    await act(async () => {
      await vi.advanceTimersByTimeAsync(4000);
    });
    expect(sendMessage.mock.calls.length).toBeGreaterThan(callsAfterReady);
    vi.useRealTimers();
  });

  it('rechecks readiness so a composer that disappears disables generation again', async () => {
    vi.useFakeTimers();
    const { sendMessage } = installActiveGeminiTab(
      createMessage('TAB_STATUS_RESULT', 'content', {
        tabId: 7,
        provider: 'gemini',
        connected: true,
      })
    );
    sendMessage.mockImplementationOnce((_tabId, _message, callback) => {
      queueMicrotask(() =>
        callback(
          createMessage('TAB_STATUS_RESULT', 'content', {
            tabId: 7,
            provider: 'gemini',
            connected: true,
          })
        )
      );
    });
    sendMessage.mockImplementationOnce((_tabId, _message, callback) => {
      queueMicrotask(() =>
        callback(
          createMessage('TAB_STATUS_RESULT', 'content', {
            tabId: 7,
            provider: 'gemini',
            connected: false,
          })
        )
      );
    });

    render(<SidePanel />);
    await act(async () => {
      await Promise.resolve();
    });
    expect(screen.getByText('Attached')).toBeDefined();

    await act(async () => {
      await vi.advanceTimersByTimeAsync(2000);
    });
    expect(screen.getByText('Gemini conversation not ready')).toBeDefined();
    expect((screen.getByRole('button', { name: /generate/i }) as HTMLButtonElement).disabled).toBe(
      true
    );
    vi.useRealTimers();
  });

  it('ignores a Gemini readiness reply after another tab becomes active', async () => {
    let replyReady: ((response?: unknown) => void) | undefined;
    const { sendMessage, activateTab, query } = installActiveGeminiTab(undefined);
    let finishInitialQuery: ((tabs: chrome.tabs.Tab[]) => void) | undefined;
    query.mockImplementationOnce((_query, callback) => {
      finishInitialQuery = callback;
    });
    sendMessage.mockImplementation((_tabId, _message, callback) => {
      replyReady = callback as (response?: unknown) => void;
    });

    render(<SidePanel />);
    await waitFor(() => expect(query).toHaveBeenCalledTimes(1));
    act(() =>
      finishInitialQuery?.([
        {
          id: 7,
          title: 'Gemini conversation',
          url: 'https://gemini.google.com/app/conversation-123',
        } as chrome.tabs.Tab,
      ])
    );
    await waitFor(() => expect(sendMessage).toHaveBeenCalledTimes(1));

    act(() => activateTab(8));
    await waitFor(() => expect(screen.getByText('Flow')).toBeDefined());

    act(() =>
      replyReady?.(
        createMessage('TAB_STATUS_RESULT', 'content', {
          tabId: 7,
          provider: 'gemini',
          connected: true,
        })
      )
    );

    expect(screen.getByText('Flow')).toBeDefined();
    expect(screen.getByText('Attached')).toBeDefined();
  });

  it('queues a mock job with valid prompt without claiming live rendering', async () => {
    render(
      <SidePanel
        initialConnection={{
          connected: true,
          provider: 'flow',
          title: 'Flow Canvas',
          url: 'https://flow.google.com/project/1',
        }}
      />
    );

    fireEvent.change(screen.getByPlaceholderText(/describe camera movement/i), {
      target: { value: 'Cinematic rain on glass' },
    });
    const generateBtn = screen.getByRole('button', { name: /generate/i });
    expect((generateBtn as HTMLButtonElement).disabled).toBe(false);
    fireEvent.click(generateBtn);

    await screen.findByText(/no Google job was submitted/i);
    expect(screen.getByText('Mock Job Simulation')).toBeDefined();
    expect(
      screen.getByText(/progress and timing shown here are local test simulation only/i)
    ).toBeDefined();
    expect(screen.queryByText(/1 \/ 1 Complete/i)).toBeNull();
    expect(screen.queryByText(/Elapsed:/i)).toBeNull();
    expect(screen.getByRole('button', { name: /pause/i })).toBeDefined();
    expect(screen.getByRole('button', { name: /cancel/i })).toBeDefined();
    await screen.findAllByText('Cinematic rain on glass');
  });

  it('does not expose pause or cancel controls for jobs owned by another context', async () => {
    await clearStoredJobs();
    render(<SidePanel initialConnection={{ connected: false, provider: null }} />);
    await waitFor(() => expect(screen.queryByText(/Persistent Jobs/)).toBeNull());

    const foreignJob = await addMockJob({ prompt: 'Foreign context job' });
    await screen.findByText('Foreign context job');
    expect(screen.queryByRole('button', { name: /Pause Foreign context job/i })).toBeNull();
    expect(screen.queryByRole('button', { name: /Cancel Foreign context job/i })).toBeNull();
    expect((await getStoredJobs()).find((job) => job.id === foreignJob.id)?.status).toBe('pending');
  });

  it('preserves terminal failure when a stale progress update arrives later', async () => {
    await clearStoredJobs();
    const job = await addMockJob({ prompt: 'Late progress after cancellation' });
    await updateJobStatus(job.id, 'submitting', {}, { expectedStatuses: ['pending'] });
    await updateJobStatus(
      job.id,
      'failed',
      { errorMessage: 'Cancelled by user.' },
      { expectedStatuses: ['pending', 'submitting', 'generating'] }
    );

    const staleProgress = await updateJobStatus(
      job.id,
      'generating',
      { progressPercent: 50 },
      { expectedStatuses: ['submitting'] }
    );
    const cancelled = (await getStoredJobs()).find((item) => item.id === job.id);
    expect(staleProgress?.status).toBe('failed');
    expect(cancelled?.status).toBe('failed');
    expect(cancelled?.errorMessage).toBe('Cancelled by user.');
  });

  it('marks the job failed when cancelling after execution has started', async () => {
    await clearStoredJobs();
    render(
      <SidePanel
        initialConnection={{
          connected: true,
          provider: 'flow',
          title: 'Flow Canvas',
          url: 'https://flow.google.com/project/1',
        }}
      />
    );

    fireEvent.change(screen.getByPlaceholderText(/describe camera movement/i), {
      target: { value: 'Cancel after submit stage' },
    });
    fireEvent.click(screen.getByRole('button', { name: /generate/i }));
    await waitFor(async () => {
      const [job] = await getStoredJobs();
      expect(job?.status).toBe('submitting');
    });

    fireEvent.click(screen.getByRole('button', { name: /^cancel$/i }));
    await waitFor(async () => {
      const [job] = await getStoredJobs();
      expect(job?.status).toBe('failed');
      expect(job?.errorMessage).toContain('Cancelled by user');
    });
  });

  it('aborts execution before storage reads and persists cancellation despite delayed reads', async () => {
    await clearStoredJobs();
    render(
      <SidePanel
        initialConnection={{
          connected: true,
          provider: 'flow',
          title: 'Flow Canvas',
          url: 'https://flow.google.com/project/1',
        }}
      />
    );

    fireEvent.change(screen.getByPlaceholderText(/describe camera movement/i), {
      target: { value: 'Delayed cancellation read' },
    });
    fireEvent.click(screen.getByRole('button', { name: /generate/i }));
    await screen.findByText('Delayed cancellation read');

    const originalGetForTest = chromeBeforeTest?.storage?.local?.get ?? originalGet;
    let blockNextRead = false;
    const controlledGet = vi.fn((key: string) => {
      if (!blockNextRead) return originalGetForTest(key);
      blockNextRead = false;
      return new Promise<Record<string, unknown>>((resolve) => {
        finishRead = resolve;
      });
    });
    delayedGet = controlledGet;
    Object.defineProperty(globalThis.chrome.storage.local, 'get', {
      configurable: true,
      value: controlledGet,
    });

    try {
      blockNextRead = true;
      fireEvent.click(screen.getByRole('button', { name: /^cancel$/i }));
      await waitFor(() => expect(controlledGet).toHaveBeenCalledTimes(1));
      const stored = await originalGetForTest(JOBS_STORAGE_KEY);
      finishRead?.({ [JOBS_STORAGE_KEY]: stored[JOBS_STORAGE_KEY] });
      await waitFor(async () => {
        const jobs = await getStoredJobs();
        expect(jobs[0]?.status).toBe('failed');
        expect(jobs[0]?.errorMessage).toContain('Cancelled by user');
      });
      await waitFor(() => expect(screen.queryByText('Mock Job Simulation')).toBeNull());
    } finally {
      Object.defineProperty(globalThis.chrome.storage.local, 'get', {
        configurable: true,
        value: originalGet,
      });
    }
  });

  it('pause/resume and cancel controls reflect per-job queue state', async () => {
    await clearStoredJobs();
    render(
      <SidePanel
        initialConnection={{
          connected: true,
          provider: 'flow',
          title: 'Flow Canvas',
          url: 'https://flow.google.com/project/1',
        }}
      />
    );

    fireEvent.change(screen.getByPlaceholderText(/describe camera movement/i), {
      target: { value: 'Cancelable side panel job' },
    });
    fireEvent.click(screen.getByRole('button', { name: /generate/i }));
    await screen.findByText('Cancelable side panel job');
    fireEvent.click(await screen.findByRole('button', { name: 'Pause Cancelable side panel job' }));
    expect(
      await screen.findByRole('button', { name: 'Resume Cancelable side panel job' })
    ).toBeDefined();

    fireEvent.click(screen.getByRole('button', { name: 'Resume Cancelable side panel job' }));
    expect(
      await screen.findByRole('button', { name: 'Pause Cancelable side panel job' })
    ).toBeDefined();

    fireEvent.click(screen.getByRole('button', { name: 'Cancel Cancelable side panel job' }));
    await screen.findByRole('button', { name: /generate/i });
    await waitFor(async () => {
      const jobs = await getStoredJobs();
      expect(jobs[0]?.status).toBe('failed');
      expect(jobs[0]?.errorMessage).toContain('Cancelled by user');
    });
  });
});
