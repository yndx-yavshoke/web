import { expect } from "@playwright/test";
import { test } from '../fixtures/index';
import { registeredEmail, registeredPassword, unregisteredEmail } from "../fixtures/user-data";
import { profile } from "console";
import { ShockProfilePage } from "../fixtures/ProfilePage";

//готово

test('Внешний вид и атрибуты элементов', async ({ loginPage }) => {
    await loginPage.open();

    await expect(loginPage.page, 'Открылась неверная страница').toHaveURL('/login')
    await expect(loginPage.title, 'Не отображается заголовк страницы смены имени').toBeVisible();
    await expect(loginPage.backButton, 'Не отображается кнопка "Назад"').toBeVisible();
    await expect(loginPage.loginButton, 'Не отображается кнопка логина').toBeVisible();
    await expect(loginPage.regNavigateButton, 'Не отображается кнопка перехода к регистрации').toBeVisible();
    await expect(loginPage.mailInput, 'Не отображается поле ввода эл. почты').toBeVisible();
    await expect(loginPage.passwordInput, 'Не отображается поле ввода пароля').toBeVisible();

    await expect(loginPage.backButton, 'Текст на кнопке "Назад" не совпадает с ожидаемым').toHaveText('Назад');
    await expect(loginPage.loginButton, 'Текст на кнопке логина не совпадает с ожидаемым').toHaveText('В шок');
    await expect(loginPage.regNavigateButton, 'Текст на кнопке перехода к регистрации не совпадает с ожидаемым').toHaveText('Регистрация');

    await expect(loginPage.mailInput, 'Неверный плейсхолдер в поле ввода эл. почты').toHaveAttribute('placeholder', 'Email');
    await expect(loginPage.mailInput, 'Неверный формат (type) у поля ввода эл. почты').toHaveAttribute('type', 'email');
    await expect(loginPage.mailInput, 'Поле ввода эл. почты недоступно для редактирвоания').toBeEditable();

    await expect(loginPage.passwordInput, 'Неверный плейсхолдер в поле ввода пароля').toHaveAttribute('placeholder', 'Пароль');
    await expect(loginPage.passwordInput, 'Неверный формат (type) у поля ввода пароля').toHaveAttribute('type', 'password');
    await expect(loginPage.passwordInput, 'Поле ввода пароля недоступно для редактирования').toBeEditable();
    
});

test('Логин зарегистрированного пользователя', async ({ loginPage }) => {
    await loginPage.open();

    await loginPage.loginToShok(registeredEmail, registeredPassword);
    
    await expect (loginPage.mailInput, 'Не произошел переход со страницы логина').not.toBeVisible();
    await expect (loginPage.page, 'Произошел переход со страницы логина на неверную страницу').toHaveURL('/');
});

test('Навигация со страницы логина на главную страницу', async ({ loginPage }) => {
    await loginPage.open();

    await loginPage.backButton.click();
    
    await expect(loginPage.mailInput, 'Не произошел переход со страницы логина').not.toBeVisible();
    await expect(loginPage.page, 'Произошел переход со страницы логина на неверную страницу').toHaveURL('/');
    await expect(loginPage.page.getByTestId('main-check-button'), 'Главная страница не отобразилась после перехода со страницы логина').toBeVisible();
});
