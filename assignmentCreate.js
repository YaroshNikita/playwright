const{chromium} = require('playwright');

(async() => {
    const browser = await chromium.launch({headless: false, slowMo: 300})
    const context = await browser.newContext()
    const page = await context.newPage()
    
    await page.goto('https://app.mars.magmamath.com')

      
    const input = await page.$$('input')
       await input[0].fill('newpractice@test.com')
       await input[1].fill('123456')

    const passwordVisibilityIcon = await page.$('//button[@class="_EyeIcon_19med_87"]')
    await passwordVisibilityIcon.click()
    const signIn = await page.$('//button[@type="submit"]') //by xpath
    await signIn.click()
 
    await page.waitForSelector('//div[@class="_Content_9qfmy_312 _SubmitBtnContent_tmutz_20"]')
    const newAssignment = await page.$('//div[@class="_Content_9qfmy_312 _SubmitBtnContent_tmutz_20"]').click()  
    //await page.waitForSelector('//div[@class="_Content_9qfmy_312 _SubmitBtnContent_tmutz_20"]').click() // wait for selector is visible

    const bookSelection = await page.getByText('Nikita book')
    await bookSelection.click()

    //await page.screenshot({path:'created.png'})

    const assignmentActionsButton = await page.$('.MuiButtonBase-root')  
    await assignmentActionsButton.click()
    const deleteAssignmentAction = await page.$('.Delete')  
    await deleteAssignmentAction.click()
    const confirmDeletebutton = await page.$("//button[@type='submit']")  
    await confirmDeletebutton.click()
    //await page.waitForTimeout(2000) //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    await page.screenshot({path:'deleted.png', fullPage: true})

    await browser.close()

}) ()