# Web Tests with Playwright

Автоматизированные тесты для веб-приложений, написанные с использованием Playwright и TypeScript.


## Структура проекта

```
web_tests/
├── tests/
│   ├── pages/              # Page Object Model
│   │   ├── base-page.ts    # Базовый класс для всех страниц
│   │   ├── home-page.ts    # Главная страница
│   │   ├── login-page.ts   # Страница авторизации
│   │   ├── registration-page.ts # Страница регистрации
│   │   └── profile-page.ts # Страница профиля
│   ├── types/              # TypeScript типы
│   │   └── index.ts        # Интерфейсы и типы
│   ├── utils/              # Утилиты и хелперы
│   │   ├── data-env.ts     # Конфигурация окружения
│   │   ├── data-generator.ts # Генерация тестовых данных
│   │   ├── data-user.ts    # Данные пользователей
│   │   └── test-helpers.ts # Вспомогательные методы
│   ├── fixtures.ts         # Playwright fixtures
│   ├── home.spec.ts        # Тесты главной страницы
│   ├── auth.spec.ts        # Тесты авторизации
│   └── registration.spec.ts # Тесты регистрации
├── playwright.config.ts    # Конфигурация Playwright
├── tsconfig.json          # Конфигурация TypeScript
└── package.json
```

## Установка и настройка

### 1. Установка зависимостей
```bash
npm install
```

### 2. Установка браузеров Playwright
```bash
npm run test:install
```


## Запуск тестов

### Основные команды

```bash
# Запуск всех тестов
npm test

# Запуск тестов с видимым браузером
npm run test:headed

# Запуск тестов в режиме отладки
npm run test:debug

# Запуск тестов с UI интерфейсом
npm run test:ui

# Просмотр отчетов
npm run test:report
```

### Запуск тестов для конкретных браузеров

```bash
# Chrome/Chromium
npm run test:chromium

# Firefox
npm run test:firefox

# Safari/WebKit
npm run test:webkit
```

### Генерация кода

```bash
# Автоматическая генерация тестового кода
npm run test:codegen
```

## Написание тестов

### Структура теста

```typescript
import { test, expect } from './fixtures';

test.describe('Test Suite Name', () => {
  test('test name', async ({ homePage }) => {
    await homePage.open();
    await homePage.expectTitleVisible();
  });
});
```

### Page Object Model

```typescript
import { HomePage } from './pages/home-page';

test('should navigate to home page', async ({ homePage }) => {
  await homePage.open();
  await homePage.expectTitleVisible();
});
```

### Использование утилит

```typescript
import { TestHelpers } from './utils/test-helpers';

test('should use helpers', async ({ page }) => {
  const helpers = new TestHelpers(page);
  await helpers.waitForPageLoad();
  await helpers.takeScreenshot('test-screenshot');
});
```

## Конфигурация

### Playwright Config

Основные настройки в `playwright.config.ts`:

- **baseURL**: Базовый URL для тестов
- **timeout**: Таймауты для операций
- **retries**: Количество повторных попыток
- **screenshot**: Настройки скриншотов
- **video**: Настройки записи видео

### TypeScript Config

Настройки в `tsconfig.json`:

- Строгая типизация
- Поддержка ES2020
- Настройки модулей


## Отладка

### Режим отладки
```bash
npm run test:debug
```

### UI режим
```bash
npm run test:ui
```

## Отчеты

После выполнения тестов доступны отчеты:

- **HTML отчет**: `playwright-report/index.html`
- **JSON отчет**: `test-results/results.json`
- **JUnit отчет**: `test-results/results.xml`