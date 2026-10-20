import { chromium, expect, test, type BrowserContext } from '@playwright/test';
import { cpSync, mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';

const builtExtension = path.resolve('dist');

test('built MV3 extension starts its service worker, side panel and Gemini readiness handshake offline', async () => {
  const isolatedRoot = mkdtempSync(path.join(tmpdir(), 'ai-media-automator-extension-smoke-'));
  const extensionPath = path.join(isolatedRoot, 'extension');
  const profilePath = path.join(isolatedRoot, 'profile');
  let context: BrowserContext | undefined;
  const externalRequests: string[] = [];

  try {
    cpSync(builtExtension, extensionPath, { recursive: true });
    context = await chromium.launchPersistentContext(profilePath, {
      channel: 'chromium',
      headless: true,
      args: [
        `--disable-extensions-except=${extensionPath}`,
        `--load-extension=${extensionPath}`,
        '--disable-background-networking',
        '--disable-component-update',
        '--host-resolver-rules=MAP * ~NOTFOUND',
      ],
    });
    context.route('**/*', async (route) => {
      const url = new URL(route.request().url());
      if (
        url.protocol === 'https:' &&
        url.hostname === 'gemini.google.com' &&
        url.pathname === '/app/conversation-fixture'
      ) {
        await route.fulfill({
          status: 200,
          contentType: 'text/html',
          body: '<!doctype html><title>Gemini fixture</title><rich-textarea><div class="ql-editor" contenteditable="true">Prompt</div></rich-textarea>',
        });
      } else if (url.protocol === 'chrome-extension:' || url.protocol === 'data:') {
        await route.continue();
      } else {
        externalRequests.push(route.request().url());
        await route.abort('blockedbyclient');
      }
    });

    const serviceWorker =
      context.serviceWorkers()[0] ??
      (await context.waitForEvent('serviceworker', { timeout: 15_000 }));
    const extensionId = new URL(serviceWorker.url()).host;
    const page = await context.newPage();
    const fixtureErrors: string[] = [];
    page.on('console', (message) => {
      if (message.type() === 'error') fixtureErrors.push(message.text());
    });
    page.on('pageerror', (error) => fixtureErrors.push(error.message));
    const fixtureUrl = 'https://gemini.google.com/app/conversation-fixture';
    await page.goto(fixtureUrl);
    await page.locator('rich-textarea .ql-editor[contenteditable="true"]').waitFor();

    const panelPromise = context.waitForEvent('page');
    await serviceWorker.evaluate(
      async ({ panelUrl, fixtureUrl }) => {
        const [targetTab] = await chrome.tabs.query({ url: fixtureUrl });
        if (typeof targetTab?.windowId !== 'number') {
          throw new Error('Gemini fixture tab has no window ID');
        }
        await chrome.tabs.create({ url: panelUrl, active: false, windowId: targetTab.windowId });
      },
      { panelUrl: `chrome-extension://${extensionId}/src/sidepanel/index.html`, fixtureUrl }
    );
    const panel = await panelPromise;
    await expect(panel.getByText('Attached')).toBeVisible();
    await expect(panel.getByRole('textbox', { name: /prompt/i })).toBeEnabled();
    expect(externalRequests).toEqual([]);

    await expect(panel).toHaveTitle('AI Media Automator');
    await expect(panel.getByText('Omni Flash 720p / 10s / 9:16 Portrait')).toBeVisible();
    expect(externalRequests).toEqual([]);
  } finally {
    await context?.close();
    rmSync(isolatedRoot, { recursive: true, force: true });
  }
});
