import { describe, expect, it, vi } from 'vitest';
import { isGeminiChat, isGeminiReady, registerGeminiStatusListener } from '../gemini.ts';
import { createMessage, parseExtensionMessage } from '../../protocol/messages.ts';

describe('Gemini conversation route guard', () => {
  it.each([
    { hostname: 'gemini.google.com', pathname: '/app', expected: false },
    { hostname: 'gemini.google.com', pathname: '/app/conversation-123', expected: true },
    { hostname: 'gemini.google.com', pathname: '/u/0/app/conversation-123', expected: true },
    {
      hostname: 'gemini.google.com.attacker.invalid',
      pathname: '/app/conversation-123',
      expected: false,
    },
    { hostname: 'example.invalid', pathname: '/app/conversation-123', expected: false },
  ])('classifies $hostname$pathname', ({ hostname, pathname, expected }) => {
    expect(isGeminiChat(hostname, pathname)).toBe(expected);
  });
});

function pageWithComposer(): Document {
  document.body.innerHTML =
    '<rich-textarea><div class="ql-editor" contenteditable="true"></div></rich-textarea>';
  const view = document.defaultView;
  if (view) {
    vi.spyOn(view, 'getComputedStyle').mockImplementation((element) => {
      const style = (element as HTMLElement).style;
      return {
        visibility: style.visibility || 'visible',
        opacity: style.opacity || '1',
        display: style.display || 'block',
      } as CSSStyleDeclaration;
    });
  }
  const editor = document.querySelector('.ql-editor');
  if (editor) {
    vi.spyOn(editor, 'getClientRects').mockReturnValue([{} as DOMRect] as unknown as DOMRectList);
  }
  return document;
}

