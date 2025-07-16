import { Page } from '@playwright/test';

class ShockBasePageModel {
    protected readonly page;

    constructor(page: Page) {
        this.page = page;
    }

    goto(url: string) {
        this.page.goto(url);
    }
}

export { ShockBasePageModel };
