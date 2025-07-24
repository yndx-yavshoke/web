import { remote } from 'webdriverio';
import { ProfileEditPage } from '../src/pages/profile.edit'; 
import { VisualHelper } from '../src/helpers/visual.helper';

describe('Страница редактирования профиля', () => {
    let browser: WebdriverIO.Browser;
    let profileEdit: ProfileEditPage;
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
        profileEdit = new ProfileEditPage(browser);
        visualHelper = new VisualHelper(browser);
    });

    describe('Визуальные проверки', () => {
        beforeEach(async () => {
            await profileEdit.open();
        });

        it('дефолтное состояние формы', async () => {
            await visualHelper.takeScreenshot('profile-edit-default');
        });

        it('состояние с заполненными полями', async () => {
            await profileEdit.fillForm({
                name: 'Новое имя',
                bio: 'Новое био'
            });
            await visualHelper.takeScreenshot('profile-edit-filled');
        });

        it('состояние после сохранения', async () => {
            await profileEdit.fillForm({
                name: 'Новое имя'
            });
            await profileEdit.submit();
            await visualHelper.takeScreenshot('profile-edit-after-save');
        });
    });

    afterEach(async () => {
        await browser.deleteSession();
    });
});