import { expect } from '@playwright/test';
import { test } from '../fixtures/index';

test.describe('Страница авторизации', () => {
  test.beforeEach(async ({ loginPage }) => {
    await test.step('Открыть страницу https://yavshok.ru/login', async () => {
      await loginPage.open()
    })
  })

  test('Проверка наличия полей ввода на экране', async ({ loginPage }) => {
    await test.step('Отображается заголовок на странице', async () => {
      await expect(loginPage.title).toBeVisible()
    })
    await test.step('Отображается поле ввода почты', async () => {
      await expect(loginPage.loginEmailInput).toBeVisible()
    })
    await test.step('Отображается поле ввода пароля', async () => {
      await expect(loginPage.loginPasswordInput).toBeVisible()
    })
  });

  test('Проверка отображения ошибки при вводе неверного логина и пароля', async ({ loginPage }) => {
    await test.step('Ввод рандомной почты и нажатие кнопки В шок', async () => {
      await loginPage.loginNotAuthorizedUser()
    })
    await test.step('Отображение ошибки Неправильный логин или пароль', async () => {
      await expect(loginPage.wrongLoginOrPasswordLabel).toBeVisible()
    })
  });

  test('Проверка перехода на страницу регистрации по нажатию на кнопку "Регистрация"', async ({ page, loginPage }) => {
    await test.step('Кнопка Регистрация отображается на странице', async () => {
      await expect(loginPage.loginRegisterButton).toBeVisible();
    })
    await test.step('Нажать на кнопку Регистрация', async () => {
      await loginPage.loginRegisterButton.click()
    })
    await test.step('Отображается страница Регистрации', async () => {
      await expect(page).toHaveURL('https://yavshok.ru/register')
    })
  });
})
