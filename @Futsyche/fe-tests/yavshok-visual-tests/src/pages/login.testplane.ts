import Testplane from 'testplane';

export class LoginPage {
    constructor(protected browser: WebdriverIO.Browser) {}

    async open(): Promise<void> {
        await this.browser.url('https://yavshok.ru/login');
    }

    async fillCredentials(username: string, password: string): Promise<void> {
        await this.browser.$('[data-testid="login-email-input"]').setValue('qwerty@yandex.ru');
        await this.browser.$('[data-testid="login-password-input"]').setValue('123456');
    }

    async submit(): Promise<void> {
        await this.browser.$('[data-testid="login-submit-button"]').click();
    }

    async focusUsername(): Promise<void> {
        await this.browser.$('[data-testid="login-email-input"]').click();
    }

    async focusPassword(): Promise<void> {
        await this.browser.$('[data-testid="login-password-input"]').click();
    }
}