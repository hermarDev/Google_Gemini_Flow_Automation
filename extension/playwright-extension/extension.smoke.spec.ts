import { chromium, expect, test, type BrowserContext } from '@playwright/test';
import { cpSync, mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';

const builtExtension = path.resolve('dist');

test('built MV3 extension starts its service worker and renders the side panel offline', async () => {
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
      const protocol = new URL(route.request().url()).protocol;
      if (protocol === 'chrome-extension:' || protocol === 'data:') {
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
    await page.goto(`chrome-extension://${extensionId}/src/sidepanel/index.html`);

    await expect(page).toHaveTitle('AI Media Automator');
    await expect(page.getByText('Omni Flash 720p / 10s / 9:16 Portrait')).toBeVisible();
    expect(externalRequests).toEqual([]);
  } finally {
    await context?.close();
    rmSync(isolatedRoot, { recursive: true, force: true });
  }
});
