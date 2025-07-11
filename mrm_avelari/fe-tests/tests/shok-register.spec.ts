import { expect } from '@playwright/test';
import { test } from '../fixtures';
import { faker } from '@faker-js/faker';
import { TEST_USER_EMAIL } from '../constants/env';
import { REG_MSG } from '../constants/messages';
import { expectRegisterPageUI } from '../utils/testHelpers';

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
    await expectRegisterPageUI(registerPage);
  });

  test('Navigate back on clicking "Back" button', async ({ registerPage, page }) => {
    await registerPage.toBackButtonClick();

    await expect(page).toHaveURL(/login/);
  });
});
