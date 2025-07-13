# UI Tests

Automated tests for https://yavshok.ru/

## Установка

### 1. Настройка переменных окружения

Создайте файл `.env` в корневой директории проекта:

```bash
cp .env.example .env
```

Укажите в файле ваши данные, а так же базовый URL для тестирования.

### 2. Для запуска тестов:

```bash
npx playwright test
```

### 3. Для запуска тестов в браузере:

```bash
npx playwright test --ui
```
### 4. Для генерации allure отчетов:

```bash
npx allure generate ./allure-results --clean -o ./allure-report
```

### 5. Для просмотра отчетов allure в браузере:

```bash
npx allure open ./allure-report
```

### 6. Для просмотра отчетов playwright в браузере:

```bash
npx playwright show-report
```

### 7. Для просмотра отчетов testplane в браузере:

```bash
npx serve html-report
```