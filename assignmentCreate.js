const{chromium} = require('playwright');

(async() => {
    const browser = await chromium.launch({headless: false, slowMo: 300})
    const context = await browser.newContext()

    const page = await context.newPage()
    await page.goto('https://app.mars.magmamath.com')
    
    //const signIn = await page.$('.form-button') by class
    //const signIn = await page.$('button') by css-selector
    //const signIn = await page.$('//button[@class = "form-button signin"]') //by xpath
    //const signIn = await page.$('text="Log in"') //by text
      
    const input = await page.$$('input')
       await input[0].fill('nikita@test.com')
       await input[1].fill('123456')

     //await page.fill('input', 'vovochka_1999')  


    const passwordVisibilityIcon = await page.$('//div[@class="show-password-icon"]')
    await passwordVisibilityIcon.click()

    const signIn = await page.$('button >> "Log in"') //by xpath
    await signIn.click()
    await page.waitForTimeout(4500) //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

    const newAssignment = await page.$('button[class="ui-btn ui-btn-primary ui-btn-medium ui-btn-gradient"]')  
    await newAssignment.click()
    await page.waitForTimeout(1500) //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    const bookSelection = await page.$("//div[text()='Fannys american test b00k']")  
    await bookSelection.click()
    const chapterSelection = await page.$("//div[text()='Bug protocol']")  
    await chapterSelection.click()  
    const subChapterSelection = await page.$("//div[text()='Standard test']")  
    await subChapterSelection.click()  
    const classSelection = await page.$("//span[text()='NIKITA CLASS1']")  
    await classSelection.click()  
    const assignmentNameSet = await page.$('.ExerciseNameInput_Input__oB3x0')  
    await assignmentNameSet.fill('Automated Assignment') 
    const problemsSelection = await page.$("#easy-check")  
    await problemsSelection.click()  
    await page.waitForTimeout(1000) //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    const createAssignmentButton = await page.$('.PageHeader_NextButtonContainer__gt54t')  
    await createAssignmentButton.click() 
    await page.waitForTimeout(2000)
    await page.screenshot({path:'created.png'})

    const assignmentActionsButton = await page.$('.MuiButtonBase-root')  
    await assignmentActionsButton.click()
    const deleteAssignmentAction = await page.$('.Delete')  
    await deleteAssignmentAction.click()
    const confirmDeletebutton = await page.$("//button[@type='submit']")  
    await confirmDeletebutton.click()
    await page.waitForTimeout(2000) //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    await page.screenshot({path:'deleted.png'})
    
    await browser.close()
}) ()