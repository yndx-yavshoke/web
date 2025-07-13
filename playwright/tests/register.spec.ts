import { expect } from '@playwright/test';
import { test } from '../fixtures';
import { faker } from '@faker-js/faker';


test.describe('Страница регистрации', () => {
    test.beforeEach(async ({ registerPage }) => {
        await test.step('Открыть страницу https://yavshok.ru/register', async () => {
            await registerPage.open()
        })
    })

    test('Регистрация пользователя с валидными значениями', async ({ registerPage }) => {
        await test.step('Проверить отображение полей и кнопок', async () => {
            await expect(registerPage.loginInput).toBeVisible();
            await expect(registerPage.passwordInput).toBeVisible();
            await expect(registerPage.ageInput).toBeVisible();
            await expect(registerPage.registerButton).toBeVisible();
        });

        await test.step('Заполнить форму регистрации', async () => {
            await registerPage.loginInput.fill(faker.internet.email());
            await registerPage.passwordInput.fill('123456');
            await registerPage.ageInput.fill('21');
            await registerPage.registerButton.click();
        });

        await test.step('Проверить успешную регистрацию', async () => {
            await expect(registerPage.page.getByTestId('user-logout-button')).toBeVisible();
        });
    });

    test('Проверка кнопки «Назад»', async ({ registerPage }) => {
        await expect(registerPage.backButton).toBeVisible();
        await registerPage.backButton.click()

        await expect(registerPage.page.getByText('Войти в ШОК', { exact: true })).toBeVisible();
    });

    test('Регистрация с пустыми значениями полей', async ({ registerPage, page }) => {
        await expect(registerPage.ageInput).toBeVisible();
        await registerPage.registerButton.click();

        await expect(registerPage.page.getByText('Введите email', { exact: true })).toBeVisible();
        await expect(registerPage.page.getByText('Введите пароль', { exact: true })).toBeVisible();
        await expect(registerPage.page.getByText('Введите возраст', { exact: true })).toBeVisible();
    });

})