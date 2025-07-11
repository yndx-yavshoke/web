describe("Yavshok Profile Header", () => {
    
    async function loginToProfile(browser) {
        await browser.url("/");
        await browser.pause(1500);
        
        const avatar = await browser.$('[data-testid="user-avatar"]');
        const isAlreadyLoggedIn = await avatar.isDisplayed().catch(() => false);
        
        if (isAlreadyLoggedIn) {
            await browser.pause(500);
            return;
        }
        
        await browser.url("/login");
        await browser.pause(2000);
        
        const emailInput = await browser.$('[data-testid="login-email-input"]');
        const passwordInput = await browser.$('[data-testid="login-password-input"]');
        const submitButton = await browser.$('[data-testid="login-submit-button"]');
        
        await emailInput.waitForDisplayed({ timeout: 10000 });
        await emailInput.setValue("test0@yandex.ru");
        await passwordInput.setValue("123456");
        await submitButton.click();
        
        await avatar.waitForDisplayed({ timeout: 15000 });
        await browser.pause(1000);
    }

    async function freezeGifAnimations(browser) {
        await browser.execute(() => {
            const gifImages = document.querySelectorAll('img[src*=".gif"]');
            
            gifImages.forEach((img) => {
                const imageElement = img as HTMLImageElement;
                if (imageElement.complete && imageElement.naturalWidth > 0) {
                    try {
                        const canvas = document.createElement('canvas');
                        const ctx = canvas.getContext('2d');
                        
                        canvas.width = imageElement.naturalWidth;
                        canvas.height = imageElement.naturalHeight;
                        ctx!.drawImage(imageElement, 0, 0);
                        imageElement.src = canvas.toDataURL('image/png');
                        
                        console.log('GIF заморожен в статичное изображение');
                    } catch (error) {
                        console.log('Не удалось заморозить GIF:', error);
                    }
                }
            });
        });
    }

    // Тест 1: Аватар профиля (гифка)
    it("profile avatar gif", async ({browser}) => {
        await loginToProfile(browser);
        
        const avatar = await browser.$('[data-testid="user-avatar"]');
        await avatar.waitForDisplayed({ timeout: 5000 });
        
        await browser.pause(1500);
        await freezeGifAnimations(browser);
        await browser.pause(500);
        
        await browser.assertView("profile-avatar", '[data-testid="user-avatar"]', {
            tolerance: 5,
            antialiasingTolerance: 3
        });
    });

    // Тест 2: Блок статистики профиля
    it("profile statistics", async ({browser}) => {
        await loginToProfile(browser);
        
        await browser.pause(1500);
        
        const statsSelector = await browser.execute(() => {
            const elements = Array.from(document.querySelectorAll('*'));
            const postsElement = elements.find(el => el.textContent === '42');
            
            if (postsElement) {
                const statsContainer = postsElement.parentElement?.parentElement;
                if (statsContainer) {
                    statsContainer.id = 'stats-container-for-test';
                    return '#stats-container-for-test';
                }
            }
            return null;
        });
        
        if (statsSelector) {
            await browser.assertView("profile-stats", statsSelector);
        } else {
            await browser.assertView("profile-stats", "body", {
                ignoreElements: [
                    '[data-testid="user-avatar"]',
                    '[data-testid="user-logout-button"]'
                ]
            });
        }
    });

    // Тест 3: Кнопка редактирования профиля
    it("edit profile button", async ({browser}) => {
        await loginToProfile(browser);
        
        await browser.pause(1000);
        
        const editButton = await browser.$('[data-testid="user-edit-profile-button"]');
        await editButton.waitForDisplayed({ timeout: 5000 });
        await browser.assertView("edit-button", '[data-testid="user-edit-profile-button"]');
    });

    // Тест 4: Кнопка выхода из профиля
    it("logout button", async ({browser}) => {
        await loginToProfile(browser);
        
        const logoutButton = await browser.$('[data-testid="user-logout-button"]');
        await logoutButton.waitForDisplayed({ timeout: 5000 });
        
        await browser.assertView("logout-button", '[data-testid="user-logout-button"]');
    });
}); 