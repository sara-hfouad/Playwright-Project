const { expect } = require('@playwright/test');

class RegisterPage {

    constructor(page) {
        this.page=page;
        this.male = page.locator("#gender-male");
        this.female = page.locator("#gender-female");
        this.firstName = page.locator("#FirstName");
        this.lastName = page.locator("#LastName");
        this.email = page.locator("#Email");
        this.password = page.locator("#Password");
        this.confirmPassword = page.locator("#ConfirmPassword");
        this.registerBtn = page.locator("#register-button");
    }

    async enterData(gender, first, last, email, password) {
        if (gender === "male") {
            await this.male.click();
        }
        else {
            await this.female.click();
        }

        await this.firstName.type(first);
        await this.lastName.type(last);

        await this.email.type(email);

        await this.password.type(password);
        await this.confirmPassword.type(password);
    }

    async register(){
        await this.registerBtn.click();
    }

    async logout(){
        await this.page.locator(".ico-logout").click();
    }
    
    async InvalidEmail(){
        const errorMsg = await this.page.locator(".validation-summary-errors").textContent();  
        await expect(errorMsg).toContain("email already exists");
    }


}

module.exports = { RegisterPage };