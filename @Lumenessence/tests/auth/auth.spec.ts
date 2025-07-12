import { test } from '../../Pages';
import { expect } from '@playwright/test';

const USERS = [
    {
        email: '731@731.ru',
        password: '731731',
        authFile: 'tests/auth/user1.json'
    },
    {
        email: '732@732.ru',
        password: '732732',
        authFile: 'tests/auth/user2.json'
    },
    {
        email: '733@733.ru',
        password: '733733',
        authFile: 'tests/auth/user3.json'
    }
];

USERS.forEach((user, index) => {
    test(`auth_for_${index + 1}`, async ({ loginPage, page }) => {
        await loginPage.open();

        await loginPage.inputEmail.fill(user.email);
        await loginPage.inputPassword.fill(user.password);
        await loginPage.loginButton.click();

        await page.waitForURL('https://yavshok.ru/');
        await expect(page.getByTestId('user-avatar')).toBeVisible();

        await page.context().storageState({ path: user.authFile });
        console.log(`Auth session saved to ${user.authFile}`);
    });
});