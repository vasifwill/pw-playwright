import {Page} from "@playwright/test"

export class FormLayoutsPage {
    private readonly page: Page

    constructor(page:Page) {
        this.page = page
    }

    async submitUsingGridForm(email:string, password:string, optionText:string) {
        const usingGridForm = this.page.locator('nb-card', {hasText:'Using the Grid'})
        await usingGridForm.getByRole('textbox', {name:'Email'}).fill(email);
        await usingGridForm.getByRole('textbox', {name:'Password'}).fill(password);
        await usingGridForm.getByRole('radio', {name:optionText}).check({force:true})
        await usingGridForm.getByRole('button').click()
    }

    async inlineForm(name:string, email:string, checkbox:boolean ) {
        const inlineFormArea = this.page.locator('nb-card').filter({hasText:"Inline form"})
        await inlineFormArea.getByRole('textbox', {name:'Jane Doe'}).fill(name)
        await inlineFormArea.getByRole('textbox', {name:'Email'}).fill(email)
        if(checkbox){
            await inlineFormArea.getByRole('checkbox').check({force:true})
        }
        await inlineFormArea.getByRole('button').click()

    }

    
}