import { expect } from '@playwright/test';
import { test } from '../fixtures/index';

test.beforeEach(async ({ registrPage }) => {
  await registrPage.open();
});

test('Отображение элементов на странице регистрации', async ({ registrPage }) => {
  await expect(registrPage.title).toBeVisible();
  await expect(registrPage.emailinput).toBeVisible();
  await expect(registrPage.passwordinput).toBeVisible();
  await expect(registrPage.ageinput).toBeVisible();
  await expect(registrPage.toRegistrButton).toBeVisible();
  await expect(registrPage.toBackButton).toBeVisible();
});

test('Все поля обязательные для заполнения', async ({ registrPage }) => {
  await registrPage.toRegistrButton.click();

  await expect(registrPage.page.getByText('Введите email')).toBeVisible();
  await expect(registrPage.page.getByText('Введите пароль')).toBeVisible();
});

test('Валидация email', async ({ registrPage }) => {
  const invalidEmails = ['test', 'test@', 'test@mail', 'test@mail.', 'test mail@example.com'];

  for (const email of invalidEmails) {
    await registrPage.emailinput.fill(email);
    await registrPage.toRegistrButton.click();
    await expect(registrPage.page.getByText('Неправильный email-адрес')).toBeVisible();
    await registrPage.page.reload();
  }

  // Проверка трима пробелов
  await registrPage.emailinput.fill('  test@mail.ru  ');
  await expect(registrPage.emailinput).toHaveValue('test@mail.ru');
});

test('Валидация пароля', async ({ registrPage }) => {
  await registrPage.passwordinput.fill('1234');
  await registrPage.toRegistrButton.click();
  await expect(
    registrPage.page.getByText('Пароль должен содержать минимум 6 символов'),
  ).toBeVisible();
});

test('Валидация возраста', async ({ registrPage }) => {
  // Невалидные значения
  const invalidAges = ['-1', 'abc', '1.5', ' '];
  for (const age of invalidAges) {
    await registrPage.ageinput.fill(age);
    await registrPage.toRegistrButton.click();
    await expect(registrPage.page.getByText('Возраст должен быть числом')).toBeVisible();
  }

  // Граничные значения
  await registrPage.ageinput.fill('0');
  await expect(registrPage.page.getByText('Возраст должен быть от 0 до 99')).not.toBeVisible();

  await registrPage.ageinput.fill('99');
  await expect(registrPage.page.getByText('Возраст должен быть от 0 до 99')).not.toBeVisible();
});

test('Проверка плейсхолдеров', async ({ registrPage }) => {
  await expect(registrPage.emailinput).toHaveAttribute('placeholder', 'Email');
  await expect(registrPage.passwordinput).toHaveAttribute('placeholder', 'Пароль');
  await expect(registrPage.ageinput).toHaveAttribute('placeholder', 'Возраст');

  // Проверка маски пароля
  await registrPage.passwordinput.fill('password');
  await expect(registrPage.passwordinput).toHaveAttribute('type', 'password');
});

test('Успешная регистрация нового пользователя', async ({ registrPage, profilePage }) => {
  await registrPage.emailinput.fill(`test+${Date.now()}@mail.ru`);
  await registrPage.passwordinput.fill('validpassword');
  await registrPage.ageinput.fill('25');
  await registrPage.toRegistrButton.click();

  await expect(profilePage.avatar).toBeVisible();
});
