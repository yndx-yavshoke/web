import { test } from "../fixtures";
import * as allure from "allure-js-commons";

test.beforeEach(async ({ registerPage }) => {
    await allure.step('Открыть страницу регистрации', async () => {
        await registerPage.open();
    });
});

test('register with empty email', async ({ registerPage }) => {
    await allure.epic('Регистрация');
    await allure.feature('Валидация полей');
    await allure.story('Пустой email');

    await allure.step('Попытка регистрации с пустым email', async () => {
        await registerPage.register('', 'password', '34');
    });

    await allure.step('Проверить сообщение об ошибке для пустого email', async () => {
        await registerPage.expectEmptyEmailMessage();
    });
});

test('register with empty password', async ({ registerPage }) => {
    await allure.epic('Регистрация');
    await allure.feature('Валидация полей');
    await allure.story('Пустой пароль');

    await allure.step('Попытка регистрации с пустым паролем', async () => {
        await registerPage.register('dkjfhsk@mail.ru', '', '34');
    });

    await allure.step('Проверить сообщение об ошибке для пустого пароля', async () => {
        await registerPage.expectEmptyPasswordMessage();
    });
});

test('register with empty age', async ({ registerPage }) => {
    await allure.epic('Регистрация');
    await allure.feature('Валидация полей');
    await allure.story('Пустой возраст');

    await allure.step('Попытка регистрации без указания возраста', async () => {
        await registerPage.register('email@mail.ru', 'password', '');
    });

    await allure.step('Проверить сообщение об ошибке для пустого возраста', async () => {
        await registerPage.expectEmptyAgeMessage();
    });
});

test('register with email without @', async ({ registerPage }) => {
    await allure.epic('Регистрация');
    await allure.feature('Валидация email');
    await allure.story('Некорректный формат email');

    await allure.step('Попытка регистрации с email без @', async () => {
        await registerPage.register('email', 'password', '34');
    });

    await allure.step('Проверить сообщение об ошибке формата email', async () => {
        await registerPage.expectEmailWrongMessage();
    });
});

test('register with non-numeric age', async ({ registerPage }) => {
    await allure.epic('Регистрация');
    await allure.feature('Валидация возраста');
    await allure.story('Нечисловое значение возраста');

    await allure.step('Попытка регистрации с нечисловым возрастом', async () => {
        await registerPage.register('email', 'password', 'djhfs');
    });

    await allure.step('Проверить сообщение об ошибке формата возраста', async () => {
        await registerPage.expectNonNumericAgeMessage();
    });
});