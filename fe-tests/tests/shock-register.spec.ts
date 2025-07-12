import { expect } from '@playwright/test';
import { test } from '../fixtures/index';
import { faker } from '@faker-js/faker';
import authData from '../tests/setup/auth.json';
import { allure } from 'allure-playwright';


test.describe('Проверка успешной регистрации', () => {
  test('Успешная регистрация', async ({ registerPage, page }) => {
    await allure.step('Настроить мок для успешной регистрации', async () => {
      await page.route('/', (route) => {
        route.fulfill({
          status: 200,
          body: JSON.stringify({})
        });
      });
    });
    
    const randomEmail = faker.internet.email();
    const passwordLength = faker.number.int({ min: 6, max: 20 });
    const randomPassword = faker.internet.password({ length: passwordLength });
    const randomAge = faker.number.int({ min: 0, max: 99 }).toString();
    
    await allure.step('Открыть страницу регистрации', async () => {
      await registerPage.open();
    });
    await allure.step(`Зарегистрировать пользователя с email: ${randomEmail}`, async () => {
      await registerPage.register(randomEmail, randomPassword, randomAge, true);
    });
    await allure.step('Проверить перенаправление на главную страницу', async () => {
      await expect(page).toHaveURL('/');
    });
  });
});

test.describe('Негативные тесты', () => {
  test('Попытка оставить поля для ввода пустыми', async ({ registerPage, page }) => {
    await allure.step('Настроить мок для ошибки пустых полей', async () => {
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
    });
    await allure.step('Открыть страницу регистрации', async () => {
      await registerPage.open();
    });
    await allure.step('Попытаться зарегистрироваться с пустыми полями', async () => {
      await registerPage.register('', '', '', false);
    });
    await allure.step('Проверить отображение ошибок валидации', async () => {
      await expect(page.getByText('Введите email')).toBeVisible();
      await expect(page.getByText('Введите пароль')).toBeVisible();
      await expect(page.getByText('Введите возраст')).toBeVisible();
    });
  });

  test('Попытка зарегистрироваться с существующим email', async ({ registerPage, page }) => {
    await allure.step('Настроить мок для ошибки существующего email', async () => {
      await page.route('/', (route) => {
        route.fulfill({
          status: 422,
          body: JSON.stringify({ message: 'Пользователь с таким email уже существует' })
        });
      });
    });
    await allure.step('Открыть страницу регистрации', async () => {
      await registerPage.open();
    });
    const userDataItem = authData.origins[0].localStorage.find(item => item.name === 'UserData');
    if (!userDataItem) throw new Error('UserData not found in auth.json');
    const userData = JSON.parse(userDataItem.value);
    const email = userData.email;

    const randomPassword = faker.internet.password({ length: 10 });
    const randomAge = faker.number.int({ min: 0, max: 99 }).toString();

    await allure.step(`Попытаться зарегистрироваться с существующим email: ${email}`, async () => {
      await registerPage.register(email, randomPassword, randomAge, false);
    });
    await allure.step('Проверить отображение ошибки о существующем пользователе', async () => {
      await expect(page.getByText('Пользователь с таким email уже существует')).toBeVisible();
    });
  });

  test('Попытка зарегистрироваться с email без @ и домена', async ({ registerPage, page }) => {
    await allure.step('Настроить мок для ошибки неправильного email', async () => {
      await page.route('/', (route) => {
        route.fulfill({
          status: 422,
          body: JSON.stringify({ message: 'Неправильный email-адрес' })
        });
      });
    });
    await allure.step('Открыть страницу регистрации', async () => {
    await registerPage.open();
    });

    const validPassword = faker.internet.password({ length: 10 });
    const validAge = faker.number.int({ min: 18, max: 99 }).toString();
    const invalidEmail = faker.internet.userName();

    await allure.step(`Попытаться зарегистрироваться с некорректным email: ${invalidEmail}`, async () => {
      await registerPage.register(invalidEmail, validPassword, validAge, false);
    });
    
    await allure.step('Проверить отображение ошибки о неправильном email', async () => {
      await expect(page.getByText('Неправильный email-адрес')).toBeVisible();
    });
  });
  
  test('Попытка зарегистрировать email без символа @', async ({ registerPage, page }) => {
    await allure.step('Настроить мок для ошибки неправильного email', async () => {
      await page.route('/', (route) => {
        route.fulfill({
          status: 422,
          body: JSON.stringify({ message: 'Неправильный email-адрес' })
        });
      });
    });
    await allure.step('Открыть страницу регистрации', async () => {
    await registerPage.open();
    });
    
    const validPassword = faker.internet.password({ length: 10 });
    const validAge = faker.number.int({ min: 18, max: 99 }).toString();
    const validEmail = faker.internet.email();
    const invalidEmail = validEmail.replace('@', '');

    await allure.step(`Попытаться зарегистрироваться с email без @: ${invalidEmail}`, async () => {
      await registerPage.register(invalidEmail, validPassword, validAge, false);
    });
    await allure.step('Проверить отображение ошибки о неправильном email', async () => {
      await expect(page.getByText('Неправильный email-адрес')).toBeVisible();
    });
  });
  
  test('Попытка зарегистрировать email без домена', async ({ registerPage, page }) => {
    await allure.step('Настроить мок для ошибки неправильного email', async () => {
      await page.route('/', (route) => {
        route.fulfill({
          status: 422,
          body: JSON.stringify({ message: 'Неправильный email-адрес' })
        });
      });
    });
    await allure.step('Открыть страницу регистрации', async () => {
      await registerPage.open();
    });
    
    const validPassword = faker.internet.password({ length: 10 });
    const validAge = faker.number.int({ min: 18, max: 99 }).toString();
    const validEmail = faker.internet.email();
    const invalidEmail = validEmail.replace(/\.[a-z]+$/, '');

    await allure.step(`Попытаться зарегистрировать email без домена: ${invalidEmail}`, async () => {
      await registerPage.register(invalidEmail, validPassword, validAge, false);
    });
    
    await allure.step('Проверить отображение ошибки о неправильном email', async () => {
      await expect(page.getByText('Неправильный email-адрес')).toBeVisible();
    });
  });

  test('Попытка зарегистрироваться со слишком коротким паролем', async ({ registerPage, page }) => {
    await allure.step('Настроить мок для ошибки короткого пароля', async () => {
      await page.route('/', (route) => {
        route.fulfill({
          status: 422,
          body: JSON.stringify({ message: 'Пароль должен содержать минимум 6 символов'})
        });
      });
    });
    await allure.step('Открыть страницу регистрации', async () => {
    await registerPage.open();
    });

    const validEmail1 = faker.internet.email();
    const validAge1 = faker.number.int({ min: 18, max: 99 }).toString();
    const shortLength = faker.number.int({ min: 1, max: 5 });
    const shortPassword = faker.internet.password({ length: shortLength });

    await allure.step(`Попытаться зарегистрироваться с коротким паролем (${shortLength} символов)`, async () => {
      await registerPage.register(validEmail1, shortPassword, validAge1, false);
    });
    await allure.step('Проверить отображение ошибки о коротком пароле', async () => {
      await expect(registerPage.invalidPasswordText).toBeVisible();
    });
  });
}); 
