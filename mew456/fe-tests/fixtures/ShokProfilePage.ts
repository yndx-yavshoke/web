import { Page, Locator} from '@playwright/test';

export class ShokProfilePage {
    public status: Locator;

    constructor(public readonly page: Page) {
         this.status = page.getByTestId('user-stаtus');
    }

    public async navigate() {
        await this.page.goto('/profile');
    }
}