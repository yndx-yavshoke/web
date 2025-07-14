import { Page, expect } from '@playwright/test';

import { ShockChangeNamePageModel } from '@common/models';

import { ShockBasePage } from '../ShockBasePage';
import { IShockChangeNamePageActions } from './types';
import { URL } from './constants';

class ShockChangeNamePage extends ShockBasePage<ShockChangeNamePageModel> implements IShockChangeNamePageActions {
    constructor(page: Page) {
        super(page, URL, ShockChangeNamePageModel);
    }

    public async open() {
        await this.model.goto(URL);
    }

    public async changeName(name: string) {
        await this.model.nameInput.fill(name);
        await this.model.saveButton.click();

        // Ждем обновление данных стора
        await this.page.waitForTimeout(100);
    }
}

export { ShockChangeNamePage };
