import { test, expect } from './fixtures/pages';
import { allure } from 'allure-playwright';

test.describe('Проверка ШОК-статуса', () => {
    test.beforeEach(() => {
        allure.epic('Пользовательский профиль');
        allure.feature('Проверка ШОК-статуса');
    });

    test('Проверка состояния "ШОКовости" для зарегистрированного пользователя на стартовом окне', async ({ mainPage }) => {
        allure.story('Зарегистрированный пользователь');
        allure.severity('critical');
        allure.tag('smoke');
        allure.description('Проверка отображения статуса для пользователя, который уже зарегистрирован в системе');

        await allure.step('1. Открытие главной страницы', async () => {
            await mainPage.goto();
            await allure.attachment('Скриншот главной страницы', await mainPage.page.screenshot(), 'image/png');
        });

        await allure.step('2. Проверка статуса зарегистрированного пользователя', async () => {
            await mainPage.checkRegisteredUserFlow();
            await allure.attachment('Скриншот результата проверки', await mainPage.page.screenshot(), 'image/png');
        });

        await allure.step('3. Верификация результата', async () => {
            await expect(mainPage.page.getByText('Ты уже в ШОКе')).toBeVisible();
        });
    });

    test('Проверка состояния "ШОКовости" для не зарегистрированного пользователя на стартовом окне', async ({ mainPage }) => {
        allure.story('Незарегистрированный пользователь');
        allure.severity('normal');
        allure.description('Проверка отображения статуса для нового пользователя');

        await allure.step('1. Открытие главной страницы', async () => {
            await mainPage.goto();
            await allure.attachment('Скриншот главной страницы', await mainPage.page.screenshot(), 'image/png');
        });

        await allure.step('2. Проверка статуса незарегистрированного пользователя', async () => {
            await mainPage.checkUnregisteredUserFlow();
            await allure.attachment('Скриншот результата проверки', await mainPage.page.screenshot(), 'image/png');
        });

        await allure.step('3. Верификация результата', async () => {
            await expect(mainPage.page.getByText('Ты еще не в ШОКе')).toBeVisible();
        });
    });
});