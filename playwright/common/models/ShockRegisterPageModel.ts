import { Page, Locator } from '@playwright/test';

import { ShockBasePageModel } from './ShockBasePageModel';

class ShockRegisterPageModel extends ShockBasePageModel {
    constructor(page: Page) {
        super(page);
    }

    get title(): Locator {
        return this.page.getByText('Регистрация в ШОКе', { exact: true });
    }

    get emailInput(): Locator {
        return this.page.getByTestId('register-email-input');
    }

    get passwordInput(): Locator {
        return this.page.getByTestId('register-password-input');
    }

    get ageInput(): Locator {
        return this.page.getByTestId('register-age-input');
    }

    get submitButton(): Locator {
        return this.page.getByTestId('register-submit-button');
    }

    get backButton(): Locator {
        return this.page.getByTestId('register-back-button');
    }

    get suggestEmail(): Locator {
        return this.page.getByText('Введите email', { exact: true });
    }

    get suggestPassword(): Locator {
        return this.page.getByText('Введите пароль', { exact: true });
    }

    get suggestAge(): Locator {
        return this.page.getByText('Введите возраст', { exact: true });
    }
}

export { ShockRegisterPageModel };
