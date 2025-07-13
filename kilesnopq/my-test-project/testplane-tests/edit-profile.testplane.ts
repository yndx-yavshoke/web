describe("Страница редактирования профиля", () => {
    beforeEach(async ({ browser }) => {
        await browser.url("https://yavshok.ru/login");
        const emailInput = await browser.$('[data-testid="login-email-input"]');
        await emailInput.setValue("e.sheluddd@gmail.com");
        const passwordInput = await browser.$('[data-testid="login-password-input"]');
        await passwordInput.setValue("123123");
        const shockButton = await browser.$('[data-testid="login-submit-button"]');
        await shockButton.click();
        const editProfileBtn = await browser.$('[data-testid="user-edit-profile-button"]');
        await editProfileBtn.click();
        await browser.$('[data-testid="edit-name-input"]').waitForDisplayed({ timeout: 5000 });
    });

    it("Отображается поле для имени", async ({ browser }) => {
        const nameInput = await browser.$('[data-testid="edit-name-input"]');
        await expect(nameInput).toBeDisplayed();
        await expect(nameInput).toHaveAttribute("placeholder", "Enter your name");
    });

    it("Отображается кнопка 'Save Changes'", async ({ browser }) => {
        const saveBtn = await browser.$('[data-testid="edit-save-button"]');
        await expect(saveBtn).toBeDisplayed();
        await expect(saveBtn.$('span')).toHaveText("Save Changes");
    });

    it("Отображается кнопка 'Cancel'", async ({ browser }) => {
        const cancelBtn = await browser.$('[data-testid="edit-cancel-button"]');
        await expect(cancelBtn).toBeDisplayed();
        await expect(cancelBtn.$('span')).toHaveText("Cancel");
    });
}); 