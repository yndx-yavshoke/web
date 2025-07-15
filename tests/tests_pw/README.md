# Autotests for Yavshoke (Playwright)

## Проект содержит автоматизированные UI-тесты, написанные с использованием:
- Playwright 
- TypeScript
- Allure
- Faker

## ⚠️ Тесты на успешную регистрацию настоящего пользователя были намеренно пропущены, чтобы избежать загрязнения продакшн-базы данных

# Запуск

## 1. Установить зависимости:
```
npm install
```
## 2. Скопируйте файл `.env.example` в `.env` и заполните нужные значения (зарегистрированный ваш пользователь):
```
cp .env.example .env
```

## Запуск всех тестов в консоли:
```
npx playwright test
```
## Запуск всех тестов в UI:
```
npx playwright test --ui
```
## Запуск с Playwright Test Report:
### Предварительно запустите все тесты:
```
npx playwright test
```
### Открываем отчет в браузере:
```
npx playwright show-report
```
## Запуск с Allure:
### Предварительно запустите все тесты:
```
npx playwright test
```
### Генерируем Allure отчет:
```
npm run allure:generate
```
### Открываем Allure отчет в браузере:
```
npm run allure:open
```