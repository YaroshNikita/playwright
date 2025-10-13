    //const signIn = await page.$('.form-button') by class, . for class, # for id
    //const signIn = await page.$('button') by css-selector
    //const signIn = await page.$('//button[@class = "form-button signin"]') //by xpath
    //const signIn = await page.$('text="Log in"') //by text
    //const signIn = await page.$('"Log in"') //by text
    //const signIn = await page.$("form >> "Log in'"") //by text inside the element
    //const bookSelection = await page.getByText('Nikita book') by text

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
    await page.waitForTimeout(4500) //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

    const newAssignment = await page.$('//div[@class="_Content_9qfmy_312 _SubmitBtnContent_tmutz_20"]')  
    await newAssignment.click()
    await page.waitForTimeout(1500) //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    const bookSelection = await page.getByText('Nikita book').click();
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