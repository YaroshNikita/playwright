const{chromium} = require('playwright');
const expect = require('expect').expect;

(async() => {
    const browser = await chromium.launch({headless: false, slowMo: 300})
    const context = await browser.newContext()

    const page = await context.newPage()
    await page.goto('https://app.mars.matteappen.se/')

//#1
const sso = await page.$$('._Typography_1ki3q_1._HeadingNine_1ki3q_50._Text_nrl0w_13._BuenosAires_1ki3q_100')
const skolon = await sso[3].evaluate(el => el.textContent)
console.log(skolon);
expect(skolon).toBe('Skolon')
   
//#2
const google = await page.$$eval('._Typography_1ki3q_1._HeadingNine_1ki3q_50._Text_nrl0w_13._BuenosAires_1ki3q_100', el => el[0].textContent)
console.log(google);
expect(google).toBe('Google')

//#3
const ssoList = await page.$$eval('._Typography_1ki3q_1._HeadingNine_1ki3q_50._Text_nrl0w_13._BuenosAires_1ki3q_100', els => els.map(el => el.textContent))
console.log(ssoList);
expect(ssoList).toStrictEqual(["Google", "Microsoft", "Skolfederation", "Skolon", "Magma QR-kod"])

//#4
const ssoCount = await page.$$eval('._Typography_1ki3q_1._HeadingNine_1ki3q_50._Text_nrl0w_13._BuenosAires_1ki3q_100', els => els.length)
console.log(ssoCount);
expect(ssoCount).toEqual(5)
//els => els[0].textContent	Возвращает строку
//els => els.map(el => el.textContent)	Возвращает массив

await browser.close()
}) ()