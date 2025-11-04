const {test, expect } = require("playwright/test");

test.use({
  locale: 'sv-SE',
  timezoneId: 'Europe/Stockholm',
});

test.beforeEach(async ({page})=> {
await page.goto('https://app.mars.matteappen.se/',)
})


test('firstTest', async ({ page }) => { 
const google = await page.$$eval('._Typography_1ki3q_1._HeadingNine_1ki3q_50._Text_nrl0w_13._BuenosAires_1ki3q_100', el => el[0].textContent)
expect(google).toBe('Google')
})

test('secondTest', async ({ page }) => {
const ssoList = await page.$$eval('._Typography_1ki3q_1._HeadingNine_1ki3q_50._Text_nrl0w_13._BuenosAires_1ki3q_100', els => els.map(el => el.textContent))
expect(ssoList).toStrictEqual(["Google", "Microsoft", "Skolfederation", "Skolon", "Magma QR-kod"])
})
