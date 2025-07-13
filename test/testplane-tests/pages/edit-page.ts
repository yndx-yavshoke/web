export class EditPage {
    private readonly browser: WebdriverIO.Browser;
    readonly selectors = {
        nameInput: '[data-testid="edit-name-input"]'
    }

    constructor(browser: WebdriverIO.Browser) {
        this.browser = browser;
    }

    get title() {
        return this.browser.$('["Edit Profile"]');
    }

    get nameInput() {
        return this.browser.$(this.selectors.nameInput);
    }

    get buttons() {
        return this.browser.$('[class="css-175oi2r r-1ssbvtb r-1x0uki6"]');
    }

    get () {
        return this.browser.$('[data-testid="edit-save-button"]');
    }

    get cancelButton() {
        return this.browser.$('[data-testid="edit-cancel-button"]');
    }
}
