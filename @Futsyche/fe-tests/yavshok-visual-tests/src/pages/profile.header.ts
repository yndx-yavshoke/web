import type { Browser } from 'webdriverio';

export class ProfileHeader {
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

    async replaceGifWithStatic(staticImageUrl: string): Promise<void> {
        await this.browser.execute((url) => {
            const gif = document.querySelector('.profile-gif') as HTMLImageElement;
            if (gif) gif.src = url;
        }, staticImageUrl);
    }

    async getHeaderBlocks() {
        return {
            avatar: await this.browser.$('.profile-avatar'),
            info: await this.browser.$('.profile-info'),
            stats: await this.browser.$('.profile-stats')
        };
    }
}