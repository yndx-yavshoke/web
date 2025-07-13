import { test } from '../../fixturies/index';
import { expect } from '@playwright/test';


test('Auth Setup', async ({ authPage, profilePage, page }) => {
    const email = process.env.TEST_EMAIL;
    if (!email) {
        throw new Error('TEST_EMAIL is not defined in environment variables');
    };

    const password = process.env.TEST_PASSWORD;
    if (!password) {
        throw new Error('TEST_PASSWORD is not defined in environment variables');
    };

    // Выполняем авторизацию через ваши фикстуры
    await authPage.signIn({ email, password });

    // Проверяем, что авторизация прошла успешно
    await expect(profilePage.actions.logout).toBeVisible();

    // Сохраняем состояние аутентификации
    await page.context().storageState({ path: './.auth/user.json' });
});