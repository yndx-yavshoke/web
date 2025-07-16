import { expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

import { test } from '@common/test';

test.describe('Страница регистрации', () => {
    test.beforeEach(async ({ registerPage }) => {
        await test.step('Открыть страницу https://yavshok.ru/register', async () => {
            await registerPage.open()
        });
    });

    test('Регистрация пользователя с валидными значениями', async ({ registerPage, profilePage }) => {
        await test.step('Проверить отображение полей и кнопок', async () => {
            await expect(registerPage.model.emailInput).toBeVisible();
            await expect(registerPage.model.passwordInput).toBeVisible();
            await expect(registerPage.model.ageInput).toBeVisible();
            await expect(registerPage.model.submitButton).toBeVisible();
        });

        await test.step('Заполнить форму регистрации', async () => {
            const { internet, number } = faker;

            const email = faker.internet.email();
            const password = internet.password({ length: number.int({ min: 5, max: 20 }) });
            const age = faker.number.int({ min: 0, max: 99 }).toString();

            await registerPage.model.emailInput.fill(email);
            await registerPage.model.passwordInput.fill(password);
            await registerPage.model.ageInput.fill(age);
            await registerPage.model.submitButton.click();
        });

        await test.step('Проверить успешную регистрацию', async () => {
            await expect(profilePage.model.logoutButton).toBeVisible();
        });
    });

    test('Проверка кнопки «Назад»', async ({ registerPage, loginPage }) => {
        await test.step('Нажать на кнопку «Назад»', async () => {
            await expect(registerPage.model.backButton).toBeVisible();

            await registerPage.model.backButton.click();
        });

        await test.step('Проверить успешный переход на страницу авторизации', async () => {
            await expect(loginPage.model.title).toBeVisible();
        });
    });

    test('Регистрация с пустыми значениями полей', async ({ registerPage, page }) => {
        await test.step('Нажать на кнопку «Регистрация»', async () => {
            await expect(registerPage.model.ageInput).toBeVisible();

            await registerPage.model.submitButton.click();
        });

        await test.step('Проверить текстовые подсказки под полями', async () => {
            await expect(registerPage.model.suggestEmail).toBeVisible();
            await expect(registerPage.model.suggestPassword).toBeVisible();
            await expect(registerPage.model.suggestAge).toBeVisible();
        });
    });
});