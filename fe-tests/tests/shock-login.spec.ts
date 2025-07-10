import { expect } from '@playwright/test';
import { test } from '../fixtures/index';
import { mock } from 'node:test';
import { faker } from '@faker-js/faker';
import { allure } from 'allure-playwright';

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

test('Статус молоденький котик', async ({ page }) => {
  await allure.step('Открыть главную страницу', async () => {
    await page.goto('/');
  });

  await allure.step('Настроить мок для молодого пользователя', async () => {
    await page.route('https://api.yavshok.ru/experiments', (route) => {
      route.fulfill({
        status: 200,
        body: JSON.stringify(mockYoung)
      });
    });
  });
  await allure.step('Перезагрузить страницу для применения мока', async () => {
    await page.reload();
  });
  await allure.step('Проверить, что поле ввода email скрыто', async () => {
    await expect(page.getByTestId('main-email-input')).not.toBeVisible();
  });
  await allure.step('Проверить отображение статуса "Ты молоденький котик"', async () => {
    await expect(page.getByText('Ты молоденький котик')).toBeVisible();
  });
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

// test('Статус взрослый котик', async ({ page }) => {
//   await page.goto('/');
//   await page.route('https://api.yavshok.ru/experiments', (route) => {
//     route.fulfill({
//       status: 200,
//       body: JSON.stringify(mockAdult)
//     });
//   });
//   await page.reload();
//   await expect(page.getByTestId('main-email-input')).not.toBeVisible();
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
test('Статус старый котик', async ({ page }) => {
  await allure.step('Открыть главную страницу', async () => {
    await page.goto('/');
  });
  await allure.step('Настроить мок  для старого пользователя', async () => {
    await page.route('https://api.yavshok.ru/experiments', (route) => {
      route.fulfill({
        status: 200,
        body: JSON.stringify(mockOld)
      });
    });
  });
  await allure.step('Перезагрузить страницу для применения мока', async () => {
    await page.reload();
  });
  await allure.step('Проверить отображение статуса "Ты старый котик"', async () => {
    await expect(page.getByText(' Ты старый котик')).toBeVisible();
  });
});

test.describe('Негативные тесты', () => {
  const email = 'anastasiagurtovykh@yandex.ru';

  test('Попытка авторизации с незарегистрированным email', async ({ loginPage, page }) => {
    await allure.step('Настроить мок для ошибки авторизации', async () => {
      await page.route('https://api.yavshok.ru/auth/login', (route) => {
        route.fulfill({
          status: 422,
          contentType: 'application/json',
          body: JSON.stringify({ message: 'Произошла ошибка' })
        });
      });
    });
    await allure.step('Открыть страницу авторизации', async () => {
      await loginPage.open();
    });
    
    const randomEmail = faker.internet.email();
    const randomPassword = faker.internet.password();
    
    await allure.step(`Попытаться войти с незарегистрированным email: ${randomEmail}`, async () => {
      await loginPage.login(randomEmail, randomPassword);
    });
    await allure.step('Проверить отображение ошибки', async () => {
      await expect(loginPage.page.getByText('Произошла ошибка')).toBeVisible();
    });
  });

  test('Ввод неверного пароля для существующего пользователя', async ({ loginPage, page }) => {
    await allure.step('Настроить мок для ошибки авторизации', async () => {
      await page.route('https://api.yavshok.ru/auth/login', (route) => {
        route.fulfill({
          status: 422,
          contentType: 'application/json',
          body: JSON.stringify({ message: 'Произошла ошибка' })
        });
      });
    });
    await allure.step('Открыть страницу авторизации', async () => {
      await loginPage.open();
    });
    const randomPassword = faker.internet.password();
    
    await allure.step(`Попытаться войти с неверным паролем для email: ${email}`, async () => {
      await loginPage.login(email, randomPassword);
    });
    await allure.step('Проверить отображение ошибки', async () => {
      await expect(loginPage.page.getByText('Произошла ошибка')).toBeVisible();
    });
  });

  test('Попытка авторизации с пустыми полями', async ({ loginPage, page }) => {
    await allure.step('Настроить мок для ошибки авторизации', async () => {
      await page.route('https://api.yavshok.ru/auth/login', (route) => {
        route.fulfill({
          status: 422,
          contentType: 'application/json',
          body: JSON.stringify({ message: 'Произошла ошибка' })
        });
      });
    });
    await allure.step('Открыть страницу авторизации', async () => {
      await loginPage.open();
    });
    await allure.step('Попытаться войти с пустыми полями', async () => {
      await loginPage.login('', '');
    });
    await allure.step('Проверить отображение ошибок валидации', async () => {
      await expect(loginPage.page.getByText('Введите email')).toBeVisible();
      await expect(loginPage.page.getByText('Введите пароль')).toBeVisible();
    });
  });

  test('Попытка авторизации с неверным форматом email (нет @)', async ({ loginPage, page }) => {
    await allure.step('Настроить мок для ошибки авторизации', async () => {
      await page.route('https://api.yavshok.ru/auth/login', (route) => {
        route.fulfill({
          status: 422,
          contentType: 'application/json',
          body: JSON.stringify({ message: 'Произошла ошибка' })
        });
      });
    });
    await allure.step('Открыть страницу авторизации', async () => {
      await loginPage.open();
    });
    
    const invalidEmail = faker.lorem.word();
    const randomPassword = faker.internet.password();
    
    await allure.step(`Попытаться войти с некорректным email без @: ${invalidEmail}`, async () => {
      await loginPage.login(invalidEmail, randomPassword);
    });
    await allure.step('Проверить отображение ошибки', async () => {
      await expect(loginPage.page.getByText('Произошла ошибка')).toBeVisible();
    });
  });

  test('Попытка авторизации с неверным форматом email (нет домена)', async ({ loginPage, page }) => {
    await allure.step('Настроить мок для ошибки авторизации', async () => {
      await page.route('https://api.yavshok.ru/auth/login', (route) => {
        route.fulfill({
          status: 422,
          contentType: 'application/json',
          body: JSON.stringify({ message: 'Произошла ошибка' })
        });
      });
    });
    
    await allure.step('Открыть страницу авторизации', async () => {
      await loginPage.open();
    });
    
    const invalidEmail = faker.person.firstName() + '@';
    const randomPassword = faker.internet.password();
    
    await allure.step(`Попытаться войти с некорректным email без домена: ${invalidEmail}`, async () => {
      await loginPage.login(invalidEmail, randomPassword);
    });
    
    await allure.step('Проверить отображение ошибки', async () => {
      await expect(loginPage.page.getByText('Произошла ошибка')).toBeVisible();
    });
  });

  test('Попытка авторизации со слишком длинным паролем', async ({ loginPage, page }) => {
    await allure.step('Настроить мок для ошибки авторизации', async () => {
      await page.route('https://api.yavshok.ru/auth/login', (route) => {
        route.fulfill({
          status: 422,
          contentType: 'application/json',
          body: JSON.stringify({ message: 'Произошла ошибка' })
        });
      });
    });
    await allure.step('Открыть страницу авторизации', async () => {
      await loginPage.open();
    });
    
    const longPassword = faker.lorem.words(100);
    
    await allure.step(`Попытаться войти со слишком длинным паролем для email: ${email}`, async () => {
      await loginPage.login(email, longPassword);
    });
    await allure.step('Проверить отображение ошибки', async () => {
      await expect(loginPage.page.getByText('Произошла ошибка')).toBeVisible();
    });
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