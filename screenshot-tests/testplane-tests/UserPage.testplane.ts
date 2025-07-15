const { setupLoggedUser } = require("./utils/auth.setup");
import { faker } from '@faker-js/faker';

describe("Страница пользователя yavshok.ru", function () {
  let avatar: WebdriverIO.Element;
  let name: WebdriverIO.Element;
  let status: WebdriverIO.Element;
  let editButton: WebdriverIO.Element;
  let logoutButton: WebdriverIO.Element;
  let infoParent: WebdriverIO.Element;
  let postsStat: WebdriverIO.Element;
  let followersStat: WebdriverIO.Element;
  let likesStat: WebdriverIO.Element;

  beforeEach(async function ({ browser }) {
    await setupLoggedUser(browser);

    avatar = await browser.$("[data-testid='user-avatar']");

    editButton = await browser.$("[data-testid='user-edit-profile-button']");
    name = await browser.$(
      "//div[@data-testid='user-edit-profile-button']/preceding-sibling::div[2]"
    );
    status = await browser.$(
      "//div[@data-testid='user-edit-profile-button']/preceding-sibling::div[1]"
    );

    logoutButton = await browser.$("[data-testid='user-logout-button']");
    postsStat = await browser.$("//*[text()='Постов']/preceding-sibling::*[1]");
    followersStat = await browser.$(
      "//*[text()='Подписчиков']/preceding-sibling::*[1]"
    );
    likesStat = await browser.$("//*[text()='Лайков']/preceding-sibling::*[1]");
  });

  it("шапка профиля", async function ({ browser }) {
    let header = await browser.$(
      "//div[@data-testid='user-edit-profile-button']/preceding-sibling::div[2]/../../../.."
    );
    await header.assertView("user-header", {
      disableAnimation: true,
      ignoreElements: [
        "//div[@data-testid='user-edit-profile-button']/preceding-sibling::div[2]",
        "//div[@data-testid='user-edit-profile-button']/preceding-sibling::div[1]",
        "[data-testid='user-avatar']",
      ],
    });
  });

  it("кнопка редактирования профиля", async function ({ browser }) {
    await editButton.assertView("edit-profile-button");
  });

  it("кнопка logout", async function ({ browser }) {
    await logoutButton.assertView("logout-button");
  });
});

describe("Изменение имени пользователя", function () {
  let changeNameInput: WebdriverIO.Element;
  let saveChangeButton: WebdriverIO.Element;
  let cancelButton: WebdriverIO.Element;

  beforeEach(async function ({ browser }) {
    await setupLoggedUser(browser);
    await (await browser.$("[data-testid='user-edit-profile-button']")).click();

    changeNameInput = await browser.$("[data-testid='edit-name-input']");
    saveChangeButton = await browser.$("[data-testid='edit-save-button']");
    saveChangeButton = await browser.$("[data-testid='edit-cancel-button']");
  });

  it("поле изменения имени", async function ({browser}) {
    await changeNameInput.setValue("");
    await browser.refresh();
    await changeNameInput.assertView("empty-input");

    await changeNameInput.click();
    await changeNameInput.assertView("focus-input");
  })
});
