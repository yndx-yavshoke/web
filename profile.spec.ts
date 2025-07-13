import { test } from '../../fixturies/index';
import { expect } from '@playwright/test';

test.use({ storageState: './.auth/user.json' });

test('Отображение статуса по возрасту', async ({ profilePage }) => {
    await profilePage.navigate();
    
  
    await profilePage.verifyAgeStatus(20); // Должен быть "Молоденький котик"
    await profilePage.verifyAgeStatus(30); // Должен быть "Взрослый котик"
    await profilePage.verifyAgeStatus(70); // Должен быть "Старый котик"
});

test('Открытие страницы редактирования', async ({ profilePage, editPage }) => {
    await profilePage.navigate();
    await profilePage.openEditMode();
    
    await expect(editPage.title).toBeVisible();
});

test('Выход из аккаунта', async ({ profilePage, authPage }) => {
    await profilePage.navigate();
    await profilePage.signOut();
    
    await expect(authPage.emailField).toBeVisible();
});