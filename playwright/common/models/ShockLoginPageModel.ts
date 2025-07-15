import { Page, Locator } from '@playwright/test';

import { ShockBasePageModel } from './ShockBasePageModel';

class ShockLoginPageModel extends ShockBasePageModel {
    constructor(page: Page) {
        super(page);
    }

    get title(): Locator {
        return this.page.getByText('Войти в ШОК', { exact: true });
    }

    get emailInput(): Locator {
        return this.page.getByTestId('login-email-input');
    }

    get passwordInput(): Locator {
        return this.page.getByTestId('login-password-input');
    }

    get backButton(): Locator {
        return this.page.getByTestId('login-back-button');
    }

    get submitButton(): Locator {
        return this.page.getByTestId('login-submit-button');
    }

    get registerButton(): Locator {
        return this.page.getByTestId('login-register-button');
    }
}

export { ShockLoginPageModel };
