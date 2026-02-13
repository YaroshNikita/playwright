const {expect} = require("playwright/test");
const {chromium} = require('playwright');
const {loginLocators, assignmentLocators} = require('./locators');

(async() => {
    const browser = await chromium.launch({headless: false, slowMo: 300})
    const context = await browser.newContext()
    const page = await context.newPage()
    
    await page.goto('https://app.mars.magmamath.com')

    // Login
    await loginLocators.emailInput(page).fill('auto@test.com');
    await loginLocators.passwordInput(page).fill('123456');
    await loginLocators.loginButton(page).click();

    // Create assignment
    await assignmentLocators.newAssignmentButton(page).click();
    await assignmentLocators.BookOption(page).click();
    await assignmentLocators.chapterOption(page).click();
    await assignmentLocators.sectionOption(page).click();
    await assignmentLocators.selectAllProblemsCheckbox(page).click();

    await expect(assignmentLocators.assignmentNameInput(page)).toHaveValue('auto problems');

    await assignmentLocators.classCheckbox(page).check();

    await expect(assignmentLocators.createAssignmentSubmitButton(page)).toBeEnabled();
    await assignmentLocators.createAssignmentSubmitButton(page).click();

    await expect(assignmentLocators.assignmentCard(page).first()).toBeVisible();

    await browser.close()

}) ()