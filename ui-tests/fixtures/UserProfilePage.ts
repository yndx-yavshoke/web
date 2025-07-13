import { t } from "@faker-js/faker/dist/airline-CLphikKp";
import { Page, Locator, expect } from "@playwright/test";
import * as fs from "fs";
import * as path from "path";

const authPath = path.join(process.cwd(), "secrets", "auth.json");
const authData = JSON.parse(fs.readFileSync(authPath, "utf-8"));

export class UserProfilePage {
  public userAvatar: Locator;
  public userStatus: Locator;
  public userName: Locator;
  public editProfileButton: Locator;
  public logoutButton: Locator;

  public inputNewName: Locator;
  public saveButton: Locator;
  public cancelButton: Locator;

  constructor(public readonly page: Page) {
    this.userAvatar = this.page.getByTestId("user-avatar");
    this.userStatus = this.page
      .locator("text=/Ты\\s+(молоденький|взрослый|старый)\\s+котик/")
      .first();
    this.editProfileButton = this.page.getByText("Edit Profile", {
      exact: true,
    });
    this.logoutButton = this.page.getByTestId("user-logout-button");
    this.userName = this.userStatus.locator("xpath=../*[1]");

    this.inputNewName = this.page.getByTestId("edit-name-input");
    this.saveButton = this.page.getByTestId("edit-save-button");
    this.cancelButton = this.page.getByTestId("edit-cancel-button");
  }

  public async open() {
    await this.page.goto("/");
  }

  public async logout() {
    await this.logoutButton.click();
    await expect(
      this.page.getByText("Я в ШОКе", { exact: true })
    ).toBeVisible();
  }

  public async reEntry() {
    await this.logoutButton.click();
    await this.page.getByTestId("main-login-button").click();
    await this.page.getByTestId("login-email-input").fill(authData.email);
    await this.page.getByTestId("login-password-input").fill(authData.password);
    await this.page.getByTestId("login-submit-button").click();
  }

  public async mockAgeFlags() {
    await this.page.route('**/experiments', async (route) => {
    await route.fulfill({
      json: {
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
      }
    });
    });
  }

  public async mockUserAge(age: number) {
  await this.page.route('**/auth/login', async (route) => {
   const response = await route.fetch(); // отправляем оригинальный запрос
    const body = await response.json(); // получаем оригинальный ответ

    body.user.age = age;

    await route.fulfill({
      response, // сохраняем оригинальные заголовки, статус и т.п.
      body: JSON.stringify(body), // но подменяем тело
    });
  });
}
}