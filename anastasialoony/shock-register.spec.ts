import { expect } from '@playwright/test';
import { test } from '../fixtures/index';
import { faker } from '@faker-js/faker';
import authData from '../tests/setup/auth.json';

// Успешная регистрация
test.describe('positive test', () => {
  test('successful register test', async ({ registerPage, page }) => {
    await page.route('/', (route) => {
      route.fulfill({
        status: 200,
        body: JSON.stringify({})
      });
    });
    const randomEmail = faker.internet.email();
    const passwordLength = faker.number.int({ min: 5, max: 20 });
    const randomPassword = faker.internet.password({ length: passwordLength });
    const randomAge = faker.number.int({ min: 0, max: 99 }).toString();
    
    await registerPage.open();
    await registerPage.register(randomEmail, randomPassword, randomAge, true);
    
    await expect(page).toHaveURL('/');
  });
});

test.describe('negative tests', () => {
  test('empty input test', async ({ registerPage, page }) => {
    await page.route('/', (route) => {
      route.fulfill({
        status: 422,
        body: JSON.stringify({ 
          messages: [
            'Введите email',
            'Введите пароль',
            'Введите возраст'
          ]
        })
      });
    });
    await registerPage.open();
    await registerPage.register('', '', '', false);
    await expect(page.getByText('Введите email')).toBeVisible();
    await expect(page.getByText('Введите пароль')).toBeVisible();
    await expect(page.getByText('Введите возраст')).toBeVisible();
  });

  test('email already exists test', async ({ registerPage, page }) => {
    await page.route('/', (route) => {
      route.fulfill({
        status: 422,
        body: JSON.stringify({ message: 'Пользователь с таким email уже существует' })
      });
    });
    await registerPage.open();
    const userDataItem = authData.origins[0].localStorage.find(item => item.name === 'UserData');
    if (!userDataItem) throw new Error('UserData not found in auth.json');
    const userData = JSON.parse(userDataItem.value);
    const email = userData.email;

    const randomPassword = faker.internet.password({ length: 10 });
    const randomAge = faker.number.int({ min: 0, max: 99 }).toString();

    await registerPage.register(email, randomPassword, randomAge, false);
    await expect(page.getByText('Пользователь с таким email уже существует')).toBeVisible();
  });

  test('invalid email test', async ({ registerPage, page }) => {
    await page.route('/', (route) => {
      route.fulfill({
        status: 422,
        body: JSON.stringify({ message: 'Неправильный email-адрес' })
      });
    });
    await registerPage.open();

    const validPassword = faker.internet.password({ length: 10 });
    const validAge = faker.number.int({ min: 18, max: 99 }).toString();
    const invalidEmail = faker.internet.userName();

    await registerPage.register(invalidEmail, validPassword, validAge, false);
    await expect(page.getByText('Неправильный email-адрес')).toBeVisible();
  });
  test('email without @ test', async ({ registerPage, page }) => {
    await page.route('/', (route) => {
      route.fulfill({
        status: 422,
        body: JSON.stringify({ message: 'Неправильный email-адрес' })
      });
    });
    await registerPage.open();
    
    const validPassword = faker.internet.password({ length: 10 });
    const validAge = faker.number.int({ min: 18, max: 99 }).toString();
    const validEmail = faker.internet.email();
    const invalidEmail = validEmail.replace('@', '');

    await registerPage.register(invalidEmail, validPassword, validAge, false);
    await expect(page.getByText('Неправильный email-адрес')).toBeVisible();
  });
  test('email without domain test', async ({ registerPage, page }) => {
    await page.route('/', (route) => {
      route.fulfill({
        status: 422,
        body: JSON.stringify({ message: 'Неправильный email-адрес' })
      });
    });
    await registerPage.open();
    
    const validPassword = faker.internet.password({ length: 10 });
    const validAge = faker.number.int({ min: 18, max: 99 }).toString();
    const validEmail = faker.internet.email();
    const invalidEmail = validEmail.replace(/\.[a-z]+$/, '');

    await registerPage.register(invalidEmail, validPassword, validAge, false);
    await expect(page.getByText('Неправильный email-адрес')).toBeVisible();
  });

  test('short password test', async ({ registerPage, page }) => {
    await page.route('/', (route) => {
      route.fulfill({
        status: 422,
        body: JSON.stringify({ message: 'Пароль должен содержать минимум 6 символов'})
      });
    });
      await registerPage.open();

      const validEmail1 = faker.internet.email();
      const validAge1 = faker.number.int({ min: 18, max: 99 }).toString();
      const shortLength = faker.number.int({ min: 0, max: 5 });
      const shortPassword = faker.internet.password({ length: shortLength });

      await registerPage.register(validEmail1, shortPassword, validAge1, false);
      await expect(registerPage.invalidPasswordText).toBeVisible();
    });
});
