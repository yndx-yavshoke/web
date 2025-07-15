import { expect } from '@playwright/test';
import { test } from '../fixtures/index';
import { generateRandomName } from "../utils/dataGenerator";

test.use({ storageState: 'tests/setup/auth/user.json' })
test.describe('Проверка смены имени пользователя', () => {
    test('profile_should_change_name', async ({ nameEditor }) => {
        await test.step('Открыть редактор имени', async () => {
            await nameEditor.open();
        });
        let newName: string = generateRandomName();
        await test.step('Изменить имя. Сохранить изменения и нажать кнопку отменить', async () => {
            await nameEditor.changeName(newName);
            await nameEditor.cancelButton.click();
        });
        await test.step('Проверить, что имя изменилось', async () => {
            await expect(nameEditor.page.getByText(newName), 'Имя изменилось').toBeVisible();
        });
    });
});

test.describe('Проверка смены имени пользователя на пустую строку', () => {
    test('profile_should_not_change_name', async ({ nameEditor }) => {
        await test.step('Открыть редактор имени', async () => {
            await nameEditor.open();
        });
        await test.step('Попытаться сохранить пустое имя', async () => {
            await nameEditor.changeName('');
        });
        await test.step('Проверить ошибку о пустом имени', async () => {
            await expect(nameEditor.page.getByText('Name is required'), 'Должно появиться сообщение о необходимости ввести имя')
                .toBeVisible();
        });
    });
});

test.describe('Проверка элементов редактора', () => {
    test('name_editor_should_contain', async ({ nameEditor }) => {
        await test.step('Открыть редактор имени', async () => {
            await nameEditor.open();
        });
        await test.step('Проверить элементы редактора', async () => {
            await expect.soft(nameEditor.title, 'Заголовок редактора должен быть видимым').toBeVisible();
            await expect.soft(nameEditor.input, 'Поле ввода имени должно быть видно').toBeVisible();
            await expect.soft(nameEditor.input, 'Плейсхолдер поля ввода имени должен быть Enter your name')
                .toHaveAttribute('placeholder', 'Enter your name');
            await expect.soft(nameEditor.saveButton, 'Кнопка сохранения должна быть видимой').toBeVisible();
            await expect.soft(nameEditor.saveButton, 'Текст кнопки сохранения должен быть Save Changes')
                .toHaveText('Save Changes');
            await expect.soft(nameEditor.cancelButton, 'Кнопка отмены должна быть видимой').toBeVisible();
            await expect.soft(nameEditor.cancelButton, 'Текст кнопки отмены должен быть Cancel')
                .toHaveText('Cancel');
        });
    });
});