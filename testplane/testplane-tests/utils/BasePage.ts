export class BasePage {
    protected browser: any;

    constructor(browser: any) {
        this.browser = browser;
    }

    async navigateTo(url: string): Promise<void> {
        await this.browser.url(url);
    }

    async waitForElement(selector: string, timeout: number = 10000): Promise<any> {
        return await this.browser.$(selector).waitForDisplayed({ timeout });
    }

    async getElement(selector: string): Promise<any> {
        return await this.browser.$(selector);
    }

    async getElementByText(text: string): Promise<any> {
        return await this.browser.$(`//*[text()=${text}]`);
    }
    
    async getElementByTestId(testid: string): Promise<any> {
        return await this.browser.getByTestId(testid);
    }
    
    async assertViewElement(viewName: string, selector: string | any): Promise<void> {
        await this.browser.assertView(viewName, selector);
    }

    async assertViewPage(viewName: string): Promise<void> {
        await this.browser.assertView(viewName, "body");
    }

    async focusElement(selector: string): Promise<void> {
        const element = await this.getElement(selector);
        await element.click();
    }

    async typeInElement(selector: string, text: string): Promise<void> {
        const element = await this.getElement(selector);
        await element.setValue(text);
    }

    async clickElement(selector: string): Promise<void> {
        const element = await this.getElement(selector);
        await element.click();
    }

    async hoverElement(selector: string): Promise<void> {
        const element = await this.getElement(selector);
        await element.hover();
    }

    async stabilizeGif(selector: string, delay: number = 1000): Promise<void> {
        const element = await this.getElement(selector);
        if (await element.isDisplayed()) {
            await this.browser.execute((el: HTMLElement) => {
                // Добавляем инлайн-стили только для этого элемента, чтобы остановить анимации и переходы
                el.style.setProperty('animation-duration', '0s', 'important');
                el.style.setProperty('animation-delay', '0s', 'important');
                el.style.setProperty('transition-duration', '0s', 'important');
                el.style.setProperty('transition-delay', '0s', 'important');
            }, element);
        }
    }

    async hideAnimations(): Promise<void> {
        await this.browser.execute(() => {
            const style = document.createElement('style');
            style.innerHTML = `
                *, *::before, *::after {
                    animation-duration: 0s !important;
                    animation-delay: 0s !important;
                    transition-duration: 0s !important;
                    transition-delay: 0s !important;
                }
            `;
            document.head.appendChild(style);
        });
    }
}
