import { expect } from '@playwright/test';

import { test } from '@common/test';
import { AUTH_PATH_STORAGE } from '@common/constants';

test.describe('Страница «Edit Profile»', () => {
    test.use({ storageState: AUTH_PATH_STORAGE });

    test.beforeEach(async ({ changeNamePage }) => {
        await test.step('Открыть страницу https://yavshok.ru/edit', async () => {
            await changeNamePage.open();
        });
    });

    test('Изменить имя', async ({ changeNamePage, page }) => {
        await changeNamePage.changeName('test');
        await changeNamePage.model.cancelButton.click();

        await expect(page.getByText('test', { exact: true })).toBeVisible();
    });

    test('Проверить кнопку «Назад»', async ({ changeNamePage, page, profilePage }) => {
        await expect(changeNamePage.model.nameInput).toBeVisible();

        await changeNamePage.model.cancelButton.click();

        await expect(profilePage.model.logoutButton).toBeVisible();
    });

    test('Изменить имя с пустыми значениями полей', async ({ changeNamePage, page }) => {
        await test.step('Очистить поле «Name» и нажать «Save Changes»', async () => {
            await expect(changeNamePage.model.nameInput).toBeVisible();

            await changeNamePage.model.nameInput.clear();
            await changeNamePage.model.saveButton.click();
        });

        await test.step('Под полем ввода «Name» отображается текст «Name is required»', async () => {
            await expect(changeNamePage.model.suggestText).toBeVisible();
        });
    });
});
