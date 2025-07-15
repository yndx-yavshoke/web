describe('edit page', function () { 
    beforeEach( async function () {
        await this.browser.openAndWait('https://yavshok.ru/login');
        const emailInput = await this.browser.$('[data-testid="login-email-input"]');
        await emailInput.click();
        await emailInput.setValue('test123456@test.com');

        const passwordInput= await this.browser.$('[data-testid="login-password-input"]');
        await passwordInput.click();
        await passwordInput.setValue('123456');

        const loginButton = await this.browser.$('[data-testid="login-submit-button"]');
        await loginButton.click();


        const editButton = await this.browser.$('[data-testid="user-edit-profile-button"]')
        await editButton.click()
    })

    it('should show new name input', async ({browser}) => {
        const inputName = await browser.$('[data-testid="edit-name-input"');
        await inputName.click();

        await inputName.setValue("");

        await browser.assertView('input name screen', '[data-testid="edit-name-input"]');
    })

    it('should show save button', async ({browser}) => {

        await browser.assertView('screen save button', '[data-testid="edit-save-button"]');
    })

    it('should show cancel button', async ({browser}) => {

        await browser.assertView('screen save button', '[data-testid="edit-cancel-button"]');
    })

    it('should show focus on input name', async ({ browser }) => {

        const inputName = browser.$('[data-testid="edit-name-input"]');
        inputName.click();

        await browser.assertView('screen focus input name', '[data-testid="edit-name-input"]')

    })


})