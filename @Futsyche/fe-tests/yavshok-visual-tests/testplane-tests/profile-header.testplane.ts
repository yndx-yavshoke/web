import { remote } from 'webdriverio';
import { ProfileHeader } from '../src/pages/profile.header';
import { VisualHelper } from '../src/helpers/visual.helper';

describe('Шапка профиля', () => {
    let browser: WebdriverIO.Browser;
    let profileHeader: ProfileHeader;
    let visualHelper: VisualHelper;

    beforeEach(async () => {
        browser = await remote({
            capabilities: {
                browserName: 'chrome',
                'goog:chromeOptions': {
                    args: [
                        '--headless',
                        '--disable-gpu',
                        '--window-size=1280,1024',
                        '--no-sandbox'
                    ]
                }
            }
        });
        profileHeader = new ProfileHeader(browser);
        visualHelper = new VisualHelper(browser);
    });

    describe('Стабилизация гифки', () => {
        it('заменяет анимированную гифку на статичное изображение', async () => {
            await profileHeader.open();
            await profileHeader.replaceGifWithStatic('https://example.com/static.jpg');
            await visualHelper.takeScreenshot('profile-header-static');
        });
    });

    describe('Визуальные проверки по блокам', () => {
        beforeEach(async () => {
            await profileHeader.open();
            await profileHeader.replaceGifWithStatic('https://example.com/static.jpg');
        });

        it('проверяет блок аватара', async () => {
            const blocks = await profileHeader.getHeaderBlocks();
            await blocks.avatar.scrollIntoView();
            await visualHelper.takeScreenshot('profile-avatar-block');
        });

        it('проверяет блок информации', async () => {
            const blocks = await profileHeader.getHeaderBlocks();
            await blocks.info.scrollIntoView();
            await visualHelper.takeScreenshot('profile-info-block');
        });

        it('проверяет блок статистики', async () => {
            const blocks = await profileHeader.getHeaderBlocks();
            await blocks.stats.scrollIntoView();
            await visualHelper.takeScreenshot('profile-stats-block');
        });

        it('полная шапка профиля', async () => {
            await visualHelper.takeScreenshot('profile-header-full');
        });
    });

    after(async () => {
        await browser.deleteSession();
    });
});