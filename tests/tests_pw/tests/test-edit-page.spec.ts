import { expect } from "@playwright/test";
import { test } from '../fixtures/index'

test.use({ storageState: "tests/setup/.auth/user.json" });

test('Редактирование имени пользователя', async ({ editPage, profilePage }) => {
    const newName = 'new name'

    await test.step('Открываем страницу редактирования имени', async () => {
        await editPage.open();
    });
    await test.step('Проверяем заголовок', async () => {
        await expect(editPage.title).toBeVisible();
    });
    await test.step('Проверяем, что поле для редактирования имени отображается', async () => {
        await expect(editPage.inputName).toBeVisible();
    });
    await test.step('Меняем имя на new name', async () => {
        await editPage.editName(newName);
    });
    await test.step('Проверяем, что имя сохранилось', async () => {
        await expect(editPage.textSaving).not.toBeVisible();
    });
    await test.step('Открываем страницу профиля', async () => {
        await profilePage.open()
    });
    await test.step('Проверяем, что открылась страница профиля', async () => {
        await expect(editPage.page).toHaveURL('/');
    });
    await test.step('Проверяем, что имя изменилось', async () => {
        await expect(editPage.page.getByText(newName)).toHaveText(newName);
    });
})

test('Отмена редактирования имени пользователя', async ({ editPage, profilePage }) => {
    const newName = 'Neko'

    await test.step('Открываем страницу редактирования имени', async () => {
        await editPage.open();
    });
    await test.step('Проверяем заголовок', async () => {
        await expect(editPage.title).toBeVisible();
    });
    await test.step('Проверяем, что поле для редактирования имени отображается', async () => {
        await expect(editPage.inputName).toBeVisible();
    });
    await test.step('Отменяем редактирование имени Neko', async () => {
        await editPage.cancelEditName(newName);
    });
    await test.step('Открываем страницу профиля', async () => {
        await profilePage.open();
    });
    await test.step('Проверяем, что открылась страница профиля', async () => {
        await expect(editPage.page).toHaveURL('/');
    });
    await test.step('Проверяем, что имя new name не поменялось на Neko', async () => {
        await expect(profilePage.page.getByText('new name')).toBeVisible();
    });
})

test('Попытка имзменения имени пользователя на пустое', async ({ editPage }) => {
    await test.step('Открываем страницу редактирования имени', async () => {
        await editPage.open();
    });
    await test.step('Проверяем заголовок', async () => {
        await expect(editPage.title).toBeVisible();
    });
    await test.step('Проверяем, что поле для редактирования имени отображается', async () => {
        await expect(editPage.inputName).toBeVisible();
    });
    await test.step('Очищаем поле ввода для имени', async () => {
        await editPage.clearInput();
    });
    await test.step('Проверяем, что плейсхолдер отображается', async () => {
        await expect(editPage.toPlaceholder).toBeVisible();
    });
    await test.step('Нажимаем на кнопку для сохранения изменений', async () => {
        await editPage.toSaveChangesButton.click();
    });
    await test.step('Проверяем, что отобразилось сообщение об ошибке', async () => {
        await expect(editPage.toErrorMessageEmpty).toBeVisible();
    });
})

test('Попытка имзменения имени пользователя на пробел', async ({ editPage }) => {
    const newName = ' '
    await test.step('Открываем страницу редактирования имени', async () => {
        await editPage.open();
    });
    await test.step('Проверяем заголовок', async () => {
        await expect(editPage.title).toBeVisible();
    });
    await test.step('Проверяем, что поле для редактирования имени отображается', async () => {
        await expect(editPage.inputName).toBeVisible();
    });
    await test.step('Меняем имя пользователя на пробел', async () => {
        await editPage.editName(newName);
    });
    await test.step('Проверяем, что имя сохранилось', async () => {
        await expect(editPage.textSaving).not.toBeVisible();
    });
    await test.step('Проверяем, что отобразилось сообщение об ошибке', async () => {
        await expect(editPage.toErrorMessage).toBeVisible();
    });
})

test('Проверка наличия плейсхолдера', async ({ editPage }) => {
    await test.step('Открываем страницу редактирования имени', async () => {
        await editPage.open();
    });
    await test.step('Проверяем заголовок', async () => {
        await expect(editPage.title).toBeVisible();
    });
    await test.step('Проверяем, что поле для редактирования имени отображается', async () => {
        await expect(editPage.inputName).toBeVisible();
    });
    await test.step('Очищаем поле ввода для имени', async () => {
        await editPage.clearInput();
    });
    await test.step('Проверяем, что плейсхолдер отображается', async () => {
        await expect(editPage.toPlaceholder).toBeVisible();
    });
})