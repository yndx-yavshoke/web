describe("login tests", () => {
  it("login default", async function() {
    await this.browser.url("/login");
    await this.browser.assertView("login_default", "body"); 
  });

  it("successful login", async function() {
    await this.browser.url("/login");

    await this.browser.$('[data-testid="login-email-input"]').waitForDisplayed({ timeout: 5000 });
    await this.browser.$('[data-testid="login-email-input"]').setValue("kotik@shok.com");
    await this.browser.$('[data-testid="login-password-input"]').setValue("qwerty");

    await this.browser.$('[data-testid="login-submit-button"]').click();

    await this.browser.waitUntil(
    async () => (await this.browser.getUrl()).includes('/'),
    { timeout: 5000 }
  );

    await this.browser.assertView("profile_page", "body");
  });

  it("login with new email", async function() {
    await this.browser.url("/login");
    await this.browser.$('[data-testid="login-email-input"]').waitForDisplayed({ timeout: 5000 });
    await this.browser.$('[data-testid="login-email-input"]').setValue("test@yandex.ru");
    await this.browser.$('[data-testid="login-password-input"]').setValue("wrong");
    await this.browser.$('[data-testid="login-submit-button"]').click();
    await this.browser.assertView("login_error", ".css-146c3p1"); 
  });

  it("login with incorrect password", async function() {
    await this.browser.url("/login");
    await this.browser.$('[data-testid="login-email-input"]').waitForDisplayed({ timeout: 5000 });
    await this.browser.$('[data-testid="login-email-input"]').setValue("kotik@shok.com");
    await this.browser.$('[data-testid="login-password-input"]').setValue("wrong");
    await this.browser.$('[data-testid="login-submit-button"]').click();
    await this.browser.assertView("login_error", ".css-146c3p1"); 
  });

   it("login with all fields empty", async function() {
    await this.browser.url("/login");
    await this.browser.$('[data-testid="login-email-input"]').waitForDisplayed({ timeout: 5000 });
    await this.browser.$('[data-testid="login-submit-button"]').click();
    await this.browser.assertView("login_error", ".css-146c3p1"); 
  });

   it("login with email empty", async function() {
    await this.browser.url("/login");
    await this.browser.$('[data-testid="login-email-input"]').waitForDisplayed({ timeout: 5000 });
    await this.browser.$('[data-testid="login-password-input"]').setValue("wrong");
    await this.browser.$('[data-testid="login-submit-button"]').click();
    await this.browser.assertView("login_error", ".css-146c3p1"); 
  });

   it("login with password empty", async function() {
    await this.browser.url("/login");
    await this.browser.$('[data-testid="login-email-input"]').waitForDisplayed({ timeout: 5000 });
    await this.browser.$('[data-testid="login-email-input"]').setValue("test@yandex.ru");
    await this.browser.$('[data-testid="login-submit-button"]').click();
    await this.browser.assertView("login_error", ".css-146c3p1"); 
  });
});