import {test, expect} from "@playwright/test"

test.beforeEach(async({page}) => {
    page.goto('http://localhost:4200/')

})

test.describe('forms inputs', () => {

    test.beforeEach(async({page}) => {
        page.getByText('Forms').click()
        page.getByText('Form Layouts').click()
      })

      test('input fields', async({page}) => {
        const usingTheGridEmailInput = page.locator('nb-card', {hasText:'Using the Grid'}).getByRole('textbox', {name: 'Email'})
        await usingTheGridEmailInput.fill('test@test.com')
        // await usingTheGridEmailInput.clear()
        // await usingTheGridEmailInput.pressSequentially('test2@test.com', {delay: 500})

        //generic assertion
        const inputValue = await usingTheGridEmailInput.inputValue()
        expect(inputValue).toEqual('test@test.com')

        //locator value
        expect(usingTheGridEmailInput).toHaveValue('test@test.com')
      })
})