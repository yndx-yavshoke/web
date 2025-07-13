import "dotenv/config";

describe("Элементы шапки профиля пользователя", () => {
  const utils = {
    open: async function ({ browser }) {
      await browser.url("/login");
    },
    auth: async function ({ browser }) {
      await browser
        .$('[data-testid="login-email-input"]')
        .setValue(process.env.LOGIN_EMAIL);
      await browser
        .$('[data-testid="login-password-input"]')
        .setValue(process.env.LOGIN_PASSWORD);
      await browser.$('[data-testid="login-submit-button"]').click();
      await browser
        .$('[data-testid="user-edit-profile-button"]')
        .waitForDisplayed();
    },
  };
  beforeEach(async ({ browser }) => {
    await utils.open({ browser });
    await utils.auth({ browser });
  });

  const headerElements = {
    fullHeaderBlock: '//div[@data-testid="user-avatar"]/ancestor::div[3]',
    personalInfoBlock:
      '//div[@data-testid="user-avatar"]/following-sibling::div[1]',
    statisticsBlock:
      '//div[@data-testid="user-avatar"]/parent::div/following-sibling::div[1]',
    userName:
      '//div[@data-testid="user-edit-profile-button"]/preceding-sibling::div[2]',
    userAgeStatus:
      '//div[@data-testid="user-edit-profile-button"]/preceding-sibling::div[1]',
    userPosts:
      '//div[@data-testid="user-avatar"]/ancestor::div[1]/following-sibling::div[1]/div[1]/div[1]',
    userSubscribers:
      '//div[@data-testid="user-avatar"]/ancestor::div[1]/following-sibling::div[1]/div[2]/div[1]',
    userLikes:
      '//div[@data-testid="user-avatar"]/ancestor::div[1]/following-sibling::div[1]/div[3]/div[1]',
  };

  it("Полная шапка профиля", async ({ browser }) => {
    await browser.assertView(
      "profile_header_full",
      headerElements.fullHeaderBlock,
      {
        disableAnimation: true,
        ignoreElements: [
          headerElements.userName,
          headerElements.userAgeStatus,
          headerElements.userPosts,
          headerElements.userSubscribers,
          headerElements.userLikes,
        ],
      }
    );
  });

  it("Блок личных данных", async ({ browser }) => {
    await browser.assertView(
      "profile_personal_info",
      headerElements.personalInfoBlock,
      {
        disableAnimation: true,
        ignoreElements: [headerElements.userName, headerElements.userAgeStatus],
      }
    );
  });

  it("Блок статистики профиля", async ({ browser }) => {
    await browser.assertView(
      "profile_personal_info",
      headerElements.statisticsBlock,
      {
        disableAnimation: true,
        ignoreElements: [
          headerElements.userPosts,
          headerElements.userSubscribers,
          headerElements.userLikes,
        ],
      }
    );
  });
});
