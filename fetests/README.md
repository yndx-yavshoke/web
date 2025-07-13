#Авторизация

Перед основным выполнением тестов нужно выполнить тест авторизации:

npx playwright test tests/login.setup.ts

Запуск тестов c UI

npx playwright test --ui

репорт Allure

allure generate allure-results --clean -o allure-report
allure open allure-report

репорт testplane

npx html-reporter gui --tool playwright
