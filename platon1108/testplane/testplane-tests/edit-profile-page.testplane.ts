require('dotenv').config();

describe("Edit Profile page tests", () => {
    beforeEach(async function() {
        await this.browser.openAndWait("/login");
        await this.browser.$('[data-testid="login-email-input"]').setValue(process.env.TEST_EMAIL!);
        await this.browser.$('[data-testid="login-password-input"]').setValue(process.env.TEST_PASSWORD!);
        await this.browser.$('[data-testid="login-submit-button"]').click();
        await this.browser.openAndWait("/edit");
    });


    it("Check default Edit Profile page", async ({browser}) => {
        await browser.assertView("edit_default_without_input", "body", {
            ignoreElements: '[data-testid="edit-name-input"]',
            screenshotDelay: 1000,
        });
        // Ignore name field to prevent errors with other name
    });


    it("Check Name field on Edit Profile page with setted name", async ({browser}) => {
        await browser.$('[data-testid="edit-name-input"]').setValue('Name');
        await browser.assertView("edit_default_input", '[data-testid="edit-name-input"]', {screenshotDelay: 1000});
    });


    it("Check Edit Profile page with Name input focused", async ({browser}) => {
        await browser.$('[data-testid="edit-name-input"]').setValue(''); // To prevent errors with other name
        await browser.$('[data-testid="edit-name-input"]').click();
        await browser.assertView("edit_focused_name", "body", {screenshotDelay: 1000});
    });


    it("Check Edit Profile with empty Name field", async ({browser}) => {
        await browser.$('[data-testid="edit-name-input"]').setValue('');
        await browser.$('[data-testid="edit-save-button"]').click();
        await browser.assertView("edit_empty_name", "body", {screenshotDelay: 1000});
    });
});
