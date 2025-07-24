import type { Browser } from 'webdriverio';

export class ProfileEditPage {
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

    async fillForm(data: {
        name?: string;
        bio?: string;
        avatar?: string;
    }): Promise<void> {
        if (data.name) await this.browser.$('#name').setValue(data.name);
        if (data.bio) await this.browser.$('#bio').setValue(data.bio);
    }

    async submit1(): Promise<void> {
        await this.browser.$('.save-button').click();
    }
}