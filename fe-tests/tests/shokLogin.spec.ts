import { expect } from '@playwright/test';
import { test } from '../fixtures/index';
import adult from '../tests/mocks/adult.json';
import old from '../tests/mocks/old.json';
import young from '../tests/mocks/young.json';


test.use({ storageState: './tests/setup/auth.json' });

test('Молоденький котик', async ({ mainPage, profilePage, page }) => {
    await mainPage.open()
    await page.route('https://api.yavshok.ru/experiments', (route) => {
        route.fulfill({
            status: 200,
            body: JSON.stringify(young)
        })
    })

    await expect(mainPage.title).not.toBeVisible();
    await expect(profilePage.page.getByText("Ты молоденький котик")).toBeVisible();
})

test('Старый котик', async ({ mainPage, profilePage, page }) => {
    await mainPage.open()
    await page.route('https://api.yavshok.ru/experiments', (route) => {
        route.fulfill({
            status: 200,
            body: JSON.stringify(old)
        })
    })

    await expect(mainPage.title).not.toBeVisible();
    await expect(profilePage.page.getByText("Ты старый котик")).toBeVisible();
})

test.skip('Взрослый котик', async ({ mainPage, profilePage, page }) => {
    await mainPage.open()
    await page.route('https://api.yavshok.ru/experiments', (route) => {
        route.fulfill({
            status: 200,
            body: JSON.stringify(adult)
        })
    })

    await expect(mainPage.title).not.toBeVisible();
    await expect(profilePage.page.getByText("Ты взрослый котик")).toBeVisible();
})

test('Успешная авторизация с валидными email и паролем', async ({   loginPage, page }) => {
  await loginPage.open();
  const testEmail = "asda@gmail.com";
  const testPassword = "asdasd";

  await loginPage.login(testEmail, testPassword);
  await expect(page).toHaveURL('/');
});
test('Ошибка при пустом email (но заполненном пароле)', async ({ loginPage }) => {
  await loginPage.open();
  await loginPage.inputPassword.fill('asdasd');
  await loginPage.loginSubmitButton.click();
  await expect(loginPage.noEmail).toBeVisible();
  await expect(loginPage.title).toBeVisible();
});
test('Ошибка при пустом пароле (но заполненном email)', async ({ loginPage }) => {
  await loginPage.open();
  await loginPage.inputEmail.fill('asda@gmail.com');
  await loginPage.loginSubmitButton.click();
  await expect(loginPage.noPassword).toBeVisible();
  await expect(loginPage.title).toBeVisible();
});