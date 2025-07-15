export class MainPage {
    constructor(private readonly browser: any) { }

    get input() {
        return this.browser.$('[data-testid="main-email-input"]');
    }
    get checkButton() {
        return this.browser.$('[data-testid="main-check-button"]');
    }
    get toLoginButton() {
        return this.browser.$('[data-testid="main-login-button"]');
    }

    async open() {
        await this.browser.openAndWait('/');
    }

    async fillEmail(email: string) {
        await this.input.setValue(email);
    }

    async exist(email: string) {
        await this.fillEmail(email);
        await this.checkButton.click();
        await this.browser.$('//*[text()="Ты еще не в ШОКе" or text()="Ты уже в ШОКе"]').waitForDisplayed();
    }
}