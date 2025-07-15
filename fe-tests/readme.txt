Тесты для учебного проекта yavshok

Описание: Для тестов web: https://yavshok.ru использовался язык TypeScript (TS) с фреймворком Playwright (https://playwright.dev/).

Как осуществить установку Playwright: 

1-  Установлена нода хотя бы 20 версии:
    (Выбираем там ноду 22
    nvm install 22
    nvm use 22
    Проверить корректность можно выполнив в консоли:
    node -v
    npm -v)

2-  Установлен и настроен npm.

3-  Осуществить клонирование необходимого проекта web.

4-  Создать папку для тестов данного проекта:
    (Создаём папку в своей директории в проекте с любым удобным названием, например, fe-tests и переходим в неё
    mkdir fe-tests
    cd fe-tests)

5-  нужно проверить технические требования:

6-  Устанавливаем туда npm-пакет с Плейрайтом
    (npm init playwright@latest)

7-  Проверяем, что всё работает
    (npx playwright test)

Запуск тестов:

- Для запуска тестов в ui режиме playwright:

npx playwright test --ui 

- Для запуска тестов и формирования отчетов на Allure:

npx playwright test --reporter=allure-playwright
npx allure generate ./allure-results --clean
npx allure open       

- Для запуска тестов и формирования отчетов на Testplane:

npx playwright test
npx serve html-report
