import {test} from '../Pages';
import {expect} from '@playwright/test';
import {allure} from 'allure-playwright';
import {faker} from '@faker-js/faker';

test('Check loginPage', async ({registerPage}) => {

    await allure.step('Check registerPage', async () => {
        await registerPage.open();
        await expect(registerPage.title).toBeVisible();
        await expect(registerPage.inputEmail).toBeVisible();
        await expect(registerPage.inputPassword).toBeVisible();
        await expect(registerPage.inputAge).toBeVisible();
        await expect(registerPage.registerButton).toBeVisible();
        await expect(registerPage.backToLoginButton).toBeVisible();
    });
});

test('check valid registration', async ({ registerPage, profilePage }) => {
    await allure.step('check valid registration', async () => {
        await registerPage.open();
        await registerPage.inputEmail.fill(faker.internet.email());
        await registerPage.inputPassword.fill(faker.internet.password({
                length: faker.number.int({ min: 6, max: 20 }),
                memorable: false
            }));
        await registerPage.inputAge.fill('28');
        await registerPage.registerButton.click();
        await expect(profilePage.profileAvatar).toBeVisible();
    })
})

test('check validation email', async ({registerPage}) => {
    const invalidEmails = ['check', 'check@', 'check@check', 'check@check.', 'check @check.ru']
    for (const email of invalidEmails) {
        await allure.step(`check email ${email}`, async () => {
            await registerPage.open();
            await registerPage.inputEmail.fill(email);
            await registerPage.registerButton.click();
            await expect(registerPage.warningIncorrectEmail).toBeVisible();
            await registerPage.page.reload();
        });
    }
});

