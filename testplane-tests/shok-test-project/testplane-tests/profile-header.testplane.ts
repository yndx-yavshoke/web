
const auth = require('./auth.json');

describe('Profile Header Visual', () => {
  let isLoggedIn = false;

  beforeEach(async ({browser}) => {
    await browser.setWindowSize(1280, 800);
    if (!isLoggedIn) {
      await browser.runStep('Открыть страницу логина', async () => {
        await browser.openAndWait('https://yavshok.ru/login');
      });
      await browser.runStep('Ввести email', async () => {
        await browser.$('[data-testid="login-email-input"]').setValue(auth.email);
      });
      await browser.runStep('Ввести пароль', async () => {
        await browser.$('[data-testid="login-password-input"]').setValue(auth.password);
      });
      await browser.runStep('Нажать кнопку входа', async () => {
        await browser.$('[data-testid="login-submit-button"]').click();
      });
      await browser.runStep('Дождаться появления аватарки', async () => {
        await browser.$('[data-testid="user-avatar"]').waitForDisplayed({timeout: 10000});
      });
      isLoggedIn = true;
    }
  });

  it('should display user name and status', async ({browser}) => {
    await browser.runStep('Открыть профиль', async () => {
      await browser.openAndWait('https://yavshok.ru/');
    });
    await browser.runStep('Проверить отображение имени пользователя', async () => {
      await browser.assertView('profile-username', '//div[@data-testid="user-avatar"]/following-sibling::div[1]');
    });
  });

  it('should display user avatar (canvas freeze gif)', async ({browser}) => {
    await browser.runStep('Открыть профиль', async () => {
      await browser.openAndWait('https://yavshok.ru/');
    });
    await browser.runStep('Заменить гифку на canvas с первым кадром', async () => {
      await browser.execute(() => {
        const gif = document.querySelector('img[src*="profile"]');
        if (gif && gif instanceof HTMLImageElement) {
          const canvas = document.createElement('canvas');
          canvas.width = gif.width;
          canvas.height = gif.height;
          const ctx = canvas.getContext('2d');
          ctx && ctx.drawImage(gif, 0, 0, gif.width, gif.height);
          gif.parentNode && gif.parentNode.replaceChild(canvas, gif);
        }
      });
    });
    await browser.runStep('Проверить отображение аватарки', async () => {
      await browser.assertView('profile-avatar-canvas', '[data-testid="user-avatar"]');
    });
  });

  it('should display edit profile button', async ({browser}) => {
    await browser.runStep('Открыть профиль', async () => {
      await browser.openAndWait('https://yavshok.ru/');
    });
    await browser.runStep('Проверить отображение кнопки редактирования', async () => {
      await browser.assertView('profile-edit-btn', '[data-testid="user-edit-profile-button"]');
    });
  });

  it('should display logout button', async ({browser}) => {
    await browser.runStep('Открыть профиль', async () => {
      await browser.openAndWait('https://yavshok.ru/');
      await browser.pause(10000);
    });
    await browser.runStep('Проверить отображение кнопки выхода', async () => {
      await browser.assertView('profile-logout-btn', '[data-testid="user-logout-button"]');
    });
  });

  it('should display all gallery images', async ({browser}) => {
    await browser.runStep('Открыть профиль', async () => {
      await browser.openAndWait('https://yavshok.ru/');
    });
    for (let i = 0; i < 4; i++) {
      await browser.runStep(`Проверить отображение картинки ${i+1}`, async () => {
        const img = await browser.$(`[data-testid="gallery-image-${i}"]`);
        await img.waitForDisplayed({timeout: 10000});
        await browser.assertView(`gallery-image-${i}`, `[data-testid="gallery-image-${i}"]`);
      });
    }
  });
});