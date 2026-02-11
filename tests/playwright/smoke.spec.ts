import { test, expect } from '@playwright/test';

test('home/search/movie smoke', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByText('VHS Collector Database')).toBeVisible();

  await page.goto('/search');
  await expect(page.getByRole('heading', { name: 'Search Movies & VHS Variants' })).toBeVisible();

  await page.goto('/movies/603');
  await expect(page.getByText('VHS Releases / Variants')).toBeVisible();
});
