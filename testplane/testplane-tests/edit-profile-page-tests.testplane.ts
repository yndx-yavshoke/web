import { toEdit } from "./data";
describe("Страница Изменения имени: Поле ввода Enter your name в пустом состоянии", async () => {
    it("Отчищаем поле ввода и сравниваем", async ({browser}) => {
        await toEdit(browser);
        (await browser.$("[ data-testid = 'edit-name-input' ]")).clearValue();
        await browser.assertView("edit-name",'[ data-testid = "edit-name-input" ]');
    })
});

describe("Страница Изменения имени: Кнопка Save Changes", async () => {
    it("Проверяем кнопку Save Changes", async ({browser}) => {
        await toEdit(browser);
        await browser.assertView("edit-save",'[ data-testid = "edit-save-button" ]');
    })
});

describe("Страница Изменения имени: Кнопка Cancel", async () => {
    it("Проверяем кнопку Cancel", async ({browser}) => {
        await toEdit(browser);
        await browser.assertView("edit-cancel",'[ data-testid = "edit-cancel-button" ]');
    })
});