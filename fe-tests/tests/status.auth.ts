import { expect } from '@playwright/test';
import { test } from '../fixtures/authFixtures';
import { ShockProfile } from '../fixtures/profileFixtures';

const ageCases = [
  { age: 20, expected: 'Ты молоденький котик' },
  { age: 80, expected: 'Ты старый котик' },
  { age: 0, expected: 'UwU'}
];

for (const { age, expected } of ageCases) { 
  test(`Проверка статуса по возрасту ${age}`, async ({ page, profile }) => {
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
            id: 2783,
            email: 'abra@mail.ru',
            name: 'Neko',
            age,
          }),
        );
      },
      { age },
    );

    await profile.navigateTo();
    await profile.statusText.waitFor({ state: 'visible' });

    await expect(profile.statusText).toHaveText(expected);
  });
}