import { test } from '../fixtures';
import { expect } from '@playwright/test';
import { newUser, oldUser } from '../users/users';

test('Проверка успешной регистрации пользователя', async ({ registPage }) => {
    await test.step('Заполнить форму регистрации валидными данными', async () => {
        await registPage.regist(
            newUser.email,
            newUser.password,
            newUser.age
        );
    });

    await test.step('Проверить успешную регистрацию', async () => {
        await expect(registPage.page).toHaveURL('/'); // Или другая проверка успеха
    });
});

test('Проверка повторной регистрации пользователя', async ({ registPage }) => {
    await test.step('Попытаться зарегистрироваться с существующим email', async () => {
        await registPage.regist(
            oldUser.email,
            oldUser.password,
            oldUser.age
        );
    });

    await test.step('Проверить сообщение об ошибке', async () => {
        await expect(registPage.page.getByText('Пользователь с таким email уже существует')).toBeVisible();
    });
});

test('Проверка регистрации с коротким паролем', async ({ registPage }) => {
    await test.step('Ввести пароль короче 6 символов', async () => {
        await registPage.regist(
            newUser.email,
            '1',
            newUser.age
        );
    });

    await test.step('Проверить валидацию пароля', async () => {
        await expect(registPage.page.getByText('Пароль должен содержать минимум 6 символов')).toBeVisible();
    });
});

test.skip('Проверка регистрации с большим возрастом (> 99)', async ({ registPage }) => {
    await test.step('Ввести возраст больше 99 лет', async () => {
        await registPage.regist(
            newUser.email,
            newUser.password,
            newUser.age + 100
        );
    });

    await test.step('Проверить валидацию возраста', async () => {
        await expect(registPage.page.getByText('Возраст должен быть от 0 до 99')).toBeVisible();
    });
});