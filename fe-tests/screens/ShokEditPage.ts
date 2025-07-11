import { Page, Locator, expect } from "@playwright/test"
import { endpoints } from "../constants/testData"

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
        await this.page.goto(endpoints.endpointEdit);
    }

    public async newName(name: string){
        await this.open()

        await expect(this.inputName).toBeVisible();
        await this.inputName.fill(name);
        await expect(this.buttonSaveChanges).toBeVisible();
        await this.buttonSaveChanges.click();
        await expect(this.buttonCancle).toBeVisible();
        await this.buttonCancle.click();

    }
}