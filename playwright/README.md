# Playwright E2E Тесты для сервиса ВШОКЕ 

Работу выполнил Точинов Данил

TG: [@danya639](https://t.me/danya639)

## Стек

В проекте используются:

- **[Playwright](https://playwright.dev/)** — основной инструмент для E2E и UI тестирования.
- **[Allure](https://docs.qameta.io/allure/)** — генерация и просмотр красивых отчетов тестирования.
- **[Faker](https://fakerjs.dev/)** — генерация фейковых (тестовых) данных.
- **[dotenv](https://github.com/motdotla/dotenv)** — работа с переменными окружения из .env файлов.
- **[zod](https://github.com/colinhacks/zod)** — валидация и описание схем объектов (например, для API-ответов).

## Настройка среды (.env)

Для тестов используются переменные окружения, которые хранятся в файле .env в корне проекта.  
**Пример структуры .env:**
```
ALLURE_RESULTS_FOLDER="allure-results"

# Креденшлы для тестовых пользователей (примеры)
EMAIL='example@example.com'
PASSWORD='password'

# Другие переменные по необходимости
```
## Установка
Установите зависимостей:
```console
npm install
```

## Запуск тестов

Запустить все тесты:
```console
npx playwright test
```

Запустить все тесты в UI режиме:
```console
npx playwright test --ui
```

## Отчёт

**Allure:**

Сначала запустить все тесты, а после сгенерировать отчёт:
```console
npx playwright test;
allure serve allure-results;
```

или:
```console
npm install -g allure-commandline;
npx allure serve allure-results;
```


