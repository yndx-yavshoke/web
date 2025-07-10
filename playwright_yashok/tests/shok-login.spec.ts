import { expect } from '@playwright/test';
import { test } from '../fixtures/index';

test.beforeEach(async ({ loginPage }) => {
  await loginPage.open();
});

test('Отображение элементов на странице авторизации', async ({ loginPage }) => {
  await expect(loginPage.title).toBeVisible();
  await expect(loginPage.emailinput).toBeVisible();
  await expect(loginPage.passwordinput).toBeVisible();
  await expect(loginPage.toLoginButton).toBeVisible();
  await expect(loginPage.toBackButton).toBeVisible();
  await expect(loginPage.toRegisterButton).toBeVisible();
});

test('Валидация обязательных полей', async ({ loginPage }) => {
  await loginPage.toLoginButton.click();
  await expect(loginPage.page.getByText('Введите email')).toBeVisible();
  await expect(loginPage.page.getByText('Введите пароль')).toBeVisible();
});

test('Обработка неверного пароля', async ({ loginPage }) => {
  await loginPage.emailinput.fill('yassbar@mail.ru');
  await loginPage.passwordinput.fill('wrongpassword');
  await loginPage.toLoginButton.click();
  await expect(loginPage.page.getByText('Неправильный логин или пароль')).toBeVisible();
});

test('Кнопка "Войти" ведёт на страницу профиля при успешной авторизации', async ({
  loginPage,
  profilePage,
}) => {
  await loginPage.emailinput.fill('yassbar@mail.ru');
  await loginPage.passwordinput.fill('1234567');
  await loginPage.toLoginButton.click();
  await expect(profilePage.avatar).toBeVisible();
});

test('Кнопка "Назад" ведёт на главную страницу', async ({ loginPage, mainPage }) => {
  await loginPage.toBackButton.click();
  await expect(mainPage.title).toBeVisible();
});

test('Кнопка "Регистрация" ведёт на страницу регистрации', async ({ loginPage, registrPage }) => {
  await loginPage.toRegisterButton.click();
  await expect(registrPage.title).toBeVisible();
});

test('Проверка плейсхолдеров полей ввода', async ({ loginPage }) => {
  await expect(loginPage.emailinput).toHaveAttribute('placeholder', 'Email');
  await expect(loginPage.passwordinput).toHaveAttribute('placeholder', 'Пароль');
});
