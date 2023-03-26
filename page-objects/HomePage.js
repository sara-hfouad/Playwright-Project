const { expect } = require("@playwright/test");

class HomePage {

    constructor(page) {
        
        this.register = page.locator(".ico-register");
        this.login = page.locator(".ico-login");
        this.products = page.locator(".item-box");
        this.cart=page.locator(".ico-cart").first();
        this.computers=page.locator(".top-menu a[href*='computers']");
        this.page=page;
    }

    async Register() {
        await this.register.click();
    }

    async Login() {
        await this.login.click();
    }

    async Logout(){
        await this.page.locator(".ico-logout").click();
    }

    async addProducttoCart(productName) {
        await this.products.last().waitFor();
        const count = await this.products.count();

        for (let i = 0; i < count; i++) {
            var name = await this.products.nth(i).locator("h2 a").textContent();
            if (name === productName) {
                await this.products.nth(i).locator("input").click();
                break;
            }   
        }
    }

    async gotoDesktops(){
        await this.computers.hover();
        await this.page.locator(".sublist a[href*='desktops']").first().click();
    }

    async gotoCart(){
        await this.cart.click();
    }
}

module.exports = { HomePage };