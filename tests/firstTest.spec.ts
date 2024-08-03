import {test, expect} from '@playwright/test'


test.beforeEach(async({page}) => {
    await page.goto('http://localhost:4200/')
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
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

// find child
test('find child', async ({page}) => {
    await page.locator('nb-card nb-radio :text-is("Option 1")').click()
})

//find parent
test('find parent', async ({page}) => {
    await page.locator('nb-card', {hasText:"Using the Grid"}).getByRole('textbox', {name: 'Email'}).click()
    await page.locator('nb-card', {has: page.locator('#inputPassword2')}).getByRole('textbox', {name: 'Email'}).click()
    //or
    await page.locator('nb-card').filter({hasText:"Basic form"}).getByRole('textbox', {name: 'Email'}).click()
    await page.locator('nb-card').filter({has: page.locator('[placeholder="Recipients"]')}).getByRole('textbox', {name: 'Subject'}).click()

    await page.locator('nb-card').filter({has: page.locator('nb-checkbox')}).filter({hasText:"Sign in"}).getByRole('textbox', {name: 'Email'}).click()
})

//resusing locator

test('create resuable locator', async ({page}) => {
    const basicLocator = page.locator('nb-card').filter({hasText:"Basic form"})
    const emailLocator = basicLocator.getByRole('textbox', {name: 'Email'})

    await emailLocator.fill("vasif@gmail.com")
    await basicLocator.getByRole('textbox', {name: 'Password'}).fill("welcome123")
    await basicLocator.getByRole('button').click()

    await expect(emailLocator).toHaveValue('vasif@gmail.com')
})

//executing values
test('executing values', async ({page}) => {
    //text value
    const basicLocator = page.locator('nb-card').filter({hasText:"Basic form"})
    const buttonText =  await basicLocator.getByRole('button').textContent()
    expect(buttonText).toEqual('Submit')

    //all text values
    const usingGrid = await page.locator('nb-radio').allTextContents()
    expect(usingGrid).toContain("Option 1")

    //input value
    const emailField = basicLocator.getByRole('textbox', {name: 'Email'})
    await emailField.fill("test@gmail.com")
    const emailValue = await emailField.inputValue()
    expect(emailValue).toEqual('test@gmail.com')

    // get attribute value

    const placeholderValue = await emailField.getAttribute('placeholder')
    expect(placeholderValue).toEqual('email')

})


test('assertions', async ({page}) => {

    //general assertions
    const basicLocator = page.locator('nb-card').filter({hasText:"Basic form"}).locator('button')
    const text = await basicLocator.textContent()
    expect(text).toEqual('Submit')


    //locator assertion

    await expect(basicLocator).toHaveText('Submit')

    //soft assertion
    await expect.soft(basicLocator).toHaveText('Submit')
    //then you can add action even this test is not working
    await basicLocator.click()



})

