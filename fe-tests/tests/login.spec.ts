import { expect } from '@playwright/test';
import { test } from '../fixtures/index';

test.beforeEach(async ({ loginPage }) => {
    await loginPage.open();
});

test('successfulLogin', async ({ loginPage }) => {
    await test.step('Вводим корректный email и пароль', async () => {
        await loginPage.submitLoginPassword('test0@yandex.ru', '123456');
    });

    await test.step('Отображается кнопка выхода из профиля', async () => {
        await expect(loginPage.logoutButton).toBeVisible();
    });
})

test('emptyEmail', async ({ loginPage }) => {
    await test.step('Вводим пустой email и корректный пароль', async () => {
        await loginPage.submitLoginPassword('', '123456');
    });

    await test.step('Отображается сообщение об ошибке пустого email', async () => {
        await expect(loginPage.emptyEmail).toBeVisible();
    });
})

test('emptyPassword', async ({ loginPage }) => {
    await test.step('Вводим корректный email и пустой пароль', async () => {
        await loginPage.submitLoginPassword('test0@yandex.ru', '');
    });

    await test.step('Отображается сообщение об ошибке пустого пароля', async () => {
        await expect(loginPage.emptyPassword).toBeVisible();
    });
})

test('wrongPassword', async ({ loginPage }) => {
    await test.step('Вводим корректный email и неверный пароль', async () => {
        await loginPage.submitLoginPassword('test0@yandex.ru', '654321');
    });

    await test.step('Отображается сообщение о неверном email или пароле', async () => {
        await expect(loginPage.wrongEmailOrPassword).toBeVisible();
    });
})

test('register', async ({ loginPage }) => {
    await test.step('Генерируем данные нового пользователя', async () => {
        const user = await loginPage.generateTestUser();
    });

    await test.step('Переходим к форме регистрации', async () => {
        await loginPage.loginRegisterButton.click();
    });

    await test.step('Заполняем форму регистрации', async () => {
        const user = await loginPage.generateTestUser();
        await loginPage.registerEmail.fill(user.email);
        await loginPage.registerPassword.fill(user.password);
        await loginPage.registerAge.fill(user.age);
        await loginPage.registerSubmit.click();
    });

    await test.step('Отображается кнопка выхода', async () => {
        await expect(loginPage.logoutButton).toBeVisible();
    });
})
