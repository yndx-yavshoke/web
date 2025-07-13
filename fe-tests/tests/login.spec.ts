import { test } from "../fixtures";
import * as allure from "allure-js-commons";

test.beforeEach(async ({ loginPage }) => {
    await allure.step('Открыть страницу логина', async () => {
        await loginPage.open();
    });
});

test('login with empty email', async ({ loginPage }) => {
    await allure.epic('Авторизация');
    await allure.feature('Валидация полей');
    await allure.story('Пустой email');

    await allure.step('Попытка входа с пустым email', async () => {
        await loginPage.login('', '1234567890');
    });

    await allure.step('Проверить отображение ошибки email', async () => {
        await loginPage.expectEmailEmptyMessage();
    });
});

test('login with empty password', async ({ loginPage }) => {
    await allure.epic('Авторизация');
    await allure.feature('Валидация полей');
    await allure.story('Пустой пароль');

    await allure.step('Попытка входа с пустым паролем', async () => {
        await loginPage.login('123456@mail.ru', '');
    });

    await allure.step('Проверить отображение ошибки пароля', async () => {
        await loginPage.expectPasswordEmptyMessage();
    });
});

test('login with unexisted user', async ({ loginPage }) => {
    await allure.epic('Авторизация');
    await allure.feature('Несуществующий пользователь');

    const testEmail = '123456@mail.ru';
    const testPassword = 'fkjghdsjfbsdkdjfhk';
    await allure.parameter('Email', testEmail);
    await allure.parameter('Password', testPassword);

    await allure.step('Попытка входа с несуществующими данными', async () => {
        await loginPage.login(testEmail, testPassword);
    });

    await allure.step('Проверить отображение ошибки авторизации', async () => {
        await loginPage.expectAuthErrorMessage();
    });
});

test('login placeholders', async ({ loginPage }) => {
    await allure.epic('UI проверки');
    await allure.feature('Элементы формы входа');
    await allure.story('Плейсхолдеры email и пароля');

    await allure.step('Проверить плейсхолдер email', async () => {
        await loginPage.expectEmailPlaceholderVisible();
    });

    await allure.step('Проверить плейсхолдер пароля', async () => {
        await loginPage.expectPasswordPlaceholderVisible();
    });
});

test('experiment status profile', async ({loginPage, profilePage}) => {
    await allure.epic('Профиль пользователя');
    await allure.feature('Статусы профиля');
    await allure.story('Экспериментальный статус');

    await allure.step('Установить пустой возраст', async () => {
        await loginPage.changeAgeRoute('');
    });

    await allure.step('Выполнить вход', async () => {
        await loginPage.login('123456789@mail.ru', '123456');
    });

    await allure.step('Проверить отображение экспериментального статуса', async () => {
        await profilePage.expectExperimentStatusVisible();
    });
});

test('young status profile', async ({loginPage, profilePage}) => {
    await allure.epic('Профиль пользователя');
    await allure.feature('Статусы профиля');
    await allure.story('Статус молодого котика');

    await allure.step('Установить возраст 2 года', async () => {
        await loginPage.changeAgeRoute(2);
    });

    await allure.step('Выполнить вход', async () => {
        await loginPage.login('123456789@mail.ru', '123456');
    });

    await allure.step('Проверить отображение молодого статуса', async () => {
        await profilePage.expectYoungStatusVisible();
    });
});

test('old status profile', async ({loginPage, profilePage}) => {
    await allure.epic('Профиль пользователя');
    await allure.feature('Статусы профиля');
    await allure.story('Статус взрослого котика');

    await allure.step('Установить возраст 32 года', async () => {
        await loginPage.changeAgeRoute(32);
    });

    await allure.step('Выполнить вход', async () => {
        await loginPage.login('123456789@mail.ru', '123456');
    });

    await allure.step('Проверить отображение взрослого статуса', async () => {
        await profilePage.expectOldStatusVisible();
    });
});