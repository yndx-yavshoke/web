const { validEmail, validPassword } = require('../secrets/user');

describe('Страница логина yavshok.ru', function() {
  let emailInput: WebdriverIO.Element;
  let passwordInput: WebdriverIO.Element;
  let submitButton: WebdriverIO.Element;
  let backButton: WebdriverIO.Element;
  let registerButton: WebdriverIO.Element;

  let invalidEmail: string;
  let invalidPassword: string;

  beforeEach(async function ({ browser }) {
    await browser.url('/login');
    emailInput = await browser.$("[data-testid='login-email-input']");
    passwordInput = await browser.$("[data-testid='login-password-input']");
    submitButton = await browser.$("[data-testid='login-submit-button']");
    backButton = await browser.$("[data-testid='login-back-button']");
    registerButton = await browser.$("[data-testid='login-register-button']");

    invalidEmail = "bnbnbnb@w.w"; 
    invalidPassword = "none";
  });

  it('поле ввода email', async function({ browser }) {
    await emailInput.assertView("no-focused-field");
    await emailInput.click();
    await emailInput.assertView("focused-field");
  });

  it('поле ввода пароля', async function({ browser }) {
    await passwordInput.assertView("no-focused-field");
    await passwordInput.click();
    await passwordInput.assertView("focused-field");
  });

  it('кнопка В шок', async function({ browser }) {
    await submitButton.assertView("default");
  });

  it('кнопка Назад', async function({ browser }) {
    await backButton.assertView("default");
  });

  it('кнопка Регистрация', async function({ browser }) {
    await registerButton.assertView("default");
  });

  it('ошибка при невалидном email', async function({ browser }) {
    await emailInput.setValue("not-an-email");
    await passwordInput.setValue(validPassword);
    await submitButton.click();
    // Ожидаем появления ошибки для email (по тексту)
    const emailError = await browser.$("//*[contains(text(), 'Произошла ошибка')]");
    await emailError.waitForDisplayed();
    await emailError.assertView("invalid-email-error");
  });

  it('ошибка при неправильном пароле', async function({ browser }) {
    await emailInput.setValue(validEmail);
    await passwordInput.setValue(invalidPassword);
    await submitButton.click();
    // Ожидаем появления ошибки для пароля или общей ошибки
    const passwordError = await browser.$("//*[contains(text(), 'Неправильный логин или пароль')]");
    await passwordError.waitForDisplayed();
    // Делаем скриншот общего родительского div для полей формы и ошибок
    const formContainer = await browser.$("//input[@data-testid='login-email-input']/ancestor::div[4]");
    await formContainer.assertView("invalid-password-form");
  });
});