describe('Gemini read-only readiness', () => {
  it('rejects a signed-out or loading Gemini page without a visible composer', () => {
    expect(
      isGeminiReady(
        'gemini.google.com',
        '/app/conversation-123',
        document.implementation.createHTMLDocument('loading fixture')
      )
    ).toBe(false);
    expect(isGeminiReady('gemini.google.com', '/app/conversation-123', pageWithComposer())).toBe(
      true
    );
    expect(isGeminiReady('gemini.google.com', '/app', pageWithComposer())).toBe(false);
  });

  it.each([
    ['a visible sign-in link', 'a', 'Sign in', ''],
    ['a visible sign-in button', 'button', undefined, 'Sign in'],
    ['sign-in text with another aria-label', 'button', 'Account', 'Sign in'],
    ['sign-in aria-label with other text', 'button', 'Sign in', 'Use account'],
  ])('rejects %s when a composer is rendered', (_caseName, tag, ariaLabel, text) => {
    const page = pageWithComposer();
    const signIn = page.createElement(tag);
    if (ariaLabel) signIn.setAttribute('aria-label', ariaLabel);
    signIn.textContent = text;
    page.body.append(signIn);
    vi.spyOn(signIn, 'getClientRects').mockReturnValue([{} as DOMRect] as unknown as DOMRectList);

    expect(isGeminiReady('gemini.google.com', '/app/conversation-123', page)).toBe(false);
  });

  it.each([
    ['display:none', 'display:none'],
    ['visibility:hidden', 'visibility:hidden'],
    ['opacity:0', 'opacity:0'],
  ])('does not treat a hidden sign-in control (%s) as a visible prompt', (_name, style) => {
    const page = pageWithComposer();
    const signIn = page.createElement('button');
    signIn.textContent = 'Sign in';
    signIn.setAttribute('style', style);
    page.body.append(signIn);
    vi.spyOn(signIn, 'getClientRects').mockReturnValue([{} as DOMRect] as unknown as DOMRectList);

    expect(isGeminiReady('gemini.google.com', '/app/conversation-123', page)).toBe(true);
  });

  it('does not treat a sign-in control under a hidden ancestor as visible', () => {
    const page = pageWithComposer();
    const hiddenContainer = page.createElement('div');
    hiddenContainer.setAttribute('style', 'display:none');
    const signIn = page.createElement('button');
    signIn.textContent = 'Sign in';
    hiddenContainer.append(signIn);
    page.body.append(hiddenContainer);
    vi.spyOn(signIn, 'getClientRects').mockReturnValue([{} as DOMRect] as unknown as DOMRectList);

    expect(isGeminiReady('gemini.google.com', '/app/conversation-123', page)).toBe(true);
  });

  it.each([
    ['display:none', 'display:none'],
    ['visibility:hidden', 'visibility:hidden'],
    ['opacity:0', 'opacity:0'],
  ])('rejects a composer with %s', (_caseName, style) => {
    document.body.innerHTML = `<rich-textarea><div class="ql-editor" contenteditable="true" style="${style}"></div></rich-textarea>`;
    const editor = document.querySelector('.ql-editor');
    if (editor) {
      vi.spyOn(editor, 'getClientRects').mockReturnValue([{} as DOMRect] as unknown as DOMRectList);
    }
    const view = document.defaultView;
    if (view) {
      const computedStyle = vi.spyOn(view, 'getComputedStyle').mockImplementation((element) => {
        const computed = (element as HTMLElement).style;
        return {
          visibility: computed.visibility || 'visible',
          opacity: computed.opacity || '1',
          display: computed.display || 'block',
        } as CSSStyleDeclaration;
      });
      if (style === 'display:none') {
        computedStyle.mockReturnValue({
          display: 'none',
          visibility: 'visible',
          opacity: '1',
        } as CSSStyleDeclaration);
      }
    }
    expect(isGeminiReady('gemini.google.com', '/app/conversation-123', document)).toBe(false);
  });

  it('rejects a composer that exists but is disabled', () => {
    document.body.innerHTML =
      '<rich-textarea><div class="ql-editor" contenteditable="false"></div></rich-textarea>';
    const editor = document.querySelector('.ql-editor');
    if (editor) {
      vi.spyOn(editor, 'getClientRects').mockReturnValue([{} as DOMRect] as unknown as DOMRectList);
    }
    const view = document.defaultView;
    if (view) {
      vi.spyOn(view, 'getComputedStyle').mockImplementation((element) => {
        const computed = (element as HTMLElement).style;
        return {
          visibility: computed.visibility || 'visible',
          opacity: computed.opacity || '1',
          display: computed.display || 'block',
        } as CSSStyleDeclaration;
      });
    }
    expect(isGeminiReady('gemini.google.com', '/app/conversation-123', document)).toBe(false);
  });

  it('answers valid readiness messages only for the owning extension and tab', () => {
    const addListener = vi.fn();
    const page = pageWithComposer();
    registerGeminiStatusListener({
      runtime: { id: 'test-extension-id', onMessage: { addListener } },
      getPage: () => page,
      getLocation: () => ({ hostname: 'gemini.google.com', pathname: '/app/conversation-123' }),
    });
    const listener = addListener.mock.calls[0]?.[0];
    const request = createMessage('CHECK_TAB_STATUS', 'sidepanel', { tabId: 7 });
    const sendResponse = vi.fn();

    // tabs.sendMessage originates from the extension side panel; Chrome omits sender.tab.
    listener?.(request, { id: 'test-extension-id' }, sendResponse);

    expect(sendResponse).toHaveBeenCalledTimes(1);
    const parsed = parseExtensionMessage(sendResponse.mock.calls[0]?.[0]);
    expect(parsed.success).toBe(true);
    expect(parsed.message).toMatchObject({
      type: 'TAB_STATUS_RESULT',
      payload: { tabId: 7, provider: 'gemini', connected: true },
    });
    expect(JSON.stringify(sendResponse.mock.calls[0]?.[0])).not.toMatch(
      /url|title|email|prompt|token|cookie/i
    );

    const untrustedResponse = vi.fn();
    listener?.(request, { id: 'wrong-extension-id', tab: { id: 7 } }, untrustedResponse);
    expect(untrustedResponse).not.toHaveBeenCalled();
    const wrongTabResponse = vi.fn();
    listener?.(request, { id: 'test-extension-id', tab: { id: 8 } }, wrongTabResponse);
    expect(wrongTabResponse).not.toHaveBeenCalled();
    // Extension-page senders have no tab; the request's explicit tab ID is the target.
    const missingTabResponse = vi.fn();
    listener?.(request, { id: 'test-extension-id' }, missingTabResponse);
    expect(missingTabResponse).toHaveBeenCalledTimes(1);
    const mismatchedPayloadResponse = vi.fn();
    listener?.(
      createMessage('CHECK_TAB_STATUS', 'sidepanel', { tabId: 8 }),
      { id: 'test-extension-id', tab: { id: 7 } },
      mismatchedPayloadResponse
    );
    expect(mismatchedPayloadResponse).not.toHaveBeenCalled();
    const malformedResponse = vi.fn();
    listener?.(
      { type: 'CHECK_TAB_STATUS', payload: { tabId: 7 } },
      { id: 'test-extension-id', tab: { id: 7 } },
      malformedResponse
    );
    expect(malformedResponse).not.toHaveBeenCalled();
  });

  it.each([
    ['empty message IDs', { messageId: '' }],
    ['zero timestamps', { timestamp: 0 }],
    ['fractional timestamps', { timestamp: 1.5 }],
    ['unsupported sender roles', { sender: 'external' }],
    ['missing payloads', { payload: undefined }],
    ['null payloads', { payload: null }],
    ['missing payload tab IDs', { payload: {} }],
    ['fractional payload tab IDs', { payload: { tabId: 7.5 } }],
  ])('ignores otherwise-shaped requests with %s', (_caseName, overrides) => {
    const addListener = vi.fn();
    registerGeminiStatusListener({
      runtime: { id: 'test-extension-id', onMessage: { addListener } },
      getPage: () => pageWithComposer(),
      getLocation: () => ({ hostname: 'gemini.google.com', pathname: '/app/conversation-123' }),
    });
    const listener = addListener.mock.calls[0]?.[0];
    const request = createMessage('CHECK_TAB_STATUS', 'sidepanel', { tabId: 7 });
    const invalidRequest = { ...request, ...overrides };
    const sendResponse = vi.fn();

    listener?.(invalidRequest, { id: 'test-extension-id' }, sendResponse);

    expect(sendResponse).not.toHaveBeenCalled();
  });
});
