import { expect } from "@playwright/test";
import { test } from '../fixtures/index';
import { newName, registeredEmail, registeredPassword, unregisteredEmail } from "../fixtures/user-data";
import { profile } from "console";
import { ShockProfilePage } from "../fixtures/ProfilePage";


test.use({ storageState: 'tests/setup/.auth/user.json' });

test('Внешний вид и атрибуты элементов', async ({ changeNamePage }) => {
    await changeNamePage.open();

    await expect(changeNamePage.page, 'Открылась неверная страница').toHaveURL('/edit')
    await expect(changeNamePage.title, 'Не отображается заголовок страницы смены имени').toBeVisible();
    await expect(changeNamePage.saveButton, 'Не отображается кнопка сохранения имени').toBeVisible();
    await expect(changeNamePage.cancelButton, 'Не отображается кнопка отмены').toBeVisible();
    await expect(changeNamePage.nameInput, 'Не отображается поле ввода имени').toBeVisible();
    await expect(changeNamePage.inputLabel, 'Не отображается подпись над полем смены имени').toBeVisible();

    await expect(changeNamePage.saveButton, 'Название кнопки сохранения не совпадает с ожидаемым').toHaveText('Save Changes');
    await expect(changeNamePage.cancelButton, 'Название кнопки отмены не совпадает с ожидаемым').toHaveText('Cancel');

    await expect(changeNamePage.nameInput, 'Поле ввода имени не доступно для редактироания').toBeEditable();
  
});

test('Успешная смена имени', async ({ changeNamePage }) => {
    await changeNamePage.open();

    //const oldName = String(changeNamePage.nameInput.inputValue());
    const oldName = 'Fan'
    await changeNamePage.changeName(newName);

    await expect(changeNamePage.nameInput, 'Не удалось ввести имя в поле ввода имени').toHaveValue(newName);
    await expect(changeNamePage.saveButton, 'Не удалось сохранить имя').toHaveText('Save Changes');
    await changeNamePage.cancelButton.click();
    await expect(changeNamePage.page.getByTestId('user-logout-button'), 'Не произошел переход на страницу профиля').toBeVisible();
    await expect(changeNamePage.page.getByText(newName), 'На странице профиля не отображается новое имя').toBeVisible();

    // и вернем на место для будущих тестов
    await changeNamePage.open();

    await changeNamePage.changeName(oldName);
    await changeNamePage.cancelButton.click();
    await expect(changeNamePage.page.getByText(oldName)).toBeVisible();
    
});

test('Ошибка при смене имени на пустое поле', async ({ changeNamePage }) => {
    await changeNamePage.open();
    await changeNamePage.changeName('');
    await expect(changeNamePage.errorNameTooShort, 'Не отображаетс подсказка об ошибке при попытке сменрить имя на пустое').toBeVisible();

});
