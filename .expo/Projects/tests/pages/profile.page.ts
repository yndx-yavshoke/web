import { Page, Locator } from '@playwright/test';

export class ProfilePage {
  readonly page: Page;
  readonly statusText: Locator;
  readonly mockAgeConfig = {
    flags: {
      age: {
        enabled: true,
        young: { from: 0, to: 21 },
        adult: { from: 22, to: 68 },
        old: { from: 69, to: 99 },
        oldFrom: 30,
        youngFrom: 2
      }
    }
  };

  constructor(page: Page) {
    this.page = page;
    this.statusText = page.getByText("Ты молоденький котик");
    this.statusText.waitFor({ state: 'visible', timeout: 10000 });
  }

  async open() {
    await this.page.goto('/login');
  }

  async mockAge(age: number) {
    await this.page.route('https://api.yavshok.ru/experiments', (route) => {
      route.fulfill({ 
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ age }) 
      });
    });
  }
}