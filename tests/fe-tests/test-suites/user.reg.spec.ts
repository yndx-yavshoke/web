import { test, expect } from '@playwright/test';
import { UserProfilePage } from '../pages/user.page';
import { EditProfilePage } from '../pages/edit.page';
import { step } from 'allure-js-commons';

test('user logs out successfully', async ({ page }) => {
  const profilePage = new UserProfilePage(page);

  await test.step('Navigate to user profile page', async () => {
    await page.goto('/');
  });

  await test.step('Click logout button', async () => {
    await profilePage.logOut();
  });

  await test.step('Verify logout button is no longer visible', async () => {
    await expect(profilePage.logoutButton).toBeHidden();
  });
});

test('user can change name and see it on profile page', async ({ page }) => {
  const profilePage = new UserProfilePage(page);
  const editPage = new EditProfilePage(page);
  const newName = 'Huge Capibara';

  await test.step('Open user profile page', async () => {
    await page.goto('/');
  });

  await test.step('Navigate to edit profile page', async () => {
    await profilePage.editProfileButton.click();
  });

  await test.step(`Change name to "${newName}" and save`, async () => {
    await editPage.updateName(newName);
  });

  await test.step('Verify new name is visible on profile page', async () => {
    await expect(profilePage.userName).toHaveText(newName);
  });
});

test('user cancels name change and old name is preserved', async ({ page }) => {
  const profilePage = new UserProfilePage(page);
  const editPage = new EditProfilePage(page);

  await test.step('Navigate to user profile page', async () => {
    await page.goto('/');
  });

  let originalName: string;
  await test.step('Get current username', async () => {
    originalName = await profilePage.getUsername();
  });

  await test.step('Click edit profile button', async () => {
    await profilePage.editProfileButton.click();
  });

  await test.step('Type a new name and cancel editing', async () => {
    await editPage.nameInput.fill('Mad Bison');
    await editPage.cancelEditing();
  });

  await test.step('Verify the username has not changed', async () => {
    await expect(profilePage.userName).toHaveText(originalName);
  });
});


test('custom status from /experiments mock - young', async ({ page }) => {
  await test.step('Mock /experiments response to set young age threshold', async () => {
    await page.route('https://api.yavshok.ru/experiments', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          flags: {
            age: {
              enabled: true,
              young: { from: 0, to: 21 },
              adult: { from: 40, to: 68 },
              old: { from: 69, to: 99 },
              oldFrom: 80,
              youngFrom: 14
            }
          }
        }),
      });
    });
  });

  const userPage = await test.step('Navigate to the user profile page', async () => {
    await page.goto('https://yavshok.ru/');
    return new UserProfilePage(page);
  });

  await test.step('Verify status text reflects "young cat"', async () => {
    await expect(userPage.statusText).toHaveText('Ты молоденький котик');
  });
});

test('custom status from /experiments mock - old', async ({ page }) => {
  await test.step('Mock /experiments response to classify user as "old"', async () => {
    await page.route('https://api.yavshok.ru/experiments', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          flags: {
            age: {
              enabled: true,
              young: { from: 0, to: 21 },
              adult: { from: 40, to: 68 },
              old: { from: 69, to: 99 },
              oldFrom: 30,
              youngFrom: 14,
            },
          },
        }),
      });
    });
  });

  const userPage = await test.step('Navigate to the user profile page', async () => {
    await page.goto('https://yavshok.ru/');
    return new UserProfilePage(page);
  });

  await test.step('Verify status text reflects "old cat"', async () => {
    await expect(userPage.statusText).toHaveText('Ты старый котик');
  });
});

test.skip('custom status from /experiments mock - adult', async ({ page }) => {
  await page.route('https://api.yavshok.ru/experiments', async route => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(
                  {
                    "flags": {
                      "age": {
                      "enabled": true,
                      "young": { "from": 0, "to": 21 },
                      "adult": { "from": 40, "to": 68 },
                      "old": { "from": 69, "to": 99 },
                      "oldFrom": 69,
                      "youngFrom": 21
                      }
                    }
                  }
      ),
    });
  });

  await page.goto('https://yavshok.ru/');
  const userPage = new UserProfilePage(page);
  
  await expect(userPage.statusText).toHaveText('Ты старый котик');
});