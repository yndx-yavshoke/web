import { test, expect } from './fixtures/pages';

test.describe('Проверка ШОК-статуса', () => {
    test('Проверка состояния "ШОКовости" для зарегистрированного пользователя на стартовом окне', async ({ mainPage }) => {
        await mainPage.goto();
        await mainPage.checkRegisteredUserFlow();
    });

    test('Проверка состояния "ШОКовости" для не зарегистрированного пользователя на стартовом окне', async ({ mainPage }) => {
        await mainPage.goto();
        await mainPage.checkUnregisteredUserFlow();
    });
});