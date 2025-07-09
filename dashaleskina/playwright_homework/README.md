# Playwright тесты

## Запуск тестов

Все команды нужно выполнять из папки `playwright_homework`:

```sh
cd dashaleskina/playwright_homework
```

### Установка зависимостей

```sh
npm install
```

## Переменные окружения

Перед запуском тестов необходимо создать файл `.env` в папке `playwright_homework`.

В этом файле должны быть указаны данные уже зарегистрированного пользователя. Пример заполнения смотри в файле [`env.example`](./env.example):

```
# .env
USER_EMAIL=example@email.com
USER_PASSWORD=your_password
```


### Запуск всех тестов

```sh
npx playwright test
```

### Запуск всех тестов в UI-режиме

```sh
npx playwright test --ui
```

### Запуск отдельного тестового файла

```sh
npx playwright test путь/до/файла.spec.ts
```

Например:
```sh
npx playwright test tests/shok-login.spec.ts
```

---

