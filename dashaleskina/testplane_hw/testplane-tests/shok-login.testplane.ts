import { faker } from "@faker-js/faker";

describe("Визуальные состояния формы входа при разных параметрах", () => {
  const utils = {
    open: async function ({ browser }) {
      await browser.url("/login");
    },
    clickLoginButton: async function ({ browser }) {
      await browser.$('[data-testid="login-submit-button"]').click();
    },
    fillEmailInput: async function ({ browser, email }) {
      await browser.$('[data-testid="login-email-input"]').setValue(email);
    },
    fillPasswordInput: async function ({ browser, password }) {
      await browser
        .$('[data-testid="login-password-input"]')
        .setValue(password);
    },
    makeFullFormScreen: async function ({ browser, screenName }) {
      await browser.assertView(
        screenName,
        './/input[@data-testid="login-email-input"]/ancestor::div[1]'
      );
    },
  };

  beforeEach(async ({ browser }) => {
    await utils.open({ browser });
  });

  it("Дефолтное состояние формы", async ({ browser }) => {
    await utils.makeFullFormScreen({ browser, screenName: "default" });
  });

  it("Вход с пустыми полями формы", async ({ browser }) => {
    await utils.clickLoginButton({ browser });
    await utils.makeFullFormScreen({
      browser,
      screenName: "empty_fields_login",
    });
  });

  it("Вход с пустым полем пароля", async ({ browser }) => {
    const email = process.env.LOGIN_EMAIL;
    await utils.fillEmailInput({ browser, email });
    await utils.clickLoginButton({ browser });
    await utils.makeFullFormScreen({
      browser,
      screenName: "empty_password_fieldd",
    });
  });

  it("Вход с пустым полем почты", async ({ browser }) => {
    const password = process.env.LOGIN_PASSWORD;
    await utils.fillPasswordInput({ browser, password });
    await utils.clickLoginButton({ browser });
    await utils.makeFullFormScreen({
      browser,
      screenName: "empty_email_field",
    });
  });

  it("Вход с неверным паролем", async ({ browser }) => {
    const email = process.env.LOGIN_EMAIL;
    const fakePassword = faker.internet.password();
    await utils.fillEmailInput({ browser, email });
    await utils.fillPasswordInput({ browser, password: fakePassword });
    await utils.clickLoginButton({ browser });
    await browser
      .$("//*[contains(text(), 'Неправильный логин')]")
      .waitForDisplayed({ timeout: 3000 });
    await utils.makeFullFormScreen({ browser, screenName: "wrong_password" });
  });
});

describe("Визуальные состояния поля ввода почты", () => {
  const utils = {
    open: async function ({ browser }) {
      await browser.url("/login");
    },
    makeEmailInputScreen: async function ({ browser, screenName }) {
      await browser.assertView(screenName, '[data-testid="login-email-input"]');
    },
  };

  beforeEach(async ({ browser }) => {
    utils.open({ browser });
  });

  it("Дефолт", async ({ browser }) => {
    await utils.makeEmailInputScreen({ browser, screenName: "default" });
  });

  it("Фокус", async ({ browser }) => {
    await browser.$('[data-testid="login-email-input"]').click();
    await utils.makeEmailInputScreen({ browser, screenName: "focused" });
  });

  it("Ошибка", async ({ browser }) => {
    await browser.$('[data-testid="login-submit-button"]').click();
    await utils.makeEmailInputScreen({ browser, screenName: "error" });
  });
});

describe("Визуальные состояния поля ввода пароля", () => {
  const utils = {
    open: async function ({ browser }) {
      await browser.url("/login");
    },
    makePasswordInputScreen: async function ({ browser, screenName }) {
      await browser.assertView(screenName, '[data-testid="login-password-input"]');
    },
  };

  beforeEach(async ({ browser }) => {
    utils.open({ browser });
  });

  it("Дефолт", async ({ browser }) => {
    await utils.makePasswordInputScreen({ browser, screenName: "default" });
  });

  it("Фокус", async ({ browser }) => {
    await browser.$('[data-testid="login-password-input"]').click();
    await utils.makePasswordInputScreen({ browser, screenName: "focused" });
  });

  it("Ошибка", async ({ browser }) => {
    await browser.$('[data-testid="login-submit-button"]').click();
    await utils.makePasswordInputScreen({ browser, screenName: "error" });
  });
});
