import { test, expect } from '@playwright/test';

test.describe('Report Case Flow', () => {
  test('Opens report case modal and shows information', async ({ page }) => {
    await page.goto('/');

    const reportarCta = page.getByRole('button', { name: /Reportar caso/i }).first();
    await reportarCta.click();

    // Verify modal is open
    await expect(page.getByText('Reportar un Caso')).toBeVisible();
    await expect(page.getByText(/Si has encontrado un animalito/)).toBeVisible();
    await expect(page.getByText('Facebook Oficial')).toBeVisible();

    // Close modal
    await page.getByText('Entendido').click();
    await expect(page.getByText('Reportar un Caso')).not.toBeVisible();
  });
});
