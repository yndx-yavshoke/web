import { expect } from '@playwright/test';
import { test } from '../fixtures/index';
import { mock } from 'node:test';
import { faker } from '@faker-js/faker';

test.use({ storageState: 'tests/setup/auth.json' })

const mockYoung = {
  "flags": {
        "age": {
            "enabled": true,
            "young": {
                "from": 0,
                "to": 21
            },
            "adult": {
                "from": 22,
                "to": 68
            },
            "old": {
                "from": 69,
                "to": 99
            },
            "oldFrom": 35,
            "youngFrom": 2
        }
    }
}

test('login status young', async ({ page }) => {
  await page.goto('/');

  await page.route('https://api.yavshok.ru/experiments', (route) => {
    route.fulfill({
      status: 200,
      body: JSON.stringify(mockYoung)
    });
  });
  await page.reload();
  await expect(page.getByTestId('main-email-input')).not.toBeVisible();
  await expect(page.getByText('Ты молоденький котик')).toBeVisible();
});

// const mockAdult = {
//   "flags": {
//         "age": {
//             "enabled": true,
//             "young": {
//               "from": 0,
//               "to": 21
//           },
//             "adult": {
//                 "from": 22,
//                 "to": 68
//             },
//             "old": {
//                 "from": 69,
//                 "to": 99
//             },
//             "oldFrom": 69,
//             "adultFrom": 22,
//             "youngFrom": 2
//         }
//     }
// }

// test('login status adult', async ({ page }) => {
//   await page.goto('/');
//   await page.route('https://api.yavshok.ru/experiments', (route) => {
//     route.fulfill({
//       status: 200,
//       body: JSON.stringify(mockAdult)
//     });
//   });

//   await expect(page.getByText('Ты взрослый котик')).toBeVisible();
// });

const mockOld = {
  "flags": {
        "age": {
            "enabled": true,
            "young": {
                "from": 0,
                "to": 21
            },
            "adult": {
                "from": 22,
                "to": 68
            },
            "old": {
                "from": 69,
                "to": 99
            },
            "oldFrom": 30,
            "youngFrom": 2
        }
    }
}
test('login status old', async ({ page }) => {
  await page.goto('/');
  await page.route('https://api.yavshok.ru/experiments', (route) => {
    route.fulfill({
      status: 200,
      body: JSON.stringify(mockOld)
    });
  });

  await expect(page.getByText(' Ты старый котик')).toBeVisible();
});

test.describe('negative tests', () => {
  const email = 'anastasiagurtovykh@yandex.ru';

  test('unregistered user', async ({ loginPage, page }) => {
    await page.route('https://api.yavshok.ru/auth/login', (route) => {
      route.fulfill({
        status: 422,
        contentType: 'application/json',
        body: JSON.stringify({ message: 'Произошла ошибка' })
      });
    });
    await loginPage.open();
    await loginPage.login(faker.internet.email(), faker.internet.password());
    await expect(loginPage.page.getByText('Произошла ошибка')).toBeVisible();
  });

  test('wrong password for existing user', async ({ loginPage, page }) => {
    await page.route('https://api.yavshok.ru/auth/login', (route) => {
      route.fulfill({
        status: 422,
        contentType: 'application/json',
        body: JSON.stringify({ message: 'Произошла ошибка' })
      });
    });
    await loginPage.open();
    await loginPage.login(email, faker.internet.password());
    await expect(loginPage.page.getByText('Произошла ошибка')).toBeVisible();
  });

  test('empty fields', async ({ loginPage, page }) => {
    await page.route('https://api.yavshok.ru/auth/login', (route) => {
      route.fulfill({
        status: 422,
        contentType: 'application/json',
        body: JSON.stringify({ message: 'Произошла ошибка' })
      });
    });
    await loginPage.open();
    await loginPage.login('', '');
    await expect(loginPage.page.getByText('Введите email')).toBeVisible();
    await expect(loginPage.page.getByText('Введите пароль')).toBeVisible();
  });

  test('invalid email format (no @)', async ({ loginPage, page }) => {
    await page.route('https://api.yavshok.ru/auth/login', (route) => {
      route.fulfill({
        status: 422,
        contentType: 'application/json',
        body: JSON.stringify({ message: 'Произошла ошибка' })
      });
    });
    await loginPage.open();
    await loginPage.login(faker.lorem.word(), faker.internet.password());
    await expect(loginPage.page.getByText('Произошла ошибка')).toBeVisible();
  });

  test('invalid email format (no domain)', async ({ loginPage, page }) => {
    await page.route('https://api.yavshok.ru/auth/login', (route) => {
      route.fulfill({
        status: 422,
        contentType: 'application/json',
        body: JSON.stringify({ message: 'Произошла ошибка' })
      });
    });
    await loginPage.open();
    await loginPage.login(faker.person.firstName() + '@', faker.internet.password());
    await expect(loginPage.page.getByText('Произошла ошибка')).toBeVisible();
  });

  test('too long password', async ({ loginPage, page }) => {
    await page.route('https://api.yavshok.ru/auth/login', (route) => {
      route.fulfill({
        status: 422,
        contentType: 'application/json',
        body: JSON.stringify({ message: 'Произошла ошибка' })
      });
    });
    await loginPage.open();
    await loginPage.login(email, faker.lorem.words(100));
    await expect(loginPage.page.getByText('Произошла ошибка')).toBeVisible();
  });
});

// Локаторы
// test ('title test', async ({ loginPage }) => {
//   await loginPage.open();
//   await expect(loginPage.title).toBeVisible();
// })
// test ('input test', async ({ loginPage }) => {
//   await loginPage.open();
//   await expect(loginPage.emailInput).toBeVisible();
// })
// test ('email placeholder test', async ({ loginPage }) => {
//   await loginPage.open();
//   await expect(loginPage.emailPlaceholder).toBeVisible();
// })
// test ('password input test', async ({ loginPage }) => {
//   await loginPage.open();
//   await expect(loginPage.passwordInput).toBeVisible();
// })
// test ('password placeholder test', async ({ loginPage }) => {
//   await loginPage.open();
//   await expect(loginPage.passwordPlaceholder).toBeVisible();
// })
// test ('to login button test', async ({ loginPage }) => {
//   await loginPage.open();
//   await expect(loginPage.toLoginButton).toBeVisible();
// })
// test ('to back button test', async ({ loginPage }) => {
//   await loginPage.open();
//   await expect(loginPage.toBackButton).toBeVisible();
// })
// test ('to register button test', async ({ loginPage }) => {
//   await loginPage.open();
//   await expect(loginPage.toRegisterButton).toBeVisible();
// })
// test ('wrong input text test', async ({ loginPage }) => {
//   await loginPage.open();
//   await expect(loginPage.wrongInputText).toBeVisible();
// })
// test ('error text test', async ({ loginPage }) => {
//   await loginPage.open();
//   await expect(loginPage.errorText).toBeVisible();
// })