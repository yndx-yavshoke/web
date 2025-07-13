import { test } from '../../fixturies/index';
import { expect } from '@playwright/test';

test('Проверка статуса ШОК', async ({ mainPage }) => {
    await mainPage.openMainPage();
    
    // Тест для зарегистрированного пользователя
    await mainPage.checkShockStatus('test@example.com');
    expect(await mainPage.isUserInShock()).toBeTruthy();
    
    // Тест для незарегистрированного пользователя
    await mainPage.checkShockStatus('unknown@example.com');
    expect(await mainPage.isUserNotInShock()).toBeTruthy();
});

test('Переход на страницу авторизации', async ({ mainPage, authPage }) => {
    await mainPage.openMainPage();
    await mainPage.navigateToLogin();
    
    await expect(authPage.emailField).toBeVisible();
});