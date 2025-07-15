const { validEmail, validPassword } = require("../secrets/user");

describe("Страница регистрации yavshok.ru", function () {
  let emailInput: WebdriverIO.Element;
  let passwordInput: WebdriverIO.Element;
  let ageInput: WebdriverIO.Element;
  let submitButton: WebdriverIO.Element;
  let backButton: WebdriverIO.Element;

  let validAge: string;
  let invalidEmail: string;
  let invalidPassword: string;
  let invalidAge: string;

  beforeEach(async function ({ browser }) {
    await browser.url("/register");
    emailInput = await browser.$("[data-testid='register-email-input']");
    passwordInput = await browser.$("[data-testid='register-password-input']");
    ageInput = await browser.$("[data-testid='register-age-input']");
    submitButton = await browser.$("[data-testid='register-submit-button']");
    backButton = await browser.$("[data-testid='register-back-button']");

    validAge = "25";
    invalidEmail = "not-an-email";
    invalidPassword = "123";
    invalidAge = "abc";
  });

  it("поле ввода email", async function ({ browser }) {
    await emailInput.assertView("no-focused-field");
    await emailInput.click();
    await emailInput.assertView("focused-field");
  });

  it("поле ввода пароля", async function ({ browser }) {
    await passwordInput.assertView("no-focused-field");
    await passwordInput.click();
    await passwordInput.assertView("focused-field");
  });

  it("поле ввода возраста", async function ({ browser }) {
    await ageInput.assertView("no-focused-field");
    await ageInput.click();
    await ageInput.assertView("focused-field");
  });

  it("кнопка Зарегистрироваться", async function ({ browser }) {
    await submitButton.assertView("default");
  });

  it("кнопка Назад", async function ({ browser }) {
    await backButton.assertView("default");
  });

  it("ошибка при невалидном email", async function ({ browser }) {
    await emailInput.setValue(invalidEmail);
    await passwordInput.setValue(validPassword);
    await ageInput.setValue(validAge);
    await submitButton.click();
    const emailError = await browser.$(
      "//*[contains(text(), 'Неправильный email-адрес')]"
    );
    await emailError.waitForDisplayed();
    await emailError.assertView("invalid-email-error");
  });

  it("ошибка при коротком пароле", async function ({ browser }) {
    await emailInput.setValue(validEmail);
    await passwordInput.setValue(invalidPassword);
    await ageInput.setValue(validAge);
    await submitButton.click();
    const passwordError = await browser.$(
      "//*[contains(text(), 'Пароль должен содержать минимум 6 символов')]"
    );
    await passwordError.waitForDisplayed();
    await passwordError.assertView("invalid-password-error");
  });

  it("ошибка при невалидном возрасте", async function ({ browser }) {
    await emailInput.setValue(validEmail);
    await passwordInput.setValue(validPassword);
    await ageInput.setValue(invalidAge);
    await submitButton.click();
    const ageError = await browser.$(
      "//*[contains(text(), 'Возраст должен быть числом')]"
    );
    await ageError.waitForDisplayed();
    await ageError.assertView("invalid-age-error");
  });

  it("ошибки при пустых полях", async function ({ browser }) {
    // Получаем контейнер формы (4-й ancestor от emailInput)
    const formContainer = await browser.$(
      "//input[@data-testid='register-email-input']/ancestor::div[4]"
    );
    // Пустой email
    await emailInput.setValue("");
    // Пустой пароль
    await passwordInput.setValue("");
    // Пустой возраст
    await ageInput.setValue("");
    await submitButton.click();
    await formContainer.assertView("empty-age-form");
  });
});
