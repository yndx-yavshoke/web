import { test, expect } from './fixtures/test-data.fixture';
import { MainPage } from './pages/main.page';

test.describe('Тесты Главной страницы', () => {
  let mainPage: MainPage;

  test.beforeEach(async ({ page }, testInfo) => {
    mainPage = new MainPage(page);
    await test.step('Открыть главную страницу', async () => {
      await mainPage.open('/');
    });

    if (testInfo.title.includes('проверка на шоковость')) {
      await test.step('Очистить localStorage', async () => {
        await page.evaluate(() => localStorage.clear());
      });
    }
  });

  test('Проверка видимости кнопки "В шок"', async () => {
    await test.step('Кнопка "В шок" должна отображаться', async () => {
      await expect(mainPage.buttonVShok).toBeVisible();
      await expect(mainPage.buttonVShok).toHaveText('В шок'); // Добавлена проверка текста
    });
  });

  test('Проверка видимости кнопки "Я в шоке?"', async () => {
    await test.step('Кнопка "Я в шоке?" должна отображаться', async () => {
      await expect(mainPage.buttonYaVShoke).toBeVisible();
      await expect(mainPage.buttonYaVShoke).toHaveText('Я в шоке?'); // Добавлена проверка текста
    });
  });

  test('Проверка поля для ввода email', async () => {
    await test.step('Поле email должно быть доступно', async () => {
      await expect(mainPage.emailInput).toBeEditable();
      await expect(mainPage.emailInput).toHaveAttribute('type', 'email'); // Проверка типа поля
    });
  });

  test('Проверка неактивного состояния кнопки', async () => {
    await test.step('Кнопка должна быть неактивна при пустом поле email', async () => {
      await expect(mainPage.submitButton).toBeDisabled();
      await expect(mainPage.submitButton).toHaveCSS('cursor', 'not-allowed'); // Проверка стилей
    });
  });

  test('Проверка ошибки при невалидном email', async ({ testUsersMainPage }) => {
    await test.step('Ввести невалидный email', async () => {
      await mainPage.emailInput.fill(testUsersMainPage.invalid.email);
    });

    await test.step('Отправить форму', async () => {
      await mainPage.submitButton.click();
    });

    await test.step('Проверить сообщение об ошибке', async () => {
      await expect(mainPage.errorMessage).toBeVisible();
      await expect(mainPage.errorMessage).toContainText('Некорректный email'); // Уточнение текста
    });
  });

  test('Проверка успешной авторизации', async ({ testUsersMainPage }) => {
    await test.step('Ввести валидный email', async () => {
      await mainPage.emailInput.fill(testUsersMainPage.valid.email);
    });

    await test.step('Отправить форму', async () => {
      await mainPage.submitButton.click();
    });

    await test.step('Проверить успешную авторизацию', async (page) => {
     
      await expect(mainPage.page).toHaveURL("/");
      await expect(mainPage.successMessage).toBeVisible();
      await expect(mainPage.userAvatar).toBeVisible();

    });
  });
});