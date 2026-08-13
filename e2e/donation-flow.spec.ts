import { test, expect } from '@playwright/test';

test.describe('Donation Flow', () => {
  test('Completes donation form successfully', async ({ page }) => {
    await page.goto('/');
    
    // Intercept POST
    await page.route('**/public/donations/offers', async (route) => {
      await route.fulfill({
        status: 201,
        contentType: 'application/json',
        body: JSON.stringify({
          id: 'donation-test-id',
          status: 'ofrecida',
        }),
      });
    });

    // Click donar
    await page.getByRole('button', { name: /Donar/i }).first().click();

    // Fill form
    await page.getByPlaceholder('Ej: Juan Pérez').fill('Test User');
    await page.getByPlaceholder('Ej: 0987654321').fill('0999999999');
    await page.getByPlaceholder('Ej: juan.perez@email.com').fill('test@donar.com');
    await page.getByPlaceholder('Cuéntanos brevemente qué artículos...').fill('Donacion de prueba');
    
    // Check items
    const checkboxes = page.getByRole('checkbox');
    await checkboxes.first().check(); // Select first item
    await checkboxes.last().check(); // Select policy

    // Submit
    const submitBtn = page.getByRole('button', { name: 'Enviar donación' });
    await submitBtn.click();

    // Verify success
    await expect(page.getByText('¡Donación enviada con éxito!')).toBeVisible();
  });

  test('Shows error with invalid email', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: /Donar/i }).first().click();

    await page.getByPlaceholder('Ej: juan.perez@email.com').fill('invalid-email');
    await page.getByRole('button', { name: 'Enviar donación' }).click();

    await expect(page.getByText('Debe ser un correo electrónico válido')).toBeVisible();
  });

  test('Shows error without items selected', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: /Donar/i }).first().click();

    await page.getByPlaceholder('Ej: Juan Pérez').fill('Test User');
    await page.getByPlaceholder('Ej: 0987654321').fill('0999999999');
    await page.getByRole('button', { name: 'Enviar donación' }).click();

    await expect(page.getByText('Selecciona al menos un ítem para donar')).toBeVisible();
  });
});
