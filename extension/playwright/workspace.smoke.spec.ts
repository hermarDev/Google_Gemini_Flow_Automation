import { expect, test } from './fixtures.ts';

const workspaceUrl = '/src/workspace/index.html';

test('production workspace shell loads and navigates between offline views', async ({ page }) => {
  await page.goto(workspaceUrl);

  await expect(page.getByRole('navigation', { name: 'Main menu' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Create', level: 2 })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Queue', exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Library', exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: 'History', exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Settings', exact: true })).toBeVisible();

  await page.getByRole('button', { name: 'Queue', exact: true }).click();
  await expect(page).toHaveURL(/#\/queue$/);
  await expect(page.getByText('No jobs queued')).toBeVisible();

  await page.getByRole('button', { name: 'Settings' }).click();
  await expect(page).toHaveURL(/#\/settings$/);
  await expect(page.getByRole('heading', { name: 'Settings', level: 2 })).toBeVisible();
});

test('workspace deep links restore the selected view without provider access', async ({ page }) => {
  await page.goto(`${workspaceUrl}#/library`);
  await expect(page.getByRole('heading', { name: 'Media Library', level: 2 })).toBeVisible();
  await expect(page.getByText('Your library is empty')).toBeVisible();
});
