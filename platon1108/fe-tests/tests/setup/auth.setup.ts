import { test } from '../../fixtures/index'
import { expect } from '@playwright/test'

test('login', async ({ loginPage, profilePage }) => {
    await loginPage.open();
    await loginPage.login(process.env.TEST_EMAIL!, process.env.TEST_PASSWORD!);
    await loginPage.page.waitForURL('/');
    await loginPage.page.context().storageState({path: './tests/setup/.auth/user_creds.json'});
})