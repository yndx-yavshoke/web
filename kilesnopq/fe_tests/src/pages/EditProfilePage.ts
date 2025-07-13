import { Page, Locator } from '@playwright/test';

export class EditProfilePage {
  readonly page: Page;
  constructor(page: Page) { this.page = page; }

  get nameInput(): Locator {
    return this.page.locator('[data-testid="edit-name-input"]');
  }
  get saveButton(): Locator {
    return this.page.locator('[data-testid="edit-save-button"]');
  }
  get cancelButton(): Locator {
    return this.page.locator('[data-testid="edit-cancel-button"]');
  }
} 