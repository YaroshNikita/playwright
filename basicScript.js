const{chromium} = require('playwright');

(async() => {
    const browser = await chromium.launch({headless:false})
    const context = await browser.newContext()
    const page = await context.newPage()
    await page.goto('https://app.mars.magmamath.com')
    //const signIn = await page.$('.form-button') by class
    //const signIn = await page.$('button') by css-selector
    //const signIn = await page.$('//button[@class = "form-button signin"]') //by xpath
    //const signIn = await page.$('text="Log in"') //by text
      
    const input = await page.$$('input')
       await input[0].fill('vovochka_1999')
       await input[1].fill('123456')

    const passwordVisibilityIcon = await page.$('//div[@class="show-password-icon"]')
    passwordVisibilityIcon.click()

    const signIn = await page.$('button >> "Log in"') //by xpath
    signIn.click()
    await page.screenshot({path:'todo.png'})
    await browser.close()
}) ()