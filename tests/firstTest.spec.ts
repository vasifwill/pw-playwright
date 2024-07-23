import {test} from '@playwright/test'


test.beforeEach(async({page}) => {
    await page.goto('http://localhost:4200/')
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
    })





//test.describe.skip 0r test.describe.only

// test.describe('suit 1',() => {
//     test.beforeEach(async({page}) => {
//         await page.getByText('Forms').click()
//     })


//     test('form layouts',async({page}) => {
//         await page.getByText('Form Layouts').click()
//     })

//     test('navigate to  datepicker', async ({page}) => {
//         await page.getByText('Datepicker').click()
//     })

    

// })


// test.describe('navigate to charts',() => {
//     test.beforeEach(async({page}) => {
//         await page.getByText('Charts').click()
//     })
    
    
//     test('navigate to  echarts', async ({page}) => {
//         await page.getByText('Echarts').click()
//     })


// })


test('locators', async({page}) => {

    //by text
    page.locator(':text("Using the Grid")')
    //text but exact
    page.locator(':text-is("Using the Grid")')
    
    //by Tag name
    page.locator('input')

    //by ID
    page.locator('#inputEmail1')

    //by class
    page.locator('.input-full-width')

    //by attribute
    page.locator('[placeholder="Email"]')

    //by class and class value
    page.locator('[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]')

    //different selectors in the same time
    page.locator('input[placeholder="Email"]')
})

test('user facing locators', async({page}) => {

    await page.getByRole('textbox', {name: 'Email'}).first().click()

    await page.getByRole('button', {name:'Sign in'}).first().click()

    await page.getByLabel('Email').first().click()
    await page.getByText('Using the Grid').click()

    await page.getByTitle('IoT Dashboard').click()

    await page.getByTestId('SignIn')
})