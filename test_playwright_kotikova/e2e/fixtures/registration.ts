import { test as base } from '@playwright/test';

export type RegistrationFixtures = {
  registerNewUser: (email: string, password: string, age: number) => Promise<void>;
};

export const test = base.extend<RegistrationFixtures>({
  registerNewUser: async ({ page }, use) => {
    const register = async (email: string, password: string, age: number) => {
      await page.goto('https://yavshok.ru/register');
      await page.getByTestId('register-email-input').fill(email);
      await page.getByTestId('register-password-input').fill(password);
      await page.getByTestId('register-age-input').fill(age.toString());
      await page.getByTestId('register-submit-button').click();
      // Можно вставить дополнительную проверку состояния
    };

    await use(register);
  },
});

export { expect } from '@playwright/test';