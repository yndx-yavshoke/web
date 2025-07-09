import { test } from '../../fixtures/index';
import { getTestUserEmail, getTestUserPassword } from '../../utils/env';

test('auth', async ({ loginPage }) => {
    await loginPage.open();
    await loginPage.login(getTestUserEmail(), getTestUserPassword());
    await loginPage.page.context().storageState({ path: './tests/setup/auth/user.json' });
});