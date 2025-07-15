import { Page, expect } from '@playwright/test';

import { ShockMainPageModel } from '@common/models';

import { ShockBasePage } from '../ShockBasePage';
import { IShockMainPageActions } from './types';
import { URL } from './constants';

class ShockMainPage extends ShockBasePage<ShockMainPageModel> implements IShockMainPageActions {
    constructor(page: Page) {
        super(page, URL, ShockMainPageModel);
    }

    public async open() {
        await this.model.goto(URL);
    }

    public async checkEmail(email: string, valid: boolean) {
        await this.model.emailInput.fill(email);
        await this.model.checkButton.click();

        if (valid) {
            await expect(this.model.textTruthly).toBeVisible();
        }
        else {
            await expect(this.model.textFalsely).toBeVisible();
        }
    }
}

export { ShockMainPage };
