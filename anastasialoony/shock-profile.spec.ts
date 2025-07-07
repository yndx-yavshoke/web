import { expect } from '@playwright/test';
import { test } from '../fixtures/index';

test.use({ storageState: 'tests/setup/auth.json' })

test('logout test', async ({ profilePage, page }) => {
    await profilePage.open();
    await profilePage.toLogoutButtonClick();
    await expect(page).toHaveURL('/');
})

test('edit profile test', async ({ profilePage, page }) => {
    await profilePage.open();
    await profilePage.toEditProfileButtonClick();
    await expect(page.url()).toContain('/edit');
})
