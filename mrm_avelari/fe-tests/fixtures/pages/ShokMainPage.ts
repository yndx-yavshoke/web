import { Page, Locator, expect, test } from '@playwright/test';

export class ShokMainPage {
  public title: Locator;
  public emailInput: Locator;
  public emailPlaceholder: Locator;
  public statusInShok: Locator;
  public statusNotInShok: Locator;
  public catGif: Locator;
  public checkStatusButton: Locator;
  public loginButton: Locator;

  constructor(public readonly page: Page) {
    this.title = this.page.getByText('Я в ШОКе', { exact: true });
    this.emailInput = this.page.getByTestId('main-email-input');
    this.emailPlaceholder = this.page.getByPlaceholder('Введите email');
    this.statusInShok = this.page.getByText('Ты уже в ШОКе');
    this.statusNotInShok = this.page.getByText('Ты еще не в ШОКе');
    this.catGif = this.page.locator('img[src*="happyCat"]');
    this.checkStatusButton = this.page.getByTestId('main-check-button');
    this.loginButton = this.page.getByTestId('main-login-button');
  }

  public async open() {
    await this.page.goto('/');
  }

  public async clickLoginButton() {
    await this.loginButton.click();
  }

  public async checkEmailStatus(email: string, valid: boolean) {
    await this.emailInput.fill(email);
    await expect(this.emailInput).toHaveValue(email);
    await this.checkStatusButton.click();

    if (valid) {
      await expect(this.statusInShok).toBeVisible();
    } else {
      await expect(this.statusNotInShok).toBeVisible();
    }
  }

  public async checkColorOfPhrase(expectedColor: string, isGreen: boolean) {
    await test.step('Проверить, что фраза отображается с ожидаемым цветом', async () => {
    const phrase = isGreen ? this.statusInShok : this.statusNotInShok;

    await expect(phrase).toBeVisible();

    const actualColor = await phrase.evaluate((el) => {
      return window.getComputedStyle(el).color;
    });

    expect(actualColor, `Ожидался цвет: ${expectedColor}, но получен: ${actualColor}`).toBe(expectedColor);
    });
  }

  public async expectUI() {
    await test.step('Проверить видимость заголовка страницы', async () => {
      await expect(this.title, 'Заголовок страницы должен быть видимым').toBeVisible();
    });

    await test.step('Проверить видимость поля для ввода email и его плейсхолдера', async () => {
      await expect(this.emailInput, 'Поле ввода email должно быть видимым').toBeVisible();
      await expect(this.emailPlaceholder, 'Плейсхолдер email должен быть видимым').toBeVisible();
    });

    await test.step('Проверить видимость кнопки проверки email на ШОКовость', async () => {
      await expect(this.checkStatusButton, 'Кнопка проверки email должна быть видимой').toBeVisible();
    });

    await test.step('Проверить видимость кнопки входа', async () => {
      await expect(this.loginButton, 'Кнопка входа должна быть видимой').toBeVisible();
    });
  }
}
