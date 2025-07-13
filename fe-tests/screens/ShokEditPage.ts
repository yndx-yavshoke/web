import { Page, Locator, expect, test } from "@playwright/test"
import { ENDPOINTS } from "../constants/testData"

export class ShokEditPage {
    public title: Locator;
    public lineName: Locator;
    public inputName: Locator;
    public buttonSaveChanges: Locator;
    public buttonCancle: Locator;
    public lineNotName: Locator;
    public lineErrorLenName: Locator;

    constructor(public readonly page: Page) {
        this.title = this.page.getByText("Edit Profile", { exact : true });
        this.lineName = this.page.getByText("Name", { exact : true });
        this.inputName = this.page.getByTestId("edit-name-input");
        this.buttonSaveChanges = this.page.getByTestId("edit-save-button");
        this.buttonCancle = this.page.getByTestId("edit-cancel-button");
        this.lineNotName = this.page.getByText("Name is required", { exact : true});
        this.lineErrorLenName = this.page.getByText("Name must be less than 50 characters", { exact : true })
    }

    public async open() {
        await this.page.goto(ENDPOINTS.endpointEdit);
    }

    public async newName(name: string){
        await test.step('Переход на страницу /edit', async () => {
            await this.open()
        })
        await test.step('Поле ввода имени отображается', async () => {
            await expect(this.inputName).toBeVisible();
        })
        await test.step('Ввод в поле имени: ' + name, async () => {
            await this.inputName.fill(name);
        })        
        await test.step('Кнопка сохранить изменения отображается', async () => {
            await expect(this.buttonSaveChanges).toBeVisible();
        })
        await test.step('Нажатие на кнопку сохранить изменения', async () => {
            await this.buttonSaveChanges.click();
        })
        await test.step('Кнопка назад отображается', async () => {
            await expect(this.buttonCancle).toBeVisible();
        })
        await test.step('Нажатие на кнопку назад', async () => {
            await this.buttonCancle.click({timeout : 45000});
        })
        
    }
}