import {test} from '@playwright/test'


test.beforeEach(async({page}) => {
    await page.goto('http://localhost:4200/')
    })





//test.describe.skip 0r test.describe.only

test.describe('suit 1',() => {
    test.beforeEach(async({page}) => {
        await page.getByText('Forms').click()
    })


    test('form layouts',async({page}) => {
        await page.getByText('Form Layouts').click()
    })

    test('navigate to  datepicker', async ({page}) => {
        await page.getByText('Datepicker').click()
    })

    

})


test.describe('navigate to charts',() => {
    test.beforeEach(async({page}) => {
        await page.getByText('Charts').click()
    })
    
    
    test('navigate to  echarts', async ({page}) => {
        await page.getByText('Echarts').click()
    })


})