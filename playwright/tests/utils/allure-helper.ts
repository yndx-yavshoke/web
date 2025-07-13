import { allure } from 'allure-playwright';

/**
 * Утилита для работы с Allure отчетами
 */
export class AllureHelper {
    /**
     * Добавление описания к тесту
     */
    static addDescription(description: string): void {
        allure.description(description);
    }

    /**
     * Добавление эпика
     */
    static addEpic(epic: string): void {
        allure.epic(epic);
    }

    /**
     * Добавление фичи
     */
    static addFeature(feature: string): void {
        allure.feature(feature);
    }

    /**
     * Добавление стори
     */
    static addStory(story: string): void {
        allure.story(story);
    }

    /**
     * Добавление северити
     */
    static addSeverity(severity: 'blocker' | 'critical' | 'normal' | 'minor' | 'trivial'): void {
        allure.severity(severity);
    }

    /**
     * Добавление тега
     */
    static addTag(tag: string): void {
        allure.tag(tag);
    }

    /**
     * Добавление параметра
     */
    static addParameter(name: string, value: string): void {
        allure.parameter(name, value);
    }

    /**
     * Добавление шага
     */
    static async addStep(name: string, action: () => Promise<void>): Promise<void> {
        await allure.step(name, action);
    }

    /**
     * Добавление вложения (attachment)
     */
    static addAttachment(name: string, content: string | Buffer, type: string = 'text/plain'): void {
        allure.attachment(name, content, type);
    }

    /**
     * Добавление ссылки
     */
    static addLink(name: string, url: string): void {
        allure.link(url, name);
    }

    /**
     * Добавление тестового ID
     */
    static addTestId(testId: string): void {
        allure.label('testId', testId);
    }

    /**
     * Добавление метки
     */
    static addLabel(name: string, value: string): void {
        allure.label(name, value);
    }

    /**
     * Настройка метаданных для теста авторизации
     */
    static setupAuthTest(): void {
        this.addEpic('Авторизация');
        this.addFeature('Вход в систему');
        this.addSeverity('critical');
        this.addTag('auth');
        this.addTag('smoke');
    }

    /**
     * Настройка метаданных для теста регистрации
     */
    static setupRegistrationTest(): void {
        this.addEpic('Регистрация');
        this.addFeature('Создание аккаунта');
        this.addSeverity('critical');
        this.addTag('registration');
        this.addTag('smoke');
    }

    /**
     * Настройка метаданных для теста главной страницы
     */
    static setupHomeTest(): void {
        this.addEpic('Главная страница');
        this.addFeature('Проверка email');
        this.addSeverity('normal');
        this.addTag('home');
        this.addTag('functional');
    }
} 