import { test } from '../../fixturies/index';
import { expect } from '@playwright/test';
import { faker } from '@faker-js/faker'

// Используем сохраненное состояние аутентификации
test.use({ storageState: './.auth/user.json' });

test.beforeEach(async ({ editPage }) => {
    await editPage.navigate();
    await expect(editPage.title).toBeVisible();
});

test('Успешное изменение имени', async ({ editPage, profilePage }) => {
    const newName = faker.person.firstName();
    
    await editPage.nameInput.fill(newName);
    await editPage.saveButton.click();
    
    // Проверяем, что вернулись на страницу профиля
    await expect(profilePage.actions.edit).toBeVisible();
});

test('Отмена изменения имени', async ({ editPage, profilePage }) => {
    const originalName = await editPage.nameInput.inputValue();
    
    await editPage.nameInput.fill('Новое имя');
    await editPage.cancelButton.click();
    
    // Проверяем, что имя не изменилось
    await expect(profilePage.actions.edit).toBeVisible();
    await expect(editPage.nameInput).toHaveValue(originalName);
});

test('Попытка сохранения пустого имени', async ({ editPage }) => {
    await editPage.clearName();
    await editPage.saveButton.click();
    
    await expect(editPage.nameError).toBeVisible();
});