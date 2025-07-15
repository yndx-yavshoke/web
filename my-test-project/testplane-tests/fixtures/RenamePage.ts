export class RenamePage {
    constructor(private readonly browser: any) { }

    get input() {
        return this.browser.$('[data-testid="edit-name-input"]');
    }
    get saveButton() {
        return this.browser.$('[data-testid="edit-save-button"]');
    }
    get cancelButton() {
        return this.browser.$('[data-testid="edit-cancel-button"]');
    }

    async open() {
        await this.browser.$('[data-testid="user-edit-profile-button"]').click();
    }

    async fillName(name: string) {
        await this.input.setValue(name);
    }

    async changeName(name: string) {
        await this.fillName(name);
        await this.saveButton.click();
        await this.saveButton.getText() === 'Save Changes';
    }
}