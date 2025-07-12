# Тесты для проекта Yavshok

## Описание

В этом репозитории находятся автоматизированные тесты для проекта [yavshok.ru](https://yavshok.ru). Тесты написаны с использованием [Playwright](https://playwright.dev/).

## Установка

- Клонируйте репозиторий:

   git clone <URL_репозитория>
   cd <папка_с_тестами>


##Авторизация

Для запуска тестов, требующих авторизацию, сессия сохраняется в файле auth/cookies.json. Перед запуском основных тестов нужно выполнить тест авторизации:

npx playwright test tests/auth/login.setup.ts

## Запуск тестов

- Для запуска всех тестов:

npx playwright test

- Для запуска конкретного теста:

npx playwright test path/to/test-file.spec.ts

## Отчёты

- Для генерации отчёта Allure после запуска тестов:

allure generate allure-results --clean -o allure-report
allure open allure-report


- Для генерации отчёта Testplane после запуска тестов:

npx html-reporter gui --tool playwright



