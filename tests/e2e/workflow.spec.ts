import { test, expect } from '@playwright/test';

test('Critical Path: Add Exercise and Verify Heatmap', async ({ page }) => {
    // 1. Load the app
    await page.goto('/');

    // 2. Verify Title
    await expect(page).toHaveTitle(/Smart Split/);

    // 4. Select Exercise from Dropdown
    await page.locator('select').selectOption('squat');

    // 6. Fill Sets/Reps/Weight
    // Assuming the order of inputs: Sets, Reps, Weight
    // Or robustly by type/value logic. 
    // They are number inputs.
    // Sets is likely the first one?
    // Let's use placeholders if available? No placeholders in code.
    // Let's use nth-child or getByLabel if possible, but getByLabel failed.
    // Let's use locator('input[type="number"]').nth(0) -> Sets
    // nth(1) -> Reps

    const inputs = page.locator('input[type="number"]');
    await inputs.nth(0).fill('3'); // Sets
    await inputs.nth(1).fill('10'); // Reps

    // 7. Click Add Button
    await page.getByRole('button', { name: 'Add to Workout' }).click();

    // 8. Verify it appears in the list
    await expect(page.getByText('Squat')).toBeVisible();

    // 9. Verify Heatmap Update
    // Quads should light up.
    // The SVG path for Quads has id 'quads_l' or 'quads_r'.
    // We can check if the class name changes or fill attribute.
    // In BodyHeatmap.tsx, colorClass is applied.
    // Standard CSS class like 'fill-emerald-500' for low stress.

    const quadsLeft = page.locator('#quads_l');
    await expect(quadsLeft).toHaveClass(/fill-emerald-500/);
});
