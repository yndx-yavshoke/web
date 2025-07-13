import { expect } from '@playwright/test';
import { test } from '../fixtures';

test.describe('Страница «Edit Profile»', () => {
    test.use({ storageState: 'tests/setup/.auth/user.json' });

    test.beforeEach(async ({ changeNamePage }) => {
        await test.step('Открыть страницу https://yavshok.ru/edit', async () => {
            await changeNamePage.open();
        })
    });

    test('Изменить имя', async ({ changeNamePage, page }) => {
        await changeNamePage.changeName('test');
        await changeNamePage.cancelButton.click(); // проверяем кнопку cancel ниже

        await expect(page.getByText('test', { exact: true })).toBeVisible();
    });

    test('Проверить кнопку «Назад»', async ({ changeNamePage, page }) => {
        await expect(changeNamePage.nameInput).toBeVisible();
        await changeNamePage.cancelButton.click();

        await expect(page.getByTestId('user-logout-button')).toBeVisible();
    });

    test('Изменить имя с пустыми значениями полей', async ({ changeNamePage, page }) => {
        await test.step('Очистить поле «Name» и нажать «Save Changes»', async () => {
            await expect(changeNamePage.nameInput).toBeVisible();
            await changeNamePage.nameInput.clear();
            await changeNamePage.saveChangesButton.click();
        });

        await test.step('Под полем ввода «Name» отображается текст «Name is required»', async () => {
            await expect(changeNamePage.page.getByText('Name is required', { exact: true })).toBeVisible();
        });
    });

});