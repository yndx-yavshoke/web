describe("Yavshok Edit Profile Page", () => {
    
    async function loginAndGoToEdit(browser) {
        await browser.url("/");
        await browser.pause(1500);
        
        const avatar = await browser.$('[data-testid="user-avatar"]');
        const isAlreadyLoggedIn = await avatar.isDisplayed().catch(() => false);
        
        if (!isAlreadyLoggedIn) {
            await browser.url("/login");
            await browser.pause(2000);
            
            const emailInput = await browser.$('[data-testid="login-email-input"]');
            const passwordInput = await browser.$('[data-testid="login-password-input"]');
            const submitButton = await browser.$('[data-testid="login-submit-button"]');
            
            await emailInput.waitForDisplayed({ timeout: 10000 });
            await emailInput.setValue("test0@yandex.ru");
            await passwordInput.setValue("123456");
            await submitButton.click();
            
            await avatar.waitForDisplayed({ timeout: 15000 });
            await browser.pause(1000);
        }
        
        await browser.url("/edit");
        await browser.pause(1500);
        
        const nameInput = await browser.$('[data-testid="edit-name-input"]');
        await nameInput.waitForDisplayed({ timeout: 10000 });
    }

    // Тест 1: Заголовок и кнопки (игнорируем поле ввода)
    it("edit page layout", async ({browser}) => {
        await loginAndGoToEdit(browser);
        
        await browser.pause(1000);
        
        await browser.assertView("edit-page-layout", "body", {
            ignoreElements: [
                '[data-testid="edit-name-input"]'
            ]
        });
    });

    // Тест 2: Поле ввода имени в фокусе
    it("edit name input focused", async ({browser}) => {
        await loginAndGoToEdit(browser);
        
        const nameInput = await browser.$('[data-testid="edit-name-input"]');
        await nameInput.click();
        await browser.pause(500);
        
        await browser.assertView("edit-name-focused", '[data-testid="edit-name-input"]');
    });

    // Тест 3: Кнопка Save Changes
    it("save button", async ({browser}) => {
        await loginAndGoToEdit(browser);
        
        await browser.pause(1000);
        
        await browser.assertView("save-button", '[data-testid="edit-save-button"]');
    });

    // Тест 4: Кнопка Cancel  
    it("cancel button", async ({browser}) => {
        await loginAndGoToEdit(browser);
        
        await browser.pause(1000);
        
        await browser.assertView("cancel-button", '[data-testid="edit-cancel-button"]');
    });
}); 