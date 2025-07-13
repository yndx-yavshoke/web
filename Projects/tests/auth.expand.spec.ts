import { test, expect } from './fixtures/test-data.fixture';
import { LoginPage } from './pages/auth.page.extend';

test.describe('Тесты страницы Авторизации', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.open('/login');
  });

  test('Проверка наличия основных элементов формы', async () => {
    await test.step('Поле для ввода почты должно отображаться', async () => {
      await expect(loginPage.emailInput).toBeVisible();
      await expect(loginPage.emailInput).toHaveAttribute('type', 'email');
    });

    await test.step('Поле для ввода пароля должно отображаться', async () => {
      await expect(loginPage.passwordInput).toBeVisible();
      await expect(loginPage.passwordInput).toHaveAttribute('type', 'password');
    });

    await test.step('Кнопка "В Шок" должна быть доступна', async () => {
      await expect(loginPage.submitButton).toBeVisible();
      await expect(loginPage.submitButton).toBeEnabled();
    });

    await test.step('Кнопка "Назад" должна отображаться', async () => {
      await expect(loginPage.backButton).toBeVisible();
    });

    await test.step('Кнопка "Регистрация" должна быть доступна', async () => {
      await expect(loginPage.registrationButton).toBeVisible();
      await expect(loginPage.registrationButton).toHaveText('Регистрация');
    });
  });

  test.describe('Тесты возрастных проверок', () => {
    test('Авторизация молодого пользователя', async ({ page, loginUsers }) => {
      await test.step('Заполнить данные молодого пользователя', async () => {
        await loginPage.emailInput.fill(loginUsers.young_users.email);
        await loginPage.passwordInput.fill(loginUsers.young_users.password);
      });

      await test.step('Отправить форму', async () => {
        await loginPage.submitButton.click();
      });

      await test.step('Проверить сообщение для молодых пользователей', async () => {
        await expect(page.getByText('Ты молоденький котик')).toBeVisible();
      });

      await test.step('Сохранить состояние аутентификации', async () => {
        await page.context().storageState({ path: "./tests/auth-module/userInfo.json" });
      });
    });

    test('Авторизация пожилого пользователя', async ({ page, loginUsers }) => {
      await test.step('Заполнить данные пожилого пользователя', async () => {
        await loginPage.emailInput.fill(loginUsers.old_users.email);
        await loginPage.passwordInput.fill(loginUsers.old_users.password);
      });

      await test.step('Отправить форму', async () => {
        await loginPage.submitButton.click();
      });

      await test.step('Проверить доступ к профилю', async () => {
        await expect(page.getByText('Edit Profile')).toBeVisible();
      });

      await test.step('Проверить сообщение для пожилых пользователей', async () => {
        await expect(page.getByText('Ты старый котик')).toBeVisible();
      });
    });

    test('Авторизация взрослого пользователя', async ({ page, loginUsers }) => {
      await test.step('Заполнить данные взрослого пользователя', async () => {
        await loginPage.emailInput.fill(loginUsers.adult_users.email);
        await loginPage.passwordInput.fill(loginUsers.adult_users.password);
      });

      await test.step('Отправить форму', async () => {
        await loginPage.submitButton.click();
      });

      await test.step('Проверить кнопку выхода', async () => {
        await expect(page.getByTestId("user-logout-button")).toBeVisible();
      });
    });
  });
});