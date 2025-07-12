export class EditNamePage {
  constructor(public browser: any) {}

  get editNameInput() {
    return this.browser.$('[data-testid="edit-name-input"]');
  }

  get editSaveButton() {
    return this.browser.$('[data-testid="edit-save-button"]');
  }

  get editCancelButton() {
    return this.browser.$('[data-testid="edit-cancel-button"]');
  }

  get editProfileTitle() {
    return this.browser.$('div=Edit Profile');
  }

  async open() {
    await this.browser.url('https://yavshok.ru/edit');
  }
}
