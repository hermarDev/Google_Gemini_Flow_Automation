// Content scripts are classic scripts, so keep this protocol subset self-contained.
const parseExtensionMessage = (raw: unknown) => {
  if (!raw || typeof raw !== 'object') return { success: false as const };
  const message = raw as {
    messageId?: string;
    timestamp?: number;
    sender?: string;
    type?: string;
    payload?: { tabId?: number } | null;
  };
  return typeof message.messageId === 'string' &&
    message.messageId.length > 0 &&
    Number.isInteger(message.timestamp) &&
    Number(message.timestamp) > 0 &&
    ['sidepanel', 'workspace', 'background', 'content'].includes(message.sender ?? '') &&
    message.type === 'CHECK_TAB_STATUS' &&
    message.payload !== undefined &&
    message.payload !== null &&
    typeof message.payload === 'object' &&
    (message.payload.tabId === undefined || Number.isInteger(message.payload.tabId))
    ? {
        success: true as const,
        message: message as typeof message & {
          type: 'CHECK_TAB_STATUS';
          payload: { tabId?: number };
        },
      }
    : { success: false as const };
};

const createMessage = (
  type: 'TAB_STATUS_RESULT',
  sender: 'content',
  payload: { tabId: number; provider: 'gemini'; connected: boolean }
) => ({
  messageId: `msg_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
  timestamp: Date.now(),
  sender,
  type,
  payload,
});

export function isGeminiChat(
  hostname = typeof window === 'undefined' ? '' : window.location.hostname,
  pathname = typeof window === 'undefined' ? '' : window.location.pathname
): boolean {
  const isConversationRoute = /^\/(?:u\/\d+\/)?app\/[^/]+\/?$/.test(pathname);
  return hostname === 'gemini.google.com' && isConversationRoute;
}

export function isGeminiReady(hostname: string, pathname: string, page: Document): boolean {
  const editor = page.querySelector<HTMLElement>(
    'rich-textarea .ql-editor[contenteditable="true"]'
  );
  const isVisible = (element: HTMLElement): boolean => {
    if (!element.getClientRects().length || !page.defaultView) return false;
    for (let current: HTMLElement | null = element; current; current = current.parentElement) {
      const style = page.defaultView.getComputedStyle(current);
      if (
        style.display === 'none' ||
        style.visibility === 'hidden' ||
        style.visibility === 'collapse' ||
        Number(style.opacity) === 0
      ) {
        return false;
      }
    }
    return true;
  };
  const signInPrompt = [...page.querySelectorAll<HTMLElement>('button, a, [role="button"]')].some(
    (element) =>
      [element.getAttribute('aria-label'), element.textContent].some((label) =>
        /^sign in(?:\b.*)?$/i.test(label?.trim() ?? '')
      ) && isVisible(element)
  );
  return isGeminiChat(hostname, pathname) && !signInPrompt && editor !== null && isVisible(editor);
}

interface GeminiRuntime {
  id?: string;
  onMessage: {
    addListener: (
      listener: (
        message: unknown,
        sender: { id?: string; tab?: { id?: number } },
        sendResponse: (response: unknown) => void
      ) => void
    ) => void;
  };
}

interface GeminiStatusEnvironment {
  runtime: GeminiRuntime;
  getPage: () => Document;
  getLocation: () => { hostname: string; pathname: string };
}

export function registerGeminiStatusListener(
  environment: GeminiStatusEnvironment = {
    runtime: chrome.runtime,
    getPage: () => document,
    getLocation: () => ({
      hostname: window.location.hostname,
      pathname: window.location.pathname,
    }),
  }
): void {
  environment.runtime.onMessage.addListener((rawMessage, sender, sendResponse) => {
    const parsed = parseExtensionMessage(rawMessage);
    const tabId =
      parsed.success && parsed.message?.type === 'CHECK_TAB_STATUS'
        ? parsed.message.payload.tabId
        : undefined;
    if (
      !parsed.success ||
      !parsed.message ||
      parsed.message.type !== 'CHECK_TAB_STATUS' ||
      sender.id !== environment.runtime.id ||
      typeof tabId !== 'number' ||
      (sender.tab?.id !== undefined && tabId !== sender.tab.id)
    ) {
      return;
    }

    const location = environment.getLocation();
    const connected = isGeminiReady(location.hostname, location.pathname, environment.getPage());
    sendResponse(
      createMessage('TAB_STATUS_RESULT', 'content', {
        tabId,
        provider: 'gemini',
        connected,
      })
    );
  });
}

if (typeof chrome !== 'undefined' && chrome.runtime?.onMessage) {
  registerGeminiStatusListener();
}
