import {test, expect} from "@playwright/test"


test.beforeEach('first thesecond', async({page}) => {
    await page.goto('http://uitestingplayground.com/ajax')
    await page.getByText('Button Triggering AJAX Request').click()
})


test('press button', async({page}) => {
    const succesButton = page.locator('.bg-success')
    await expect(succesButton).toHaveText('Data loaded with AJAX get request.', {timeout:20000})
})
test('another example for waiting for', async({page}) => {
const succesButton1 = page.locator('.bg-success')

//wait for element
await page.waitForSelector('.bg-success')

//wait for api response
await page.waitForResponse('http://uitestingplayground.com/ajaxdata')

expect(succesButton1).toContainText('Data loaded with AJAX get request.')

})

test('timeout', async({page}) => {
    const succesButton2 = page.locator('.bg-success')

    await succesButton2.click({timeout:16000})
})