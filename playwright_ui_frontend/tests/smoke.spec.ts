import { test, expect } from '@playwright/test';

test('app loads home page', async ({ page }) => {
  await page.goto('/');
  // Adjust the selector below to something that exists on the landing page
  await expect(page.getByRole('heading').first()).toBeVisible();
});
