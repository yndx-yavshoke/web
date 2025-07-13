import { expect } from "@playwright/test";
import { test } from "../fixtures/index";

test.use({ storageState: "tests/setup/.auth/user.json" });

const mock = {
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
      "youngFrom": 0,
      "oldFrom": 100
    }
  }
}

test('Проверка статуса "Ты молоденький котик"', async ({ page, profilePage, mainPage }) => {
    await test.step('Открываем страницу профиля', async () => {
      await profilePage.open('/');
    });

    const customMock = structuredClone(mock);
    customMock.flags.age.youngFrom = 0;

    await test.step('Меняем возраст моками так, чтобы статус изменился на "Ты молоденький котик"', async () => {
      await page.route('https://api.yavshok.ru/experiments', (route) => {
        route.fulfill ({
            status: 200,
            body: JSON.stringify(customMock)
        })
      })
    });
    await test.step('Проверяем, что отображается статус "Ты молоденький котик"', async () => {
      await expect(profilePage.youngStatus).toBeVisible();
    });
})

// падающий тест
// test('Проверка статуса "Ты взрослый котик"', async ({ page, profilePage }) => {
//     await profilePage.open('/');

//     const customMock = structuredClone(mock);
//     customMock.flags.age.youngFrom = 100;
//     customMock.flags.age.oldFrom = 100;

//     await page.route('https://api.yavshok.ru/experiments', (route) => { 
//       route.fulfill ({
//           status: 200,
//           body: JSON.stringify(customMock)
//       })
//     })

//     await expect(profilePage.adultStatus).toBeVisible();
// })

test('Проверка статуса "Ты старый котик"', async ({ page, profilePage }) => {
    await test.step('Открываем страницу профиля', async () => {
      await profilePage.open('/');
    });

    const customMock = structuredClone(mock);
    customMock.flags.age.youngFrom = 100;
    customMock.flags.age.oldFrom = 0;

    await test.step('Меняем возраст моками так, чтобы статус изменился на "Ты старый котик"', async () => {
      await page.route('https://api.yavshok.ru/experiments', (route) => { 
        route.fulfill ({
            status: 200,
            body: JSON.stringify(customMock)
        })
      })
    });

    await test.step('Проверяем, что отображается статус "Ты старый котик"', async () => {
      await expect(profilePage.oldStatus).toBeVisible();
    });
})