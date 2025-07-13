import { test, expect } from '@playwright/test';

test('sanity check', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/mobile/);
});
