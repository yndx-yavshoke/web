import { Page } from '@playwright/test';

import { ShockBasePageModel } from '@common/models/ShockBasePageModel';

import { IShockBasePageActions } from './types';

class ShockBasePage<T extends ShockBasePageModel> implements IShockBasePageActions {
    protected readonly page: Page;

    public readonly url: string;
    public readonly model: T;

    constructor(page: Page, url: string, ModelClass: new (page: Page, url: string) => T) {
        this.url = url;
        this.page = page;
        this.model = new ModelClass(page, url);
    }

    open() {
        this.model.goto(this.url);
    }
}

export { ShockBasePage };
