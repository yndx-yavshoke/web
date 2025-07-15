import { Page, expect } from '@playwright/test';

import { ShockRegisterPageModel } from '@common/models';

import { ShockBasePage } from '../ShockBasePage';
import { URL } from './constants';

class ShockRegisterPage extends ShockBasePage<ShockRegisterPageModel> {
    constructor(page: Page) {
        super(page, URL, ShockRegisterPageModel);
    }

    public async open() {
        await this.model.goto(URL);
    }
}

export { ShockRegisterPage };
