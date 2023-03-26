const { expect } = require('@playwright/test');

class LoginPage {

    constructor(page) {
        this.page = page;
        this.email = page.locator("#Email");
        this.password = page.locator("#Password");
        this.loginBtn = page.locator(".login-button");
    }

    async enterData(email, password) {
        await this.email.type(email);
        await this.password.type(password);
    }


    async login() {
        await this.loginBtn.click();
    }

    async verifyLogin(email) {
        const accEmail = await this.page.locator(".account").first().textContent();
        await expect(accEmail).toBe(email);

    }

    async invalidPassword() {
        const text = await this.page.locator(".validation-summary-errors").textContent();
        await expect(text).toContain("The credentials provided are incorrect");

    }

    async invalidEmail() {
        const text = await this.page.locator(".validation-summary-errors").textContent();
        await expect(text).toContain("No customer account found");

    }
}

module.exports = { LoginPage };