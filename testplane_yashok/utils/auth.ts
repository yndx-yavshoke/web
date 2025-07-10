type User = {
  email: string;
  password: string;
};

export const users: Record<string, User> = {
  user1: {
    email: 'yassbar@mail.ru',
    password: '1234567',
  },
  user2: {
    email: 'yasssbar@mail.ru',
    password: '1234567',
  },
};

export default async function loginToProfile(
  browser: any,
  userKey: keyof typeof users,
): Promise<void> {
  const credentials = users[userKey];

  await browser.url('https://yavshok.ru/login');

  await (await browser.$('[data-testid="login-email-input"]')).setValue(credentials.email);
  await (await browser.$('[data-testid="login-password-input"]')).setValue(credentials.password);
  await (await browser.$('[data-testid="login-submit-button"]')).click();

  await (await browser.$('[data-testid="user-avatar"]')).waitForExist({ timeout: 12000 });
}
