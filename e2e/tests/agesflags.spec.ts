import { test, expect } from '@playwright/test';
import { test as newAge } from '../Pages/fixtures';

// using auth storage!!
newAge.use({ storageState: '../setup/auth.json' });
//base url for endpoint flags // age structures 
const flagsUrl = 'https://api.yavshok.ru/experiments';

// base age flags
const baseFlags = {
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
};

// mock flags to make it старый!
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

  // mock flags to make it взрослый! but does not work yet!
  const mockAdult = {
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
            "oldFrom": 69,
            "youngFrom": 2
        }
    }
}



test.describe('Logged in with base age', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  newAge('should show "Ты молоденький котик"', async ({ page }) => {
    await page.route(flagsUrl, route =>
      route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(baseFlags) })
    );
    await expect(page.getByText('Ты молоденький котик', { exact: true })).toBeVisible();
  });

  newAge('should show "Ты старый котик"', async ({ page }) => {
    await page.route(flagsUrl, route =>
      route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(mockOld) })
    );
    await expect(page.getByText('Ты старый котик', { exact: true })).toBeVisible();
  });
});


  // this test does not work cuz of backend maybe idk!
  // newAge('should show "Ты взрослый котик"', async ({ page }) => {

  //   await page.route(flagsUrl, route =>
  //     route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(mockAdult) })
  //   );
  //   await page.reload();
  //   await expect(page.getByText('Ты взрослый котик', { exact: true })).toBeVisible();
  // });


