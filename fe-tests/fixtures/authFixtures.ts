import { test as base } from '@playwright/test';
import { ShockProfile } from './profileFixtures';
import { ShockNameEditor } from './nameEditFixtures';
import { ShockAuth } from './loginPageFixture';

export const test = base.extend<{
  profile: ShockProfile;
  nameEditor: ShockNameEditor;
  auth: ShockAuth;
}>({
  profile: async ({ page }, use) => {
    await use(new ShockProfile(page));
  },
  nameEditor: async ({ page }, use) => {
    await use(new ShockNameEditor(page));
  },
  auth: async ({ page }, use) => {
    const auth = new ShockAuth(page);
    await auth.signIn('abra@mail.ru', 'cadabra');
    await use(auth);
  },
});
