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

      test('radio button', async({page}) => {
        const gridRadio = page.locator('nb-card', {hasText:'Using the Grid'})
        await gridRadio.getByRole('radio', {name: 'Option 1'}).check({force: true})
        const radiopStatus = await gridRadio.getByRole('radio', {name: 'Option 1'}).isChecked()
        expect(radiopStatus).toBe(true)
        await expect(gridRadio.getByRole('radio', {name: 'Option 1'})).toBeChecked()

        await gridRadio.getByRole('radio', {name: 'Option 2'}).check({force: true})
        expect(await gridRadio.getByRole('radio', {name: 'Option 1'}).isChecked()).toBeFalsy()
        expect(await gridRadio.getByRole('radio', {name: 'Option 2'}).isChecked()).toBeTruthy()



      })


      

})
//check box
test('checkboxes', async({page}) => {
  await page.getByText('Modal & Overlays').click()
  await page.getByText('Toastr').click()
  await page.getByRole('checkbox', {name: "Hide on click"}).click({force: true})

  //checked all of them
  const allCheckBoxes = page.getByRole('checkbox')
  for(const checkbox of await allCheckBoxes.all()) {
    await checkbox.uncheck({force: true})
    expect(await checkbox.isChecked()).toBeFalsy()
  }

})

//dropdowns and list

test('dropdown ', async({page}) => {
  const dropdownMenu = page.locator('ngx-header nb-select ')
  await dropdownMenu.click()
  const optionList = page.locator('nb-option-list nb-option')
  await expect(optionList).toHaveText(['Light', 'Dark', 'Cosmic', 'Corporate'])
  await optionList.filter({hasText:'Cosmic'}).click()
  //checking css color
  const header = page.locator('nb-layout-header')
  await expect(header).toHaveCSS('background-color', 'rgb(50, 50, 89)')




const colors = {
  "Light":"rgb(255, 255, 255)",
  "Dark":"rgb(34, 43, 69)",
  "Cosmic":"rgb(50, 50, 89)",
  "Corporate":"rgb(255, 255, 255)"
}
await dropdownMenu.click()
for(const color in colors) {
  await optionList.filter({hasText:color}).click()
  await expect(header).toHaveCSS('background-color', colors[color])

  if(color != 'Corporate'){
    await dropdownMenu.click()
  }
}


})

//TOOLTIPS SPAN (HOVER OVER)

test('tooltip hover', async({page}) => {
  await page.getByText('Modal & Overlays').click()
  await page.getByText('Tooltip').click()

  const toolTip = page.locator('nb-card', {hasText: 'Tooltip Placement'})
  await toolTip.getByRole('button', {name: 'TOP'}).hover()
  const toolTipContent = await page.locator('nb-tooltip').textContent()
  expect(toolTipContent).toEqual('This is a tooltip')

})

//dialog box

test('dialog box', async({page}) => {
  await page.getByText('Tables & Data').click()
  await page.getByText('Smart Table').click()
  

  page.on('dialog', dialog => {
    expect(dialog.message()).toEqual('Are you sure you want to delete?')
    dialog.accept()
  })
  await page.getByRole('table').locator('tr', {hasText:"mdo@gmail.com"}).locator('.nb-trash').click()
})

//web tables

test('change row input', async({page}) => {
  await page.getByText('Tables & Data').click()
  await page.getByText('Smart Table').click()

  const targetRow = page.locator('tr', {hasText:"snow@gmail.com"})
  await targetRow.locator('.nb-edit').click()

  await page.locator('input-editor').getByPlaceholder('Age').clear()
  await page.locator('input-editor').getByPlaceholder('Age').fill('32')
  await page.locator('.nb-checkmark').click()

  //get the spesific row

  await page.locator('.ng2-smart-page-link', {hasText:'2'}).click()
   const targetById = page.getByRole('row', {name:"11"}).filter({has: page.locator('td').nth(1).getByText('11')})
   await targetById.locator('.nb-edit').click()

   await page.locator('.nb-checkmark').click()


})

//datepicker
test('date picker', async ({page}) => {
await page.getByText('Forms').click()
await page.getByText('Datepicker').click()

const calendarInputField = page.getByPlaceholder('Form Picker')
await calendarInputField.click()

await page.locator('[class="day-cell ng-star-inserted"]').getByText('1', {exact: true}).click()
//assertion validation
expect(calendarInputField).toHaveValue('Aug 1, 2024')

})