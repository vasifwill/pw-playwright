import {Locator, Page} from "@playwright/test"

export class NavigationPage {
    readonly page:Page
    readonly formLayoutMenu: Locator
    readonly datePickerMenu: Locator
    readonly smartTablesMenu: Locator
    readonly toastrMenu: Locator
    readonly tooltipMenu: Locator


    constructor(page:Page) {
        this.page = page
        this.formLayoutMenu = page.getByText('Form Layouts')
        this.datePickerMenu = page.getByText('Datepicker')
        this.tooltipMenu = page.getByText('Tooltip')
        this.toastrMenu = page.getByText('Toastr')
        this.smartTablesMenu = page.getByText('Smart Table')

    }

    async formLayoutsPage () {
        await this.selectGroupMenuItem('Forms')
        await this.formLayoutMenu.click()
    }

    async datePickerPage () {
        await this.selectGroupMenuItem('Forms')
        // await this.page.waitForTimeout(1000)
        await this.datePickerMenu.click()
    }

    async smartTablesPage () {
        await this.selectGroupMenuItem('Tables & Data')
        await this.smartTablesMenu.click()
    }

    async toastrPage () {
        await this.selectGroupMenuItem('Modal & Overlays')
        await this.toastrMenu.click()
    }

    async tooltipPage () {
        await this.selectGroupMenuItem('Modal & Overlays')
        await this.tooltipMenu.click()
    }

    private async selectGroupMenuItem (groupItemTitle: string){
        const groupMenuItem = this.page.getByTitle(groupItemTitle)
        const expandedState = await groupMenuItem.getAttribute('aria-expanded')
        if (expandedState == 'false'){
            await groupMenuItem.click()
        }
            
    }
}