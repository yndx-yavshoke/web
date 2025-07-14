/**
 * Стабилизация GIF изображений путем замены на статичные PNG
 */
export async function stabilizeGif(browser: any, selector: string = "img") {
    await browser.execute((sel: string) => {
        const allImages = document.querySelectorAll("img");

        allImages.forEach((img: HTMLImageElement) => {
            if (img && img.complete && img.src && img.src.includes(".gif")) {
                try {
                    const canvas = document.createElement("canvas");
                    const ctx = canvas.getContext("2d");

                    canvas.width = img.naturalWidth || img.offsetWidth || 100;
                    canvas.height = img.naturalHeight || img.offsetHeight || 100;

                    ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);

                    img.src = canvas.toDataURL("image/png");
                } catch (error) {
                    // Если canvas не работает, заменяем на статичное изображение
                    img.src = '/assets/assets/images/static-cat.png';
                }
            }
        });
    }, selector);
}

/**
 * Маскировка input полей для скрытия введенных данных
 */
export async function maskInputFields(browser: any, selectors: string[] = []) {
    await browser.execute((selectors: string[]) => {
        selectors.forEach((selector) => {
            const inputs = document.querySelectorAll(selector);
            inputs.forEach((input: Element) => {
                if (input instanceof HTMLInputElement) {
                    input.style.color = "transparent";
                    input.style.textShadow = "0 0 0 black";
                    input.style.background = "black";
                    input.style.caretColor = "transparent";
                }
            });
        });
    }, selectors);
}

/**
 * Маскировка галереи изображений
 */
export async function maskGalleryImages(browser: any) {
    const gallerySelectors = [
        '[data-testid^="gallery-item-"]',
        '[data-testid^="gallery-image-"]'
    ];
    
    await browser.execute((selectors: string[]) => {
        selectors.forEach((selector) => {
            const elements = document.querySelectorAll(selector);
            elements.forEach((element: Element) => {
                if (element instanceof HTMLImageElement) {
                    element.style.filter = "blur(5px)";
                    element.style.opacity = "0.3";
                }
            });
        });
    }, gallerySelectors);
}

/**
 * Установка масштаба страницы
 */
export async function setPageZoom(browser: any, zoom: number = 0.5) {
    await browser.execute((zoomLevel: number) => {
        document.body.style.zoom = zoomLevel.toString();
    }, zoom);
}


/**
 * Стабилизация профиля пользователя
 */
export async function stabilizeProfilePage(browser: any) {
    // Ждем загрузки аватара
    await browser.waitUntil(async () => {
        const avatar = await browser.$('[data-testid="user-avatar"]');
        const img = await avatar.$('img');
        return await img.isDisplayed() && await img.isExisting();
    }, { timeout: 5000 });

    // Стабилизируем аватар пользователя
    await stabilizeUserAvatar(browser);
    
    // Маскируем галерею изображений
    await maskGalleryImages(browser);
    // Устанавливаем масштаб
    await setPageZoom(browser);
} 

/**
 * Проверка стабилизации аватара
 */
export async function checkAvatarStabilization(browser: any) {
    return await browser.execute(() => {
        const avatarImg = document.querySelector('[data-testid="user-avatar"] img') as HTMLImageElement;
        if (avatarImg) {
            // Проверяем, что изображение не является GIF
            return !avatarImg.src.includes(".gif") && avatarImg.complete;
        }
        return false;
    });
} 

/**
 * Стабилизация аватара пользователя
 */
export async function stabilizeUserAvatar(browser: any) {
    await browser.execute(() => {
        const avatarBlock = document.querySelector('[data-testid="user-avatar"]') as HTMLElement;
        const avatarImg = avatarBlock?.querySelector('img') as HTMLImageElement;
        if (avatarImg) {
            // Если изображение еще не загружено, ждем
            if (!avatarImg.complete) {
                avatarImg.onload = () => {
                    stabilizeImage(avatarImg, avatarBlock);
                };
            } else {
                stabilizeImage(avatarImg, avatarBlock);
            }
        }
        function stabilizeImage(img: HTMLImageElement, block: HTMLElement) {
            // Если это GIF, стабилизируем его
            if (img.src && img.src.includes(".gif")) {
                const canvas = document.createElement("canvas");
                const ctx = canvas.getContext("2d");
                if (ctx) {
                    canvas.width = img.naturalWidth || img.offsetWidth || 100;
                    canvas.height = img.naturalHeight || img.offsetHeight || 100;
                    try {
                        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                        img.src = canvas.toDataURL("image/png");
                    } catch (error) {
                        img.src = '/assets/assets/images/static-cat.png';
                    }
                }
            }
            // Делаем аватар круглым
            img.style.borderRadius = '50%';
            img.style.objectFit = 'cover';
            // Не трогаем размеры!
            img.style.width = '';
            img.style.height = '';
            // Добавляем временный padding к контейнеру для стабилизации скриншота
            if (block) {
                block.style.padding = '10px';
                block.style.background = 'white';
            }
        }
    });
    // Ждем загрузки стабилизированного изображения
    await browser.pause(1000);
} 