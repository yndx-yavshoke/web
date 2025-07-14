import { expect } from '@playwright/test';
import { test } from '../fixtures/index';

test.beforeEach(async ({ checkPage }) => {
    await checkPage.open();
});

test('successfulInShok', async ({ checkPage }) => {
    await test.step('Вводим email пользователя, который в шоке', async () => {
        await checkPage.checkInShok('test0@yandex.ru');
    });

    await test.step('Показывается сообщение об успехе и гифка с котиком', async () => {
        await expect(checkPage.successShok).toBeVisible();
        await expect(checkPage.gifCat).toBeVisible();
    });

    await test.step('Не отображается сообщение о неудаче', async () => {
        await expect(checkPage.failShok).not.toBeVisible();
    });
})

test('notInShok', async ({ checkPage }) => {
    await test.step('Вводим email пользователя, который не в шоке', async () => {
        await checkPage.checkInShok('tocnonevshoke0@yandex.ru');
    });

    await test.step('Показывается сообщение о неудаче', async () => {
        await expect(checkPage.failShok).toBeVisible();
    });

    await test.step('Гифка с котиком и сообщение об успехе не отображаются', async () => {
        await expect(checkPage.gifCat).not.toBeVisible();
        await expect(checkPage.successShok).not.toBeVisible();
    });
})

test('emptyEmail', async ({ checkPage }) => {
    await test.step('Кнопка "Я в шоке?" присутствует на странице', async () => {
        await expect(checkPage.checkShokovost).toBeVisible();
    });

    await test.step('Кнопка неактивна при пустом email', async () => {
        await expect(checkPage.checkShokovost).toHaveAttribute('tabindex', '-1');
    });
})