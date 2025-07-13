import { test as base } from '@playwright/test';
import type { Page } from '@playwright/test';
import { faker } from '@faker-js/faker';

export type UserActionsFixtures = {
  mockExperiments: (page: Page) => Promise<void>;
  registerUser: (page: Page, age: number) => Promise<void>;
};

export const test = base.extend<UserActionsFixtures>({
  mockExperiments: async ({ }, use) => {
    const mock = async (page: Page) => {
      await page.route('**/api/experiments', route => {
        route.fulfill({
          contentType: 'application/json',
          body: JSON.stringify({
            flags: {
              age: {
                enabled: true,
                young: { from: 0, to: 21 },
                adult: { from: 22, to: 68 },
                old: { from: 69, to: 99 },
              },
            },
          }),
        });
      });
    };
    await use(mock);
  },

  registerUser: async ({ }, use) => {
    const register = async (page: Page, age: number) => {
      const email = faker.internet.email();
      const password = faker.internet.password();

      await page.goto('/register');
      await page.getByTestId('register-email-input').fill(email);
      await page.getByTestId('register-password-input').fill(password);
      await page.getByTestId('register-age-input').fill(age.toString());
      await page.getByTestId('register-submit-button').click();
      await page.waitForURL('https://yavshok.ru/');
    };
    await use(register);
  },
});

export { expect } from '@playwright/test';
