export class EditProfilePage {
  private readonly browser: WebdriverIO.Browser;
  readonly selectors = {
    nameInput: '[data-testid="edit-name-input"]',
    saveButton: '[data-testid="edit-save-button"]',
    cancelButton: '[data-testid="edit-cancel-button"]',
  };

  constructor(browser: WebdriverIO.Browser) {
    this.browser = browser;
  }

  get title() {
    return this.browser.$('//div[text()="Edit Profile"]');
  }

  get saveButton() {
    return this.browser.$(this.selectors.saveButton);
  }

  get cancelButton() {
    return this.browser.$(this.selectors.cancelButton);
  }
}
