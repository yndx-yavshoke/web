import { expect } from '@playwright/test';
import { test as setup } from '@common/test';

setup('login', async ({ loginPage, env, profilePage }) => {
    const { EMAIL, PASSWORD } = env;

    await loginPage.open();
    await loginPage.login(EMAIL, PASSWORD);

    await expect(profilePage.model.logoutButton).toBeVisible();
});
