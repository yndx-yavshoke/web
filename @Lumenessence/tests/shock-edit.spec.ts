import { expect } from '@playwright/test';
import { test } from '../Pages';
import { allure } from 'allure-playwright';

test.use({ storageState: 'tests/auth/user1.json' });

test.describe('Страница редактирования профиля', () => {
    test('редактирование имени пользователя', async ({ editPage, profilePage, page }) => {
        await allure.step('Открыть страницу редактирования профиля', async () => {
            await editPage.open();
        });
        await allure.step('Проверить отображение заголовка страницы', async () => {
            await expect(page.getByText('Edit Profile')).toBeVisible();
        });

        const newName = 'Глаза как космос'
        await allure.step(`Ввести новое имя: ${newName}`, async () => {
            await editPage.nameInput.fill(newName);
        });
        await allure.step('Сохранить изменения', async () => {
            await editPage.toSaveButtonClick();
        });
        await allure.step('Закрыть страницу редактирования', async () => {
            await editPage.toCancelButtonClick();
        });
        await allure.step('Перейти на страницу профиля для проверки изменений', async () => {
            await profilePage.open();
            await expect(page).toHaveURL('/');
        });
        await allure.step('Проверить, что имя пользователя изменилось', async () => {
            await expect(profilePage.userName).toHaveText(newName);
        });

        await allure.step('Восстановить стандартное имя для других тестов', async () => {
            await editPage.open();
            await editPage.nameInput.fill("Neko");
            await editPage.toSaveButtonClick();
            await editPage.toCancelButtonClick();
        });
    });

    test('видимость кнопки сохранения', async ({ editPage }) => {
        await editPage.open();
        await expect(editPage.saveButtonText).toBeVisible();
        await editPage.toSaveButtonClick();
    });

    test('видимость кнопки отмены', async ({ editPage }) => {
        await editPage.open();
        await expect(editPage.toCancelButton).toBeVisible();
        await editPage.toCancelButtonClick();
    });
});