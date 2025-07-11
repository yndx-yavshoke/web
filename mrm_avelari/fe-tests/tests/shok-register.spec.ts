import { expect } from '@playwright/test';
import { test } from '../fixtures';
import { faker } from '@faker-js/faker';
import { TEST_USER_EMAIL } from '../constants/env';
import { REG_MSG } from '../constants/messages';

test.describe('Регистрация пользователя', () => {
  test.skip('Succesfull registration with valid user credentials', async ({ registerPage }) => {
    await registerPage.open();

    const email = faker.internet.email();
    const password = faker.internet.password();
    const age = faker.number.int({ min: 0, max: 99 }).toString();

    await registerPage.register(email, password, age);

    await expect(registerPage.page.getByTestId('user-logout-button')).toBeVisible();
  });
});

test.describe('Регистрация пользователя с уже существующим email', () => {
  test('Succesfull registration with valid user credentials', async ({ registerPage }) => {
    await registerPage.open();

    const email = TEST_USER_EMAIL;
    const password = faker.internet.password();
    const age = faker.number.int({ min: 0, max: 99 }).toString();

    await registerPage.register(email, password, age);

    await expect(registerPage.page.getByText(REG_MSG.errDuplicateEmail)).toBeVisible();
  });
});

test.describe('Проверка UI элементов страницы регистрации и навигации', () => {
  test.beforeEach(async ({ registerPage }) => {
    await registerPage.open();
  });

  test('All main elements are visible and correct', async ({ registerPage }) => {
    await expect(registerPage.title).toBeVisible();

    await expect(registerPage.emailInput).toBeVisible();
    await expect(registerPage.emailPlaceholder).toBeVisible();

    await expect(registerPage.passwordInput).toBeVisible();
    await expect(registerPage.passwordPlaceholder).toBeVisible();

    await expect(registerPage.ageInput).toBeVisible();
    await expect(registerPage.agePlaceholder).toBeVisible();

    await expect(registerPage.toRegisterButton).toBeVisible();
    await expect(registerPage.registerButtonLabel).toBeVisible();
    await expect(registerPage.toBackButton).toBeVisible();
    await expect(registerPage.backButtonLabel).toBeVisible();
  });

  test('Navigate back on clicking "Back" button', async ({ registerPage, page }) => {
    await registerPage.toBackButtonClick();

    await expect(page).toHaveURL(/login/);
  });
});
