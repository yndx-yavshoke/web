import { expect } from '@playwright/test';
import { test } from './fixture/register/RegisterFixture'
import { ProfilePage } from '../tests/fixture/ProfilePage';
import { RegisterPage } from './fixture/register/RegisterPage';
import { registerData } from './fixture/register/RegisterData';


test.use({ storageState: { cookies: [], origins: [] } });

test('Checking successful user registration', async ({ page, registerUser }) => {

    await test.step('Initialize RegisterPage and ProfilePage objects', async () => {
        const registerPage = new RegisterPage(page);
        const profilePage = new ProfilePage(page);

        await test.step('Checking Register page has right title', async () => {
            await expect(registerPage.title).toBeVisible();
        });

        await test.step('Checking Register button has right name', async () => {
            await expect(registerPage.registerButton).toHaveText('Зарегистрироваться');
        });

        await test.step('Checking Back button is visible', async () => {
            await expect(registerPage.title).toBeVisible();
        });

        await test.step('Clicking on email input field', async () => {
            await registerPage.emailInput.click();
        });

        await test.step('Filling email field with random email', async () => {
            await registerPage.emailInput.fill(registerData.email);
        });

        await test.step('Filling password field with random password, length: 6', async () => {
            await registerPage.passwordInput.fill(registerData.password);
        });

        await test.step('Filling age field with random age [0 ; 99]', async () => {
            await registerPage.ageInput.fill(registerData.age);
        });

        await test.step('Clicking on register button', async () => {
            await registerPage.registerButton.click();
        });

        await test.step('Waiting for element on profile page', async () => {
            await profilePage.editButton.waitFor();
        });

        await test.step('Checking redirection to the profile page after successful registration', async () => {
            expect(page.url()).toBe('https://yavshok.ru/');
        });
    });
})
