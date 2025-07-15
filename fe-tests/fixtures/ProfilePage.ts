import { Page, Locator } from '@playwright/test'


export class ShockProfilePage {
    // public name: Locator; //см. ниже
    // public status: Locator; //статус не имеет testID, а при обработке локатора через XPath тест падает; реализовала проверку статуса внутри тестов, через текст
    public editNameButton: Locator;
    public logOutButton: Locator;
    public userAvatar: Locator;
//после реализации в приложении фич вместо хардкода -- продумать локаторы для галереи и правой верхней части шапки

    constructor(public readonly page: Page) {
        // this.name = this.page.locator('xpath=/html/body/div[1]/div/div/div[2]/div/div/div/div/div[1]/div[1]/div[1]/div[2]/div[1]');
        // this.status = this.page.locator('xpath=/html/body/div[1]/div/div/div/div/div/div/div/div[1]/div[1]/div[1]/div[2]/div[2]');
        this.editNameButton = this.page.getByTestId('user-edit-profile-button');
        this.logOutButton = this.page.getByTestId('user-logout-button');
        this.userAvatar = this.page.getByTestId('user-avatar');
    }

    public async open() {
        await this.page.goto('/');
    }

}