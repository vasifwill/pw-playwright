import {test, expect} from '@playwright/test'
import {NavigationPage} from '../page-objects/navigationPage'
import {FormLayoutsPage} from '../page-objects/formLayoutsPage'

test.beforeEach( async ({page}) => {
    await page.goto('http://localhost:4200/')
})

test('navigate to form page', async ({page}) => {
    const navigateTo = new NavigationPage(page)
    await navigateTo.formLayoutsPage()
    await navigateTo.datePickerPage()
    await navigateTo.toastrPage()
    await navigateTo.tooltipPage()
    await navigateTo.smartTablesPage()

})

test('Grid form submit in From Layouts page', async ({page}) => {
    const navigateTo = new NavigationPage(page)
    const gridForms = new FormLayoutsPage(page)
    await navigateTo.formLayoutsPage()
    await gridForms.submitUsingGridForm('vasif@gmail.com', 'vasif1989', 'Option 1')
    await gridForms.inlineForm('vasif mammadov', 'vasif@gmail.com', true)

})

