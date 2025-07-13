import { test, expect } from '../src/fixtures/mainPage.fixture';


test.describe('Главная страница yavshok.ru', () => {
  test('Проверка существования email на главной странице', async ({ mainPage }) => {
    await mainPage.enterEmail('e.sheluddd@gmail.com');
    await expect(mainPage.shockedButton).toBeEnabled();
    await mainPage.shockedButton.click();

    await expect(mainPage.page.locator('text=Ты уже в ШОКе')).toBeVisible();

    await expect(mainPage.page.locator('img[src="/assets/assets/images/happyCat.dc65bea1e04c6d8f94d14b1d6f3c687f.gif"]')).toBeVisible();
  });

  test('Проверка сообщения при невалидном email', async ({ mainPage }) => {
    await mainPage.enterEmail('not-an-email');
    await expect(mainPage.shockedButton).toBeEnabled();
    await mainPage.shockedButton.click();

    await expect(mainPage.page.locator('text=Ты еще не в ШОКе')).toBeVisible();
  });

  test('Редирект на /login при нажатии на синюю кнопку "В шок"', async ({ mainPage }) => {
    await mainPage.enterEmail('test@example.com');
    await expect(mainPage.inShockButton).toBeEnabled();
    await mainPage.inShockButton.click();

    await expect(mainPage.page).toHaveURL(/\/login$/);
  });
}); 