const {test, expect} = require("playwright/test");
const {loginLocators, assignmentLocators, answerLocators} = require("../locators");

test.describe('@smoke tests', () => {
    test.beforeEach(async ({page})=> {
        //login flow
        await page.goto('')
        await loginLocators.emailInput(page).fill('autostudent');
        await loginLocators.passwordInput(page).fill('123456');
        await loginLocators.loginButton(page).click();
    })

    test('LoginOK @smoke', async ({ page }) => { 
        await expect(page, 'Sign in failed').toHaveURL(/\/exercises\/available$/);
        await expect(page.getByText('auto', { exact: true }), 'Sign in failed').toBeVisible();
    })

    test('AssignmentLoaded @smoke', async ({ page }) => { 
        await assignmentLocators.exerciseCard(page).first().click();
        await expect(page.getByText('auto problems', { exact: true }), 'Assignment not loaded').toBeVisible();
    })

        test('SingleChoiceCheck @smoke', async ({ page }) => { 
        await assignmentLocators.exerciseCard(page).first().click(); //clicking on the first exercise card
        await page.waitForLoadState('networkidle'); //waiting for the exercise content to load
        await page.keyboard.press('1'); //FD turn-off
        await answerLocators.singleChoiceOption(page).nth(1).click(); //choice selecting
        await expect(answerLocators.submitAnswerButton(page)).toBeEnabled(); //submit button enabled check
        await answerLocators.submitAnswerButton(page).click(); //submit answer
        await expect(page.getByText('Correct!', { exact: true })).toBeVisible(); //asserting correct answer feedback
        await expect (await page.locator(':text("NEXT")')).toBeVisible(); //asserting visibility of next button
    })

/*         test('MultipleChoiceCheck @smoke', async ({ page }) => { 
        await assignmentLocators.exerciseCard(page).first().click();
    })

        test('OrderedChoiceCheck @smoke', async ({ page }) => { 
        await assignmentLocators.exerciseCard(page).first().click();
    }) */

    test.afterEach(async ({ page }, testInfo) => {
        await page.close();
        if (testInfo.status === 'passed') {
            console.log(`✅ ${testInfo.title} PASSED`);
        } else {
            console.log(`❌ ${testInfo.title} FAILED: ${testInfo.error?.message}`);
        }
    });
});
