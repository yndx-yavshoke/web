import { expect } from '@playwright/test';
import { test } from '../fixtures/index';

test('title visability test', async ({ mainPage }) => {
    await mainPage.open();

    await expect(mainPage.title).toBeVisible();
})

test('status visability test', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByText('Ты молоденький котик', { exact: true })).toBeVisible();
})

test('edit profile visability test', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByText('Edit Profile', { exact: true })).toBeVisible();
})

test('logout visability test', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByText('Logout', { exact: true })).toBeVisible();
})

test('edit profile button func', async ({ page }) => {
    await page.goto('/edit');

    await expect(page.getByText('Edit Profile', { exact: true })).toBeVisible();
})