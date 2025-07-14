import { Page, Locator } from '@playwright/test';

import { ShockBasePageModel } from './ShockBasePageModel';

class ShockProfilePageModel extends ShockBasePageModel {
    constructor(page: Page) {
        super(page);
    }

    get logoutButton(): Locator {
        return this.page.getByTestId('user-logout-button');
    }

    get statusYoungCat(): Locator {
        return this.page.getByText('Ты молоденький котик');
    }

    get statusOldCat(): Locator {
        return this.page.getByText('Ты старый котик');
    }
}

export { ShockProfilePageModel };
