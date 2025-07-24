import Testplane from 'testplane';
import type { Browser } from '@testplane/webdriverio';

export class VisualHelper {
    constructor(protected browser: WebdriverIO.Browser) {}

    async takeScreenshot(name: string, options: {ignoreElements?: string[]} = {}): Promise<void> {
        await this.browser.assertView(
            name,
            'body',
            {
                ignoreElements: options.ignoreElements || [],
                tolerance: 2.3,
                antialiasingTolerance: 4,
                allowViewportOverflow: true
            }
        );
    }

    async stabilizeGif(selector: string, replaceWith: string): Promise<void> {
        await this.browser.execute((selector, replaceWith) => {
            const element = document.querySelector(selector) as HTMLImageElement;
            if (element) {
                element.src = replaceWith;
            }
        }, selector, replaceWith);
    }
}