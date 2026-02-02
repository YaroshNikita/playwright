const {test, expect } = require("playwright/test");
const{chromium} = require('playwright');

(async() => {
    const browser = await chromium.launch({headless: false, slowMo: 300})
    const context = await browser.newContext()
    const page = await context.newPage()
    
    await page.goto('https://app.mars.magmamath.com')

      
    const inputEmail = page.locator('input').nth(0);
    await inputEmail.fill('newpractice@test.com');
    const inputPassword = page.locator('input').nth(1);
    await inputPassword.fill('123456');

    await page.locator('button._EyeIcon_19med_87').click();
    await page.locator('button[type="submit"]').click();


    const newAssignmentButton = page.getByTestId('new-assignment-btn')
    await newAssignmentButton.click();

    const testBookSelect = await page.getByText('Nikita book', { exact: true }).click();
    const chapterSelect = await page.getByText('1. test', { exact: true }).click();
    const sectionSelect = await page.getByText('1. Super assignment', { exact: true }).click(); 
    const selectAllProblemsCheckbox = page.getByRole('checkbox', { name: 'Super assignment' }).click();

    const assignmentNameInput = await page.getByTestId('assignment-name-input');
    await expect(assignmentNameInput).toHaveValue('Super assignment');

    const classCheckboxSelect = await page.getByRole('checkbox', { name: 'auto' }).check();

    const createAssignmentSubmitBtn = await page.getByTestId('create-assignment-submit-btn');
    await expect(createAssignmentSubmitBtn).toBeEnabled();
    await createAssignmentSubmitBtn.click();


    await expect(page.getByTestId('Super assignment-assignment')).toBeVisible();

    //delete flow
    await page.getByTestId('Super assignment-assignment-options-btn').nth(0).click();
    await page.getByTestId('Super assignment-delete-exercise-btn').click();
    const asignmentDeleteConfirmationButton = await page.getByTestId('confirm-delete-exercise-btn');
    await asignmentDeleteConfirmationButton.click();
    await expect(page.getByTestId('Super assignment-assignment')).not.toBeVisible();
    //await page.screenshot({path:'deleted.png', fullPage: true})

    await browser.close()

}) ()