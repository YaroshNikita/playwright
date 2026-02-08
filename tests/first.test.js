const {test, expect } = require("playwright/test");

test.use({
  locale: 'sv-SE',
  timezoneId: 'Europe/Stockholm',
});

test.beforeEach(async ({page})=> {
await page.goto('https://app.mars.matteappen.se/',)
})


test('firstTest @smoke', async ({ page }) => { 

await expect(page.getByText('Google')).toBeVisible();
})

test('secondTest @regression', async ({ page }) => {
const selector = '._Typography_1ki3q_1._HeadingNine_1ki3q_50._Text_3jgwx_17._BuenosAires_1ki3q_100';
await page.waitForSelector(selector);
const ssoList = await page.$$eval(selector, els => els.map(el => el.textContent))
expect(ssoList).toStrictEqual(["Google", "Microsoft", "Skolfederation", "Skolon"])
})
