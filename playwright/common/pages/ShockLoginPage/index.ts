import { Page, expect } from '@playwright/test';

import { ShockLoginPageModel } from '@common/models';
import { AUTH_PATH_STORAGE } from '@common/constants';

import { ShockBasePage } from '../ShockBasePage';
import { IShockLoginPageActions } from './types';
import { URL } from './constants';

class ShockLoginPage extends ShockBasePage<ShockLoginPageModel> implements IShockLoginPageActions {
    constructor(page: Page) {
        super(page, URL, ShockLoginPageModel);
    }

    public async open() {
        await this.model.goto(URL);
    }

    public async login(email: string, password: string) {
        await this.model.emailInput.fill(email);
        await this.model.passwordInput.fill(password);
        await this.model.submitButton.click();

        // Ждем загрузки стора
        await this.page.waitForTimeout(100);

        await this.page.context().storageState({ path: AUTH_PATH_STORAGE });
    }
}

export { ShockLoginPage };
