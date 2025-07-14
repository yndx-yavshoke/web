import { GIF_STABILIZATION, DELAYS } from '../constants';

/**
 * Утилиты для стабилизации GIF анимаций в скриншотных тестах
 */
export class GifStabilizer {
    
    /**
     * Стабилизирует GIF анимацию, скрывая её перед скриншотом
     */
    static async stabilizeGif(browser: any, selector: string = GIF_STABILIZATION.AVATAR_SELECTOR) {
        try {
            // Ждем появления GIF
            await browser.pause(DELAYS.GIF_STABILIZATION);
            
            // Скрываем GIF элементы
            await browser.executeScript(`
                const gifElements = document.querySelectorAll('${selector}');
                gifElements.forEach(el => {
                    el.style.visibility = 'hidden';
                    el.style.opacity = '0';
                });
            `);
            
            // Ждем стабилизации
            await browser.pause(DELAYS.ANIMATION);
            
        } catch (error) {
            console.log('GIF stabilization failed:', error);
        }
    }
    
    /**
     * Восстанавливает видимость GIF элементов
     */
    static async restoreGif(browser: any, selector: string = GIF_STABILIZATION.AVATAR_SELECTOR) {
        try {
            await browser.executeScript(`
                const gifElements = document.querySelectorAll('${selector}');
                gifElements.forEach(el => {
                    el.style.visibility = 'visible';
                    el.style.opacity = '1';
                });
            `);
        } catch (error) {
            console.log('GIF restoration failed:', error);
        }
    }
    
    /**
     * Делает скриншот с исключением GIF элементов
     */
    static async assertViewWithoutGif(browser: any, name: string, selector: string = 'body') {
        await this.stabilizeGif(browser);
        await browser.assertView(name, selector);
        await this.restoreGif(browser);
    }
    
    /**
     * Делает скриншот только определенной секции без GIF
     */
    static async assertViewSectionWithoutGif(browser: any, name: string, sectionSelector: string) {
        await this.stabilizeGif(browser);
        await browser.assertView(name, sectionSelector);
        await this.restoreGif(browser);
    }
} 