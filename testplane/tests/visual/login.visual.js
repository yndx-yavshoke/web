const SELECTORS = {
    emailMainInput: '[data-testid="main-email-input"]',
    emailInput: '[data-testid="register-email-input"]',
    passwordInput: '[data-testid="register-password-input"]',
    ageInput: '[data-testid="register-age-input"]',
    submitButton: '[data-testid="register-submit-button"]',
    userAvatar: '[data-testid="user-avatar"]',
    errorMessage: '//*[@id="root"]/div/div/div/div/div/div/div/div[2]',
    editNameInput: '[data-testid="edit-name-input"]',
    editSaveButton: '[data-testid="edit-save-button"]',
};

const TEST_USER = {
    name: 'TestName',
    email: 'test@test.ru',
    password: 'test@test.ru',
    age: '21'
};

describe("yavshok", function () {
    describe('Страница входа', function () {
        beforeEach(async function ({ browser }) {
            await browser.url('/');
        });

        it("Дефолтный вид страницы", async function ({ browser }) {
            await browser.assertView('page_enter_default');
        });

        it("Фокус поля Email", async function ({ browser }) {
            const emailInput = await browser.$(SELECTORS.emailMainInput);
            await emailInput.waitForDisplayed({ timeout: 2000 });
            await emailInput.click();
            await browser.assertView('page_enter_email_focus');
        });

        it("Ошибка 'Ты еще не в ШОКе'", async function ({ browser }) {
            const emailInput = await browser.$(SELECTORS.emailInput);
            await emailInput.waitForDisplayed({ timeout: 2000 });
            await emailInput.setValue(TEST_USER.email);
            const errorMessage = await browser.$(SELECTORS.errorMessage);
            await errorMessage.waitForDisplayed({ timeout: 2000 });
            await errorMessage.click();
            await browser.waitUntil(
                async () => (await errorMessage.getText()) === 'Ты еще не в ШОКе',
                {
                    timeout: 2000,
                    timeoutMsg: 'Текст ошибки не появился вовремя'
                }
            );
            await expect(errorMessage).toHaveText('Ты еще не в ШОКе');
            await browser.assertView('page_enter_error');
        });
    });

    it("Страница профиля", async function ({ browser }) {
        await browser.url('/register');
        const emailInput = await browser.$(SELECTORS.emailInput);
        await emailInput.waitForDisplayed({ timeout: 2000 });
        await emailInput.setValue(TEST_USER.email);
        const passwordInput = await browser.$(SELECTORS.passwordInput);
        await passwordInput.waitForDisplayed({ timeout: 2000 });
        await passwordInput.setValue(TEST_USER.password);
        const ageInput = await browser.$(SELECTORS.ageInput);
        await ageInput.waitForDisplayed({ timeout: 2000 });
        await ageInput.setValue(TEST_USER.age);
        const submitButton = await browser.$(SELECTORS.submitButton);
        await submitButton.waitForDisplayed({ timeout: 2000 });
        await submitButton.click();
        const profileHeader = await browser.$(SELECTORS.userAvatar);
        await profileHeader.waitForDisplayed({ timeout: 5000 });
        await browser.assertView('page_profile');
    });

    it("Страница редактирования профиля", async function ({ browser }) {
        await browser.url('/edit');
        const nameInput = await browser.$(SELECTORS.editNameInput);
        await nameInput.waitForDisplayed({ timeout: 2000 });
        await nameInput.setValue(TEST_USER.name);
        const submitButton = await browser.$(SELECTORS.editSaveButton);
        await submitButton.waitForDisplayed({ timeout: 2000 });
        await submitButton.click();
        await browser.assertView('page_edit_profile');
    });
});