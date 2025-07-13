describe("Состояния формы изменения имени", () => {
  const utils = {
    open: async function ({ browser }) {
      await browser.url("/login");
    },
    auth: async function ({ browser }) {
      await browser
        .$('[data-testid="login-email-input"]')
        .setValue(process.env.LOGIN_EMAIL);
      await browser
        .$('[data-testid="login-password-input"]')
        .setValue(process.env.LOGIN_PASSWORD);
      await browser.$('[data-testid="login-submit-button"]').click();
      await browser
        .$('[data-testid="user-edit-profile-button"]')
        .waitForDisplayed();
    },
    openEditPage: async function ({ browser }) {
      await browser.$('[data-testid="user-edit-profile-button"]').click();
    },
    clearForm: async function ({ browser }) {
      await browser.$('[data-testid="edit-name-input"]').clearValue();
    },
  };
  beforeEach(async ({ browser }) => {
    await utils.open({ browser });
    await utils.auth({ browser });
    await utils.openEditPage({ browser });
  });

  it("Дефолтное состояние формы изменения имени при открытии", async ({
    browser,
  }) => {
    await browser.assertView(
      "default",
      '//input[@data-testid="edit-name-input"]/parent::div/parent::div/parent::div',
      { ignoreElements: '[data-testid="edit-name-input"]' }
    );
  });

  it("Cостояние формы изменения имени c пустым полем", async ({ browser }) => {
    await utils.clearForm({ browser });
    await browser.assertView(
      "form_with_empty_field",
      '//input[@data-testid="edit-name-input"]/parent::div/parent::div/parent::div',
    );
  });
});
