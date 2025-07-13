import { expect } from "@playwright/test";
import { test } from "../fixtures"

test("Страница Проверки на ШОК: проверка, что кнопка Я в  шоке? находится в неактивном состоянии до ввода email", async ({ mainPage}) => {
  await test.step("Открыть страницу https://yavshok.ru", async () => {
    await mainPage.open();
    await test.step("Отображается страница https://yavshok.ru", async () => {
        await expect(mainPage.page).toHaveURL("/");
    });
    await test.step("Поле ввода Введите email не заполнено", async () => {
      await expect(mainPage.input).toBeEmpty();
    });
    await test.step("Кнопка Я в шоке? находится в неактивном состоянии", async () => {
      await expect(mainPage.checkButton).toHaveAttribute("aria-disabled", "true");
    });
  })
})


test("Страница Проверки на ШОК: проверка, что кнопка Я в  шоке? находится в активном состоянии при вводе email", async ({ mainPage}) => {
  await test.step("Открыть страницу https://yavshok.ru", async () => {
    await mainPage.open();
    await test.step("Отображается страница https://yavshok.ru", async () => {
      await expect(mainPage.page).toHaveURL("/");
    });
    await test.step("Поле ввода Введите email заполнено", async () => {
      mainPage.input.fill("mail");
      await expect(mainPage.input).not.toBeEmpty();
    });
    await test.step("Кнопка Я в шоке? находится в активном состоянии", async () => {
      await expect(mainPage.checkButton).not.toHaveAttribute("aria-disabled");
    });
  })
})

test("Страница Проверки на ШОК: появляется надпись Ты ещё не в ШОКе при проверке с несуществующим пользователем", async ({ mainPage }) => {
  await test.step("Открыть страницу https://yavshok.ru", async () => {
    await mainPage.open();
    await test.step("Отображается страница https://yavshok.ru", async () => {
      await expect(mainPage.page).toHaveURL("/");
    });
    await test.step("Заполнено поле Email и нажимается кнопка Я в ШОКе", async () => {
      mainPage.checkEmail("notAmail");
    });
    await test.step("Появилась ли надпись Ты ещё не в ШОКе", async () => {
      await expect(mainPage.page.getByText("Ты еще не в ШОКе")).toBeVisible();
    })
  })
})


test("Страница Проверки на ШОК: появляется надпись Ты уже в ШОКе при проверке с существующим пользователем", async ({ mainPage }) => {
  await test.step("Открыть страницу https://yavshok.ru", async () => {
    await mainPage.open();
    await test.step("Отображается страница https://yavshok.ru", async () => {
      await expect(mainPage.page).toHaveURL("/");
    });
    await test.step("Заполнено поле Email и нажимается кнопка Я в ШОКе", async () => {
      mainPage.checkEmail("test@mail.com");
    });
    await test.step("Появилась ли надпись Ты уже в ШОКе", async () => {
      await expect(mainPage.page.getByText("Ты уже в ШОКе")).toBeVisible();
    })
  })
})