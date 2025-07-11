import { expect } from '@playwright/test';
import { test } from '../../fixtures/index';

test('User Data Extraction', async ({ page, loginPage, userProfilePage })=> {
    const email = process.env.TEST_EMAIL;
    if (!email) {
        throw new Error('TEST_EMAIL is not defined');
    };
    
    const password = process.env.TEST_PASSWORD;
    if (!password) {
        throw new Error('TEST_PASSWORD is not defined');
    };
    
    await loginPage.open();
    await loginPage.login(email, password);

    await expect(userProfilePage.logoutButton).toBeVisible();
    
    await page.context().storageState({path: './tests/setup/.auth/user.json'});
})