import { Page, Locator } from '@playwright/test';

import { ShockBasePageModel } from './ShockBasePageModel';

class ShockMainPageModel extends ShockBasePageModel {
    constructor(page: Page) {
        super(page);
    }

    get title(): Locator {
        return this.page.getByText('Я в ШОКе', { exact: true });
    }

    get emailInput(): Locator {
        return this.page.getByTestId('main-email-input');
    }

    get checkButton(): Locator {
        return this.page.getByTestId('main-check-button');
    }

    get loginButton(): Locator {
        return this.page.getByTestId('main-login-button');
    }

    get textTruthly(): Locator {
        return this.page.getByText('Ты уже в ШОКе', { exact: true });
    }

    get textFalsely(): Locator {
        return this.page.getByText('Ты еще не в ШОКе', { exact: true });
    }
}

export { ShockMainPageModel };
