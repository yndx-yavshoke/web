import { expect } from '@playwright/test';
import { test } from '../fixtures/withAuth';
import { ShokPersonalPage } from '../fixtures/ShokPersonalPage';

const ageCases = [
  { age: 13, expected: 'Ты молоденький котик' },
  // { age: 28, expected: 'Ты взрослый котик' },
  { age: 80, expected: 'Ты старый котик' },
];

for (const { age, expected } of ageCases) {
  test(`Проверка статуса по возрасту ${age}`, async ({ page, personalPage }) => {
    const mock = {
      flags: {
        age: {
          enabled: true,
          young: { from: 0, to: 21 },
          adult: { from: 22, to: 68 },
          old: { from: 69, to: 99 },
          oldFrom: 30,
          youngFrom: 2,
          currentAge: age,
        },
      },
    };

    await page.addInitScript(
      ({ age }) => {
        localStorage.setItem(
          'UserData',
          JSON.stringify({
            id: 1979,
            email: 'test547892@yandex.ru',
            name: 'Neko',
            age,
          }),
        );
      },
      { age },
    );

    await page.route('https://api.yavshok.ru/experiments', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mock),
      });
    });

    await personalPage.open();
    await personalPage.userStatus.waitFor({ state: 'visible' });

    await expect(personalPage.userStatus).toHaveText(expected);
  });
}

test('Разлогин из профиля', async ({ personalPage, page }) => {
  await personalPage.open();
  await personalPage.logout();
  await expect(personalPage.logoutButton).toBeHidden();
  await expect(personalPage.userName).toBeHidden();
  await expect(personalPage.avatar).toBeHidden();
  await expect(page).toHaveURL('https://yavshok.ru/');
  await expect(page.getByText('Я в ШОКе', { exact: true })).toBeVisible();
});