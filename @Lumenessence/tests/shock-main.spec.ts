import {test} from '../Pages';
import {faker} from '@faker-js/faker';
import {allure} from 'allure-playwright';

test('check registred email', async ({mainPage}) => {
    await allure.step('Open mainPage', async () => {
        await mainPage.open();
    });
    await allure.step('Check registred email', async () =>{
        await mainPage.checkEmail('677@677.ru', true)
    })

});

test('chech unregistred email', async ({ mainPage}) => {
    await allure.step('open mainPage', async ()  =>{
        await mainPage.open();
    });
    await allure.step('check unregistred email', async () =>{
        await mainPage.checkEmail(faker.internet.email(), false);
    })
});

test('ckeck invalid email', async ({mainPage}) =>{
    await allure.step('open mainPage', async () => {
        await mainPage.open();
    });
    await allure.step('check invalid email', async () =>{
        await mainPage.checkEmail(faker.internet.email().replace('@', ''), false);
    });
});
