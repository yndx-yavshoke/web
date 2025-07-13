import {expect, Locator} from '@playwright/test';
import { test } from '../fixtures';

test.beforeEach(async ({ authPage }) => {
    await authPage.navigate();
});

test('register', async ({ authPage }) => {
    await test.step('Creating data for new user', async () => {
        const user = await authPage.signupUser();
    });

    await test.step('Switch to register', async () => {
        await authPage.switchToRegister.click();
    });

    await test.step('Filling out register form', async () => {
        const user = await authPage.signupUser();
        await authPage.fillRegisterForm(user);
    });

    await test.step('See sign out button', async () => {
        await expect(authPage.signOutBtn).toBeVisible();
    });
})

test('Log in with existing data', async ({ authPage }) => {
    await test.step('Inserting email and password', async () => {
        await authPage.loginWith('molodoy@list.ru', '123456');
    });
})

test('Log in with wrong password', async ({ authPage }) => {
    await test.step('Inserting existing email and random password', async () => {
        await authPage.loginWith('molodoy@list.ru', '1928498742198214798127984721984712987');
    });
})

test('Log in with empty email placeholder', async ({ authPage }) => {
    await test.step('Inserting email and any password', async () => {
        await authPage.loginWith('', '1234561298734129781249781249872');
    });

    await test.step('Get an error message', async () => {
        await expect(authPage.missingEmail).toBeVisible();
    });
})

test('Log in with empty pass placeholder', async ({ authPage }) => {
    await test.step('Inserting email and empty password', async () => {
        await authPage.loginWith('molodoy@list.ru', '');
    });

    await test.step('Ger an error message', async () => {
        await expect(authPage.missingPassword).toBeVisible();
    });
})