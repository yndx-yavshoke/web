import { test, expect } from '../fixtures/index';
import { generateRandomEmail, generateRandomPassword } from '../utils/dataGenerator';
import { defaultUser } from '../utils/client';


test.beforeEach(async ({ loginPage }) => {
  await loginPage.open();
  await expect(loginPage.title).toBeVisible();
});

test.describe('Авторизация', () => {

  test('Проверка авторизация', async ({ loginPage, profilePage}) => {
    await test.step('Успешный логин', async () => {
      await loginPage.login(defaultUser.email, defaultUser.password);
      await expect(profilePage.logoutButton).toBeVisible();
    });
  });

  test('Логин с неверными данными', async ({ loginPage }) => {
    await test.step('Ввод случайных email и пароля', async () => {
      await loginPage.login(generateRandomEmail(), generateRandomPassword());
      await expect(loginPage.errorMessage).toBeVisible();
    });
  });

  test('Логин с пустыми полями', async ({ loginPage }) => {
    await test.step('Оставить поля пустыми', async () => {
      await loginPage.login('', '');
      await expect(loginPage.emptyEmailError).toBeVisible();
      await expect(loginPage.emptyPasswordError).toBeVisible();
      });
  });


  test('Переход к регистрации', async ({ loginPage, registrationPage }) => {
    await test.step('Нажать "Зарегистрироваться"', async () => {
      await loginPage.registerButton.click();
      await expect(registrationPage.page).toHaveURL("/register");
      });
  });

});