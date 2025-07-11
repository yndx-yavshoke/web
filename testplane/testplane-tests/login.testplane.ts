describe("Login page", () => {
  beforeEach(async function () {
    await this.browser.url("/login");
  });

  describe("Default state", function () {
    it("Default state page", async function () {
      await this.browser.assertView("login-page-default", "body");
    });

    it("Default state email", async function () {
      await this.browser.assertView(
        "email-input-default",
        '[data-testid="login-email-input"]',
        { disableAnimation: true, screenshotDelay: 1000 }
      );
    });

    it("Default state password", async function () {
      await this.browser.assertView(
        "password-input-default",
        '[data-testid="login-password-input"]',
        { disableAnimation: true, screenshotDelay: 1000 }
      );
    });

    it("Default state login button", async function () {
      await this.browser.assertView(
        "submit-button-default",
        '[data-testid="login-submit-button"]',
        { disableAnimation: true, screenshotDelay: 1000 }
      );
    });

    it("Default state back button", async function () {
      await this.browser.assertView(
        "back-button-default",
        '[data-testid="login-back-button"]',
        { disableAnimation: true, screenshotDelay: 1000 }
      );
    });

    it("Default state register button", async function () {
      await this.browser.assertView(
        "register-button-default",
        '[data-testid="login-register-button"]',
        { disableAnimation: true, screenshotDelay: 1000 }
      );
    });
  });

  describe("Focus state", function () {
    it("Email input focus state", async function () {
      const emailInput = await this.browser.$(
        '[data-testid="login-email-input"]'
      );
      await emailInput.click();
      await this.browser.assertView(
        "email-input-focused",
        '[data-testid="login-email-input"]',
        {
          disableAnimation: true,
          screenshotDelay: 1000,
        }
      );
    });

    it("Password input focus state", async function () {
      const passwordInput = await this.browser.$(
        '[data-testid="login-password-input"]'
      );
      await passwordInput.click();
      await this.browser.assertView(
        "password-input-focused",
        '[data-testid="login-password-input"]',
        {
          disableAnimation: true,
          screenshotDelay: 1000,
        }
      );
    });

    it("Login button focus state", async function () {
      const submitButton = await this.browser.$(
        '[data-testid="login-submit-button"]'
      );
      await submitButton.click();
      await this.browser.assertView(
        "submit-button-focused",
        '[data-testid="login-submit-button"]',
        {
          disableAnimation: true,
          screenshotDelay: 1000,
        }
      );
    });
  });

  describe("Error state", function () {
    it("Login error state", async function () {
      const emailInput = await this.browser.$(
        '[data-testid="login-email-input"]'
      );
      const passwordInput = await this.browser.$(
        '[data-testid="login-password-input"]'
      );
      const submitBtn = await this.browser.$(
        '[data-testid="login-submit-button"]'
      );

      await emailInput.setValue("wrong@example.com");
      await passwordInput.setValue("wrongpassword");
      await submitBtn.click();

      const errorMsg = await this.browser.$(
        '//div[contains(text(), "Неправильный логин или пароль")]'
      );
      await errorMsg.waitForDisplayed();

      await this.browser.assertView("invalid-credentials-error", "body");
    });
  });
});
