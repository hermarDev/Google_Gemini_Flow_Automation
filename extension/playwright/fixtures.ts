import { test as base, type BrowserContext, type Page } from '@playwright/test';

export type OfflineFixtures = {
  context: BrowserContext;
  page: Page;
};

export const isAllowedOfflineRequest = (requestUrl: string) => {
  const url = new URL(requestUrl);
  return url.protocol === 'data:' || url.origin === 'http://127.0.0.1:4173';
};

export const test = base.extend<OfflineFixtures>({
  context: async ({ context }, use) => {
    await context.route('**/*', async (route) => {
      if (isAllowedOfflineRequest(route.request().url())) {
        await route.continue();
      } else {
        await route.abort('blockedbyclient');
      }
    });
    if (typeof context.routeWebSocket === 'function') {
      await context.routeWebSocket(/.*/, (ws) => ws.close());
    }
    await use(context);
  },
  page: async ({ context }, use) => {
    const page = await context.newPage();
    await use(page);
    await page.close();
  },
});

export { expect } from '@playwright/test';
