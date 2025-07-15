import { Page, Locator } from '@playwright/test';

import { ShockBasePageModel } from './ShockBasePageModel';

class ShockChangeNamePageModel extends ShockBasePageModel {
    constructor(page: Page) {
        super(page);
    }

    get title(): Locator {
        return this.page.getByText('Edit Profile', { exact: true });
    }

    get nameInput(): Locator {
        return this.page.getByTestId('edit-name-input');
    }

    get saveButton(): Locator {
        return this.page.getByTestId('edit-save-button');
    }

    get cancelButton(): Locator {
        return this.page.getByTestId('edit-cancel-button');
    }

    get suggestText(): Locator {
        return this.page.getByText('Name is required', { exact: true });
    }
}

export { ShockChangeNamePageModel };
