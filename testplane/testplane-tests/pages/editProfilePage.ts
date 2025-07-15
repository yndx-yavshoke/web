export class EditProfilePage {
    private readonly browser: WebdriverIO.Browser;
    readonly selectors = {
        nameInput: '[data-testid="edit-name-input"]'
    }

    constructor(browser: WebdriverIO.Browser) {
        this.browser = browser;
    }

    get title() {
        return this.browser.$('//div[text()="Edit Profile"]');
    }
}