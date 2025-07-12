import { test, expect } from './fixtures/test-data.fixture';
import { MainPage } from './pages/main.page';

test.describe('Тесты Главной страницы', () => {
  let mainPage: MainPage;

  test.beforeEach(async ({ page }, testInfo) => {
    mainPage = new MainPage(page);
    await mainPage.open('/');
    
    if (testInfo.title.includes('проверка на шоковость')) {
      await page.evaluate(() => localStorage.clear());
    }
  });

  test('Проверка кнопки "В шок"', async () => {
    await expect(mainPage.buttonVShok).toBeVisible();
  });

  test('Проверка кнопки "Я в шоке?"', async () => {
    await expect(mainPage.buttonYaVShoke).toBeVisible();
  });

  test('Проверка поля для ввода email', async () => {
    await mainPage.checkEmailInput();
  });

  test('Проверка неактивного состояния кнопки', async () => {
    await mainPage.checkButtonDisabled();
  });

  test('Проверка ошибки при невалидном email', async ({ testUsersMainPage }) => {
    await mainPage.submitInvalidEmail(testUsersMainPage.invalid.email);
  });

  test('Проверка успешной авторизации', async ({ testUsersMainPage }) => {
    await mainPage.submitValidEmail(testUsersMainPage.valid.email);
  });
});