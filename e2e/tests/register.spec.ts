import { test, expect } from '@playwright/test';
import { test as createMe } from '../Pages/fixtures';

test.describe('Register Page', () => {
  createMe('successful registration', async ({creating}) => {
    await creating.register('newuser@example.com', 'pass1234', 28);
    await creating.expectSuccess();
  });

  createMe('missing email shows prompt', async ({creating}) => {
    await creating.register('', 'okaydockyyandex', 25);
    await expect(creating.missingEmailText).toBeVisible();
  });

  createMe('missing password shows prompt', async ({creating}) => {
    await creating.register('nothing@yandex.ru', '', 34);
    await expect(creating.missingPasswordText).toBeVisible();
  });

  createMe('weak password', async ({creating}) => {
    await creating.register('weakpass@yandex.com', '123', 24);
    await expect(creating.weakPasswordText).toBeVisible();
  });

  createMe('invalid email format', async ({creating}) => {
    await creating.register('am-i-a-marvel', 'pass1234', 45);
    await expect(creating.invalidformatEmail).toBeVisible();
  });
});