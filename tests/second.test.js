const {test, expect} = require("playwright/test");
const {loginLocators, assignmentLocators, answerLocators} = require("../locators");
const { drawStroke, getDrawingCoordinates } = require('./helpers');

test.describe('@smoke tests', () => {
    test.beforeEach(async ({page}) => {
        await page.goto('http://localhost:3001/');
        await loginLocators.emailInput(page).fill('autostudent');
        await loginLocators.passwordInput(page).fill('123456');
        await loginLocators.loginButton(page).click();
    });

/*     test('LoginCheck @smoke @critical', async ({ page }) => {
        await expect(page).toHaveURL(/\/exercises\/available$/);
        await expect(page.getByText('auto', { exact: true })).toBeVisible();
        console.log('✅ Successful login');
    }); */

   
    test('Types of problems submission @smoke', async ({ page }) => {
    // Open assignment
        await assignmentLocators.exerciseCard(page).first().click();
        await expect(page.getByText('auto problems', { exact: true })).toBeVisible();
        console.log('✅ Assignment loaded');
        
        // Single choice
        await page.waitForLoadState('networkidle');
        await page.keyboard.press('1')
        await answerLocators.choiceButton(page, 1).click();
        await answerLocators.submitChoiceButton(page).click();
        await expect(page.getByText('Correct!', { exact: true })).toBeVisible();
        console.log('✅ Single choice answered');
        
        // Multiple choice (next problem)
        await page.locator(':text("NEXT")').click();
        await page.keyboard.press('1');
        await answerLocators.choiceButton(page, 2).click();
        await answerLocators.choiceButton(page, 4).click(); 
        await answerLocators.submitChoiceButton(page).click();
        await expect(page.getByText('Correct!', { exact: true })).toBeVisible();
        console.log('✅ Multiple choice answered');

        // Ordered choice (next problem)
        await answerLocators.submitChoiceButton(page).click();
        await page.keyboard.press('1');
        const count = await page.locator('[data-testid^="choice-variant-"]').count(); //choice buttons count
        for (let i = 0; i < count; i++) {
        await answerLocators.choiceButton(page, i).click();
        }
        await answerLocators.submitChoiceButton(page).click();
        await expect(page.getByText('Correct!', { exact: true })).toBeVisible();
        console.log('✅ Ordered choice answered');

        //Handwriting (next problem)
        await page.locator(':text("NEXT")').click();
        await page.waitForLoadState('domcontentloaded');
        await page.keyboard.press('1');
        await expect(answerLocators.myscriptDrawingArea(page)).not.toBeVisible(); // check that myscript area is not visible
        await answerLocators.inputTypeSelector(page).click(); 
        await expect(answerLocators.myscriptDrawingArea(page)).toBeVisible();

        const { one, two, three } = await getDrawingCoordinates(page);

        await drawStroke(page, one);
        await drawStroke(page, two);
        await drawStroke(page, three);
        await page.waitForTimeout(1000); // wait for strokes to be processed

        await answerLocators.submitAnswerButton(page).click();
        await expect(page.getByText('Correct!', { exact: true })).toBeVisible();
        console.log('✅ Handwriting answered');
        await answerLocators.submitAnswerButton(page).click();
    });


});




