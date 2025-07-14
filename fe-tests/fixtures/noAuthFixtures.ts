import { test as base } from '@playwright/test';
import { ShockLanding } from './mainPageFixture';
import { ShockRegistration } from './registerPageFixture';
import { ShockAuth } from './loginPageFixture';

export const test = base.extend<{
  landing: ShockLanding;
  registration: ShockRegistration;
  auth: ShockAuth;
}>({
  landing: async ({ page }, use) => {
    await use(new ShockLanding(page));
  },
  registration: async ({ page }, use) => {
    await use(new ShockRegistration(page));
  },
  auth: async ({ page }, use) => {
    await use(new ShockAuth(page));
  },
});
