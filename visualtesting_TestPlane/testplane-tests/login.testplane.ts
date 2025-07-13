import * as Selectors from "../helper/selectors";

describe("Login Page Visual Tests", () => {
  beforeEach(async ({ browser }) => {
    await browser.openAndWait(Selectors.loginUrl);
    await browser.$(Selectors.emailInput).waitForExist({ timeout: 5000 });
  });

  it("default state", async ({ browser }) => {
    await browser.assertView("login-default", "body");
  });
  it("email input focused", async ({ browser }) => {
    const email = await browser.$(Selectors.emailInput);
    await email.click();
    await browser.assertView("login-focus-email", '[data-testid="login-email-input"]');
  });

  it("error message after failed login", async ({ browser }) => {
    await browser.$(Selectors.emailInput).setValue("wrong@example.com");
    await browser.$(Selectors.passInput).setValue("wrongpass");
    await browser.$(Selectors.submitBtn).click();

    const errorMsg = await browser.$(Selectors.msgError);
    await errorMsg.waitForDisplayed({ timeout: 5000 });

    await browser.assertView("login-error", "body");
  });
});
