import { test, expect } from './fixtures/pages';
import { regUsers } from './fixtures/users';
import { allure } from 'allure-playwright';

test.describe('Регистрация', () => {
    test.beforeEach(() => {
        allure.epic('Система регистрации');
        allure.feature('Форма регистрации');
    });

    test('Успешная регистрация молоденького котика', async ({ registerPage }) => {
        allure.story('Регистрация молодого пользователя');
        allure.severity('critical');
        allure.tag('smoke');
        allure.description('Проверка регистрации пользователя с возрастом до 21 года');

        await allure.step('Открытие страницы регистрации', async () => {
            await registerPage.goto();
            await allure.attachment('Скриншот формы регистрации', await registerPage.page.screenshot(), 'image/png');
        });

        await allure.step('Заполнение формы регистрации', async () => {
            await registerPage.fillForm(regUsers.youngCat);
            await allure.attachment('Форма после заполнения', await registerPage.page.screenshot(), 'image/png');
        });

        await allure.step('Отправка формы', async () => {
            await registerPage.submit();
        });

        await allure.step('Проверка успешной регистрации', async () => {
            await registerPage.verifySuccess('Ты молоденький котик');
            await allure.attachment('Скриншот после регистрации', await registerPage.page.screenshot(), 'image/png');
        });
    });

    test('Успешная регистрация взрослого котика', async ({ registerPage }) => {
        allure.story('Регистрация взрослого пользователя');
        allure.severity('normal');
        allure.description('Проверка регистрации пользователя с возрастом от 22 до 68 лет');

        await allure.step('Открытие страницы регистрации', async () => {
            await registerPage.goto();
            await allure.attachment('Скриншот формы регистрации', await registerPage.page.screenshot(), 'image/png');
        });

        await allure.step('Заполнение формы регистрации', async () => {
            await registerPage.fillForm(regUsers.adultCat);
            await allure.attachment('Форма после заполнения', await registerPage.page.screenshot(), 'image/png');
        });

        await allure.step('Отправка формы', async () => {
            await registerPage.submit();
        });

        await allure.step('Проверка успешной регистрации', async () => {
            await registerPage.verifySuccess('Ты взрослый котик');
            await allure.attachment('Скриншот после регистрации', await registerPage.page.screenshot(), 'image/png');
        });
    });

    test('Успешная регистрация старого котика', async ({ registerPage }) => {
        allure.story('Регистрация пожилого пользователя');
        allure.severity('minor');
        allure.description('Проверка регистрации пользователя с возрастом 69+ лет');

        await allure.step('Открытие страницы регистрации', async () => {
            await registerPage.goto();
            await allure.attachment('Скриншот формы регистрации', await registerPage.page.screenshot(), 'image/png');
        });

        await allure.step('Заполнение формы регистрации', async () => {
            await registerPage.fillForm(regUsers.oldCat);
            await allure.attachment('Форма после заполнения', await registerPage.page.screenshot(), 'image/png');
        });

        await allure.step('Отправка формы', async () => {
            await registerPage.submit();
        });

        await allure.step('Проверка успешной регистрации', async () => {
            await registerPage.verifySuccess('Ты старый котик');
            await allure.attachment('Скриншот после регистрации', await registerPage.page.screenshot(), 'image/png');
        });
    });
});