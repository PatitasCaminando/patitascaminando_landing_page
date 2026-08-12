import { test, expect } from '@playwright/test';

test.describe('PWA Offline Flow', () => {
  test('Shows offline banner when network drops', async ({ page, context }) => {
    await page.goto('/');

    // Go offline
    await context.setOffline(true);
    
    // Check if offline banner appears (it might take a moment to detect and render)
    // The component listens to 'offline' event
    await expect(page.getByText(/Estás navegando sin conexión/i)).toBeVisible();

    // Go back online
    await context.setOffline(false);
    
    // Check if offline banner disappears
    await expect(page.getByText(/Estás navegando sin conexión/i)).not.toBeVisible();
  });
});
