import assertView from 'testplane';

describe('Login Page Visual', () => {
    it('should display login page in default state', async function() {
        await this.browser.url('https://yavshok.ru/login');
        await this.browser.assertView('login-default', 'body');
    });

    it('should display login page with focused input', async function() {
        await this.browser.url('https://yavshok.ru/login');
        await this.browser.execute(function() {
            const input = document.querySelector('input[type="text"], input[type="email"]');
            if (input) (input as HTMLInputElement).focus();
        });
        await this.browser.assertView('login-input-focused', 'body');
    });

    it('should display login page with error', async function() {
        await this.browser.url('https://yavshok.ru/login');
        // Попытка отправить форму для появления ошибки
        await this.browser.execute(function() {
            const form = document.querySelector('form');
            if (form) form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
        });
        await this.browser.assertView('login-error', 'body');
    });
}); 