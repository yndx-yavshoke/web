# Playwright Test Project

Этот проект содержит примеры тестов с использованием Playwright.

## Установка

```bash
npm install
npx playwright install
```

## Запуск тестов

### Запуск всех тестов
```bash
npm test
```

### Запуск тестов в режиме с браузером
```bash
npm run test:headed
```

### Запуск тестов в UI режиме
```bash
npm run test:ui
```

### Запуск тестов в режиме отладки
```bash
npm run test:debug
```

### Просмотр отчета
```bash
npm run report
```

## Структура проекта

- `tests/` - папка с тестами
  - `example.spec.ts` - базовые примеры тестов
  - `google-search.spec.ts` - тест поиска в Google
  - `form-test.spec.ts` - тест работы с формами
- `playwright.config.ts` - конфигурация Playwright
- `tsconfig.json` - конфигурация TypeScript

## Примеры тестов

1. **example.spec.ts** - проверка заголовка и навигации на сайте Playwright
2. **google-search.spec.ts** - автоматизация поиска в Google
3. **form-test.spec.ts** - работа с формами на демо-сайте

## Поддерживаемые браузеры

- Chromium
- Firefox
- WebKit (Safari) 