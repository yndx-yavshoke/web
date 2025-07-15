import { Locator, Page } from '@playwright/test';

export class CheckShokWidget {
    private resultFailure: Locator;
    private catImage: Locator;
    private emailField: Locator;
    private triggerButton: Locator;
    private resultSuccess: Locator;

    constructor(private readonly page: Page) {
        this.resultSuccess = page.getByText('Ты уже в ШОКе', { exact: true });
        this.catImage = page.locator('//*[@id="root"]/div/div/div/div/div/div/div/div[2]/div/img');
        this.emailField = page.getByTestId('main-email-input');
        this.triggerButton = page.getByTestId('main-check-button');
        this.resultFailure = page.getByText('Ты еще не в ШОКе', { exact: true });
    }

    async openWidget(): Promise<void> {
        await this.page.goto('/');
    }

    async submitEmail(email: string): Promise<void> {
        await this.emailField.fill(email);
        await this.triggerButton.click();
    }

    get successMessage(): Locator {
        return this.resultSuccess;
    }

    get failureMessage(): Locator {
        return this.resultFailure;
    }

    get gifElement(): Locator {
        return this.catImage;
    }

    get button(): Locator {
        return this.triggerButton;
    }
}
