import 'dotenv/config';
import { login } from '../testplane-auth/auth';
import { selectors } from '../testplane-auth/selectors';

describe("Edit page", () => {

    beforeEach(async ({ browser }) => {
        
        await login(browser);

        const editButton = await browser.$(selectors.editButton);
        await editButton.click();
    });


    it("should have empty fields state", async ({ browser }) => {
        const nameInput = await browser.$(selectors.nameInput);
        await nameInput.clearValue();

        await browser.assertView('edit-page-empty-name', 'body', { 
            screenshotDelay: 1000 
        });
    });

    it("should display Name change field", async ({ browser }) => {
        const nameInput = await browser.$(selectors.nameInput);
        await nameInput.clearValue();

        await browser.assertView('edit-name-change-field', selectors.nameInput, {
            screenshotDelay: 500
        });
    });

    it("should focus on Name change field", async ({ browser }) => {
        const nameInput = await browser.$(selectors.nameInput);
        await nameInput.clearValue();
        await nameInput.click();

        await browser.assertView('edit-focused-name-change-field', selectors.nameInput, {
            screenshotDelay: 500
        });
    });

    it("should display Save Changes button", async ({ browser }) => {
        await browser.assertView('edit-save-button', selectors.saveButton, {
            screenshotDelay: 500
        });
    });

    it("should display Cancel button", async ({ browser }) => {
        await browser.assertView('edit-cancel-button', selectors.backToProfileButton, {
            screenshotDelay: 500
        });
    });

});