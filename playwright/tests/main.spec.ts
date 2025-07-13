import { expect } from '@playwright/test';
import { test } from '../fixtures';


test.describe('Главная страница', () => {
    test.beforeEach(async ({ mainPage }) => {
        await test.step('Открыть страницу https://yavshok.ru/', async () => {
            await mainPage.open();
        })
    })

    test('Заголоок отображается', async ({ mainPage }) => {
        await expect(mainPage.title).toBeVisible();
    });

    test('Проверить на ШОКовость валидный email', async ({ mainPage }) => {
        await mainPage.checkEmail('larry@mail.ru', true);
    });

    test('Проверить на ШОКовость невалидный email', async ({ mainPage }) => {
        await mainPage.checkEmail('test123@example.com', false);
    });

})
