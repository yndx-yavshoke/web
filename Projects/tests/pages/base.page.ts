import { Page,Locator}  from "@playwright/test";
import { strict } from "assert";

export class BasePage{
    constructor(public readonly page:Page){}
        async open(path:string){
        await this.page.goto(path)
    }
}