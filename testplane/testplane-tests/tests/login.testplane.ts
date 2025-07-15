import { AuthPage } from "../pages/authPage";

describe("Страница авторизации", () => {
  let authPage: AuthPage;

  beforeEach(async function () {
    await this.browser.url("/login");
    authPage = new AuthPage(this.browser);
  });

  describe("Дефолтное состояние", function () {
    it("Полная страница", async function () {
      await this.browser.assertView("login-page/default", "body");
    });

    it("Поле email", async function () {
      await this.browser.assertView("login-page/email-default", authPage.emailSelector);
    });

    it("Поле пароля", async function () {
      await this.browser.assertView("login-page/password-default", authPage.passwordSelector);
    });

    it("Кнопка входа", async function () {
      await this.browser.assertView("login-page/submit-default", authPage.submitSelector);
    });

    it("Кнопка назад", async function () {
      await this.browser.assertView("login-page/back-default", authPage.backSelector);
    });

    it("Кнопка регистрации", async function () {
      await this.browser.assertView("login-page/register-default", authPage.registerSelector);
    });
  });

  describe("Фокус", function () {
    it("На поле email", async function () {
      await (await authPage.emailInput).click();
      await this.browser.assertView("login-page/email-focused", authPage.emailSelector);
    });

    it("На поле пароля", async function () {
      await (await authPage.passwordInput).click();
      await this.browser.assertView("login-page/password-focused", authPage.passwordSelector);
    });

    it("На кнопке входа", async function () {
      await (await authPage.loginButton).click();
      await this.browser.assertView("login-page/submit-focused", authPage.submitSelector);
    });
  });

  describe("Ошибки", function () {
    it("Неверный логин и пароль", async function () {
      await (await authPage.emailInput).setValue("wrong@example.com");
      await (await authPage.passwordInput).setValue("wrongpassword");
      await (await authPage.loginButton).click();

      const error = await authPage.errorMsg;
      await error.waitForDisplayed();

      await this.browser.assertView("login-page/invalid-credentials-error", "body");

      await this.browser.url('/login');
    });
  });
});
