import { test } from './fixtures/ShokFixtures';
import { DataGenerator } from './utils/DataGenerator';
import { AuthData } from './setup/authData';

test.describe('Проверка существования пользователя', () => {
    let email: string;

    test.beforeEach(async ({ userExistingPage }) => {
        await test.step('Открываем страницу', async () => {
            await userExistingPage.Open();
        });
    });

    test('Проверка UI-страницы существования пользователя', async ({ userExistingPage }) => {
        await test.step('Проверяем поле ввода email', async () => {
            await userExistingPage.CheckInputEmail();
        });
        await test.step('Проверяем кнопку проверки', async () => {
            await userExistingPage.CheckCheckButton();
        });
        await test.step('Проверяем кнопку входа', async () => {
            await userExistingPage.CheckButtonLogin();
        });
    });

    test('Проверка существования незарегистрированного пользователя', async ({ userExistingPage }) => {
        email = DataGenerator.GenerateEmail();
        await test.step('Проверяем существование пользователя', async () => {
            await userExistingPage.CheckUserExisting(email, false);
        });
    });

    test('Проверка существования зарегистрированного пользователя', async ({ userExistingPage }) => {
        email = new AuthData().getEmail();
        await test.step('Проверяем существование пользователя', async () => {
            await userExistingPage.CheckUserExisting(email, true);
        });
    });
});

test.describe('Проверка валидации e-mail', () => {
    let email: string;

    test.beforeEach(async ({ userExistingPage }) => {
        await test.step('Открываем страницу', async () => {
            await userExistingPage.Open();
        });
    });

    test('Проверка ввода e-mail, не соответствующего маске', async ({ userExistingPage }) => {
        email = DataGenerator.GenerateEmail().replace('@', '.');
        await test.step('Проверяем валидацию e-mail', async () => {
            await userExistingPage.CheckEmailValidation(email, false);
        });
    });

    test('Проверка ввода e-mail с пробелом в начале и конце', async ({ userExistingPage }) => {
        email = ` ${DataGenerator.GenerateEmail()} `;
        await test.step('Проверяем валидацию e-mail', async () => {
            await userExistingPage.CheckEmailValidation(email, false);
        });
    });
});
