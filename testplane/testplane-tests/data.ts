export async function loginShock(browser) {
    await browser.openAndWait("/login");
        (await browser.$('[data-testid = "login-email-input"]')).setValue("test@mail.ru");
        (await browser.$('[data-testid = "login-password-input"]')).setValue("111111");
        await expect(browser.$('body')).toExist();
        (await browser.$('[data-testid = "login-submit-button"]')).click();
}

export async function toEdit(browser) {
    await browser.openAndWait("/login");
        (await browser.$('[data-testid = "login-email-input"]')).setValue("test@mail.ru");
        (await browser.$('[data-testid = "login-password-input"]')).setValue("111111");
        await expect(browser.$('body')).toExist();
        (await browser.$('[data-testid = "login-submit-button"]')).click();
        (await browser.$('[data-testid = "user-edit-profile-button"]')).click();
}