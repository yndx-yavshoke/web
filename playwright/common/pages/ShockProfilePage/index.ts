import { Page, expect } from '@playwright/test';

import { ShockProfilePageModel } from '@common/models';

import { ShockBasePage } from '../ShockBasePage';
import { URL } from './constants';

class ShockProfilePage extends ShockBasePage<ShockProfilePageModel> {
    constructor(page: Page) {
        super(page, URL, ShockProfilePageModel);
    }

    public async open() {
        await this.model.goto(URL);
    }
}

export { ShockProfilePage };
