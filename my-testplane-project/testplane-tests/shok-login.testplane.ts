import { LoginPage } from '../fixtures/LoginPage';
import { login } from '../auth/auth';

describe('Страница логина', () => {
  let page;

  beforeEach(function () {
    page = new LoginPage(this.browser);
  });

  it('Дефолтное состояние страницы входа', async function () {
    await page.open();
    await (await page.emailInput).waitForDisplayed();
    await (await page.passwordInput).waitForDisplayed();
    await (await page.loginButton).waitForDisplayed();
    await (await page.backButton).waitForDisplayed();
    await (await page.registerButton).waitForDisplayed();

    await this.browser.assertView('login-default', '#root div.css-175oi2r', {
      compositeImage: true,
    });
  });

  it('При пустых полях выводятся сообщения об ошибках', async function () {
    await page.open();
    const button = await page.loginButton;
    await button.waitForDisplayed();
    await button.click();
    const emailError = await page.emailError;
    await emailError.waitForDisplayed();
    const passwordError = await page.passwordError;
    await passwordError.waitForDisplayed();
    await this.browser.assertView('login-validation-errors', '#root div.css-175oi2r', {
      compositeImage: true,
    });
  });

  it('Фокус на поле Email', async function () {
    await page.open();
    const emailInput = await page.emailInput;
    await emailInput.waitForDisplayed();
    await emailInput.click();
    await this.browser.assertView('login-email-focused', '#root div.css-175oi2r', {
      compositeImage: true,
    });
  });

  it('Фокус на поле Пароль', async function () {
    await page.open();
    const passwordInput = await page.passwordInput;
    await passwordInput.waitForDisplayed();
    await passwordInput.click();
    await this.browser.assertView('login-password-focused', '#root div.css-175oi2r', {
      compositeImage: true,
    });
  });

  it('Ошибка входа при неверных данных', async function () {
    await page.open();
    const emailInput = await page.emailInput;
    await emailInput.waitForDisplayed();
    await emailInput.setValue('Cat@mail.ru');

    const passwordInput = await page.passwordInput;
    await passwordInput.waitForDisplayed();
    await passwordInput.setValue('123456');

    const loginButton = await page.loginButton;
    await loginButton.waitForDisplayed();
    await loginButton.click();
    const error = await page.wrongCredentialsError;
    await error.waitForDisplayed();
    await this.browser.assertView('login-error-wrong-credentials', '#root div.css-175oi2r', {
      compositeImage: true,
    });
  });

  it('Успешный логин', async function () {
    await login(this.browser, 'cat1@ya.ru', '123456');
    const userAvatar = await this.browser.$('[data-testid="user-avatar"]');
    await userAvatar.waitForDisplayed({ timeout: 10000 });
  });
});
