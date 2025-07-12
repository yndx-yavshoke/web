export class MainPage {
  constructor(public browser: any) {}

  get emailInput() {
    return this.browser.$('[data-testid="main-email-input"]');
  }

  get checkButton() {
    return this.browser.$('[data-testid="main-check-button"]');
  }

  get loginButton() {
    return this.browser.$('[data-testid="main-login-button"]');
  }

  get notInShokText() {
    return this.browser.$('div=Ты еще не в ШОКе');
  }

  get inShokText() {
    return this.browser.$('div=Ты уже в ШОКе');
  }

  get happyCatImage() {
    return this.browser.$('img[src*="happyCat"]');
  }

  async open() {
    await this.browser.url('https://yavshok.ru');
  }

  async checkEmail(email: string) {
    await this.emailInput.waitForDisplayed();
    await this.emailInput.setValue(email);
    await this.checkButton.waitForDisplayed();
    await this.checkButton.click();
  }
}
