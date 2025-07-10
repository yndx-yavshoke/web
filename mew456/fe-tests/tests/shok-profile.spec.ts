import { expect } from '@playwright/test';
import { test } from '../fixtures/index';

test('edit name en', async ({ page }) => {
    await page.goto('/edit');
    await page.getByTestId('edit-name-input').fill('New_name');

    await page.getByTestId('edit-save-button').click();

    await page.getByTestId('edit-cancel-button').click();

    await page.goto('/');

    await expect(page).toHaveURL('https://yavshok.ru/')

    await expect(page.getByText('New_name', { exact: true })).toBeVisible();
})

test('edit name ru', async ({ page }) => {
    await page.goto('/edit');
    await page.getByTestId('edit-name-input').fill('Мяу');

    await page.getByTestId('edit-save-button').click();

    await page.getByTestId('edit-cancel-button').click();

    await page.goto('/');

    await expect(page).toHaveURL('https://yavshok.ru/')

    await expect(page.getByText('Мяу', { exact: true })).toBeVisible();
})

test('edit name en and nums', async ({ page }) => {
    await page.goto('/edit');
    await page.getByTestId('edit-name-input').fill('New_name123');

    await page.getByTestId('edit-save-button').click();

    await page.getByTestId('edit-cancel-button').click();

    await page.goto('/');

    await expect(page).toHaveURL('https://yavshok.ru/')

    await expect(page.getByText('New_name123', { exact: true })).toBeVisible();
})