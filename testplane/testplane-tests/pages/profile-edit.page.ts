export const PROFILE_EDIT_URL = '/edit';

export class ProfileEditPage {
     constructor(private browser: any) {
          this.browser = browser;
     }

     get nameInput() {
          return this.browser.$('[data-testid="edit-name-input"]');
     }

     get saveButton() {
          return this.browser.$('[data-testid="edit-save-button"]');
     }

     async open() {
          await this.browser.url(PROFILE_EDIT_URL);
     }

     async setName(name: string) {
          await this.nameInput.setValue(name);
     }

     async save() {
          await this.saveButton.click();
     }
} 