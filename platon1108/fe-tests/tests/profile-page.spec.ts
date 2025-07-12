import { expect } from '@playwright/test';
import { test } from "../fixtures/index";

const BASE_MOCK = {
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

const MOCK_FOR_YOUNG = JSON.parse(JSON.stringify(BASE_MOCK));

const MOCK_FOR_ADULT = JSON.parse(JSON.stringify(BASE_MOCK));
MOCK_FOR_ADULT['flags']['age']['young']['to'] = 9;
MOCK_FOR_ADULT['flags']['age']['adult']['from'] = 10;

const MOCK_FOR_OLD = JSON.parse(JSON.stringify(BASE_MOCK));
MOCK_FOR_OLD['flags']['age']['young']['to'] = 9;
MOCK_FOR_OLD['flags']['age']['adult']['from'] = 10;
MOCK_FOR_OLD['flags']['age']['adult']['to'] = 11;
MOCK_FOR_OLD['flags']['age']['old']['from'] = 12;
MOCK_FOR_OLD['flags']['age']['oldFrom'] = 12;

const MOCK_HIDDEN = JSON.parse(JSON.stringify(BASE_MOCK));
MOCK_HIDDEN['flags']['age']['enabled'] = false;


test.use({ storageState: "tests/setup/.auth/user_creds.json" });

test('Check visibility of all elements', async ({ profilePage }) => {
    await profilePage.open();

    await expect(profilePage.avatar).toBeVisible();
    await expect(profilePage.name).toBeVisible();
    await expect(profilePage.status).toBeVisible();
    await expect(profilePage.postsNumber).toBeVisible();
    await expect(profilePage.subsNumber).toBeVisible();
    await expect(profilePage.likesNumber).toBeVisible();
    await expect(profilePage.postsHeader).toBeVisible();
    await expect(profilePage.subsHeader).toBeVisible();
    await expect(profilePage.likesHeader).toBeVisible();
    await expect(profilePage.editProfileButton).toBeVisible();
    await expect(profilePage.logoutButton).toBeVisible();
    await expect(profilePage.picture1).toBeVisible();
    await expect(profilePage.picture2).toBeVisible();
    await expect(profilePage.picture3).toBeVisible();
    await expect(profilePage.picture4).toBeVisible();
});


test('Check status of young user', async ({ profilePage }) => {
    await profilePage.open();
    await profilePage.page.route("https://api.yavshok.ru/experiments", (route) => {
      route.fulfill({
        status: 200,
        body: JSON.stringify(MOCK_FOR_YOUNG),
      });
    });

    await profilePage.page.waitForURL('/');

    const name = await profilePage.name.textContent();
    const status = await profilePage.status.textContent();

    await expect(name).toEqual(process.env.TEST_NAME!);
    await expect(status).toEqual('Ты молоденький котик');
});


test.skip('Check status of adult user', async ({ profilePage }) => { // Skip this test due to product issue (adult status is not supported)
    await profilePage.open();
    await profilePage.page.route("https://api.yavshok.ru/experiments", (route) => {
      route.fulfill({
        status: 200,
        body: JSON.stringify(MOCK_FOR_ADULT),
      });
    });

    await profilePage.page.waitForURL('/');

    const name = await profilePage.name.textContent();
    const status = await profilePage.status.textContent();
    
    await expect(name).toEqual(process.env.TEST_NAME!);
    await expect(status).toEqual('Ты взрослый котик');
});


test('Check status of old user', async ({ profilePage }) => {
    await profilePage.open();
    await profilePage.page.route("https://api.yavshok.ru/experiments", (route) => {
      route.fulfill({
        status: 200,
        body: JSON.stringify(MOCK_FOR_OLD),
      });
    });

    await profilePage.page.waitForURL('/');

    const name = await profilePage.name.textContent();
    const status = await profilePage.status.textContent();
    
    await expect(name).toEqual(process.env.TEST_NAME!);
    await expect(status).toEqual('Ты старый котик');
});


test('Check hidden status', async ({ profilePage }) => {
    await profilePage.open();
    await profilePage.page.route("https://api.yavshok.ru/experiments", (route) => {
      route.fulfill({
        status: 200,
        body: JSON.stringify(MOCK_HIDDEN),
      });
    });

    await profilePage.page.waitForURL('/');

    const name = await profilePage.name.textContent();
    const status = await profilePage.status.textContent();
    
    await expect(name).toEqual(process.env.TEST_NAME!);
    await expect(status).toEqual('UwU');
});


test('Check redirect to edit page', async ({ profilePage, editProfilePage }) => {
    await profilePage.open();

    await profilePage.editProfileButton.click();

    await profilePage.page.waitForURL(url => url.pathname === '/edit');
    await expect(editProfilePage.header).toBeVisible();
});


test('Check logout', async ({ profilePage, mainPage }) => {
    await profilePage.open();

    await profilePage.logoutButton.click();

    await expect(mainPage.header).toBeVisible();
});