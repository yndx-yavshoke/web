import { expect } from '@playwright/test';
import { test } from '../fixtures/index';

// Используем сохраненное состояние авторизации
test.use({ storageState: 'tests/setup/auth/user.json' });

test('Успешное изменение имени', async ({ editPage, page }) => {
    await test.step('Открыть страницу редактирования профиля', async () => {
        await editPage.open();
    });

    await test.step('Ввести новое имя и сохранить изменения', async () => {
        await editPage.saveChanges('Arisha');
    });

    await test.step('Проверить, что имя успешно изменилось', async () => {
        const newName = page.getByTestId('edit-name-input');
        await expect(newName).toHaveValue('Arisha');
    });
});

test('Проверка имени длиной >50 символов', async ({ editPage, page }) => {
    await test.step('Открыть страницу редактирования профиля', async () => {
        await editPage.open();
    });

    await test.step('Попытаться сохранить имя длиннее 50 символов', async () => {
        await editPage.saveChanges('Arishaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
    });

    await test.step('Проверить сообщение об ошибке валидации', async () => {
        await expect(page.getByText('Name must be less than 50 characters', { exact: true })).toBeVisible();
    });
});

test('Проверка кнопки Cancel', async ({ editPage }) => {
    await test.step('Открыть страницу редактирования профиля', async () => {
        await editPage.open();
    });

    await test.step('Нажать кнопку отмены изменений', async () => {
        await editPage.cancelChanges();
    });

    await test.step('Проверить переход на главную страницу', async () => {
        await expect(editPage.page).toHaveURL('/');
    });
});