describe('Sign‑In test Default', () => {
    it('Main snapshot', async ({ browser }) => {
        await browser.url('/login');
        await browser.pause(1200);
        await browser.assertView('login‑blank', 'body');
    });
});
