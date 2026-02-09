const {test, expect} = require("playwright/test");
const {loginLocators} = require("../locators");

test.beforeEach(async ({page})=> {
//login flow
await page.goto('')
await loginLocators.emailInput(page).fill('autostudent');
await loginLocators.passwordInput(page).fill('123456');
await loginLocators.loginButton(page).click();
})

test('SignInOK @smoke', async ({ page }) => { 
await expect(page, 'Sign in failed').toHaveURL(/\/exercises\/available$/);
await expect(page.getByText('auto', { exact: true }), 'Sign in failed').toBeVisible();

})

test.afterEach(async ({ page }, testInfo) => {
    await page.close();
    if (testInfo.status === 'passed') {
        console.log(`✅ ${testInfo.title} PASSED`);
    } else {
        console.log(`❌ ${testInfo.title} FAILED: ${testInfo.error?.message}`);
    }
});
