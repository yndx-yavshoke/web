describe("profile edit tests", () => {

    it("open edit profile page", async function() {
        await this.browser.url("/login");

        await this.browser.$('[data-testid="login-email-input"]').waitForDisplayed({ timeout: 5000 });
        await this.browser.$('[data-testid="login-email-input"]').setValue("kotik@shok.com");
        await this.browser.$('[data-testid="login-password-input"]').setValue("qwerty");
        await this.browser.$('[data-testid="login-submit-button"]').click();

        await this.browser.waitUntil(
            async () => (await this.browser.getUrl()).includes('/'),
            { timeout: 5000 }
        );

        // await this.browser.assertView("profile_page", "body");

        await this.browser.$('[data-testid="user-edit-profile-button"]').waitForDisplayed({ timeout: 5000 });
        await this.browser.$('[data-testid="user-edit-profile-button"]').click();
        
        await this.browser.waitUntil(
            async () => (await this.browser.getUrl()).includes('/edit'),
            { timeout: 60000 }
        );
        await this.browser.assertView("edit_profile_default", "body");
    });

    it("save profile changes", async function() {
        await this.browser.url("/login");

        await this.browser.$('[data-testid="login-email-input"]').waitForDisplayed({ timeout: 5000 });
        await this.browser.$('[data-testid="login-email-input"]').setValue("kotik@shok.com");
        await this.browser.$('[data-testid="login-password-input"]').setValue("qwerty");
        await this.browser.$('[data-testid="login-submit-button"]').click();

        await this.browser.waitUntil(
            async () => (await this.browser.getUrl()).includes('/'),
            { timeout: 5000 }
        );

        await this.browser.$('[data-testid="user-edit-profile-button"]').click();

        await this.browser.waitUntil(
            async () => (await this.browser.getUrl()).includes('/edit'),
            { timeout: 5000 }
        );
        
        const nameInput = await this.browser.$('[data-testid="edit-name-input"]');
        await nameInput.clearValue();
        await nameInput.setValue("New_Name");
        
        await this.browser.$('[data-testid="edit-save-button"]').click();
        await this.browser.$('[data-testid="edit-cancel-button"]').click();
        
        await this.browser.waitUntil(
            async () => (await this.browser.getUrl()).includes('/'),
            { timeout: 5000 }
        );

        const newNameElement = await this.browser.$('[data-testid="user-profile-name-block"]'); 
        await newNameElement.waitForDisplayed({ timeout: 10000 });
        await expect(newNameElement).toHaveText("New_Name");
    });

    it("cancel editing without changes", async function() {
        await this.browser.url("/login");

        await this.browser.$('[data-testid="login-email-input"]').waitForDisplayed({ timeout: 5000 });
        await this.browser.$('[data-testid="login-email-input"]').setValue("kotik@shok.com");
        await this.browser.$('[data-testid="login-password-input"]').setValue("qwerty");
        await this.browser.$('[data-testid="login-submit-button"]').click();

        await this.browser.waitUntil(
            async () => (await this.browser.getUrl()).includes('/'),
            { timeout: 15000 }
        );

        await this.browser.url("/edit");
        
        await this.browser.$('[data-testid="edit-name-input"]').waitForDisplayed({ timeout: 5000 });
        const nameInput = await this.browser.$('[data-testid="edit-name-input"]');
        await nameInput.waitForDisplayed({ timeout: 15000 });
        const originalName = await nameInput.getValue();
        
        await nameInput.setValue("Temporary Name");
        await this.browser.$('[data-testid="edit-cancel-button"]').click();
        
        await this.browser.waitUntil(
            async () => (await this.browser.getUrl()).includes('/'),
            { timeout: 30000 }
        );
        
        const profileName = await this.browser.$('[class*="css-146c3p1"]');
        await expect(profileName).toHaveText(originalName);
    });

    it("saving empty name", async function() {
        await this.browser.url("/edit");
        
        const nameInput = await this.browser.$('[data-testid="edit-name-input"]');
        await nameInput.waitForDisplayed({ timeout: 15000 });
        await nameInput.clearValue();
        
        await this.browser.$('[data-testid="edit-save-button"]').click();
        
        await this.browser.assertView("edit_profile_error", ".css-146c3p1");
        
        await expect(this.browser).toHaveUrlContaining('/edit');
    });
});

//до какого то момента два теста точно работали, потом внезапно перестали =( к сожалению, уже не успеваю до дедлайна разобраться, перестал переходить на /edit после клика