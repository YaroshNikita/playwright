const {test, expect} = require("playwright/test");

test.beforeEach(async ({page})=> {
await page.goto('')


})


test('firstTest @smoke', async ({ page }) => { 
const googleHeading = page.getByText('Google1', { exact: true });
await expect(googleHeading, 'Google not found on the landing page').toBeVisible();
})

test('secondTest @regression', async ({ page }) => {
const selector = '._Typography_1ki3q_1._HeadingNine_1ki3q_50._Text_3jgwx_17._BuenosAires_1ki3q_100';
await page.waitForSelector(selector);
const ssoList = await page.$$eval(selector, els => els.map(el => el.textContent))
expect(ssoList).toStrictEqual(["Google", "Microsoft", "Skolfederation", "Skolon"])
})


test.afterEach(async ({}, testInfo) => {
  if (testInfo.status === 'passed') {
    console.log(`✅ ${testInfo.title} PASSED`);
  } else {
    console.log(`❌ ${testInfo.title} FAILED: ${testInfo.error?.message}`);
  }
});
