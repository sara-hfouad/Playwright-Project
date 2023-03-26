const { expect } = require("@playwright/test");

class CartPage {

    constructor(page) {
        this.products = page.locator(".cart tbody tr");
        this.discountCode = page.locator(".discount-coupon-code");
        this.applyDiscount = page.locator(".apply-discount-coupon-code-button");
        this.checkoutBtn=page.locator("#checkout");
        this.termsofservice=page.locator("#termsofservice");
        this.page = page;
    }



    async verifyProductInCart(productName) {
        await this.products.last().waitFor();
        const count = await this.products.count();
        let bool;

        for (let i = 0; i < count; i++) {
            var name = await this.products.nth(i).locator("a[class='product-name']").textContent();
            console.log(name);

            if (name === productName) {
                bool = "found";
                break;
            }
        }
        await expect(bool).toBe("found");
    }

    async addDiscountCode(discount) {
        await this.discountCode.type(discount);
        await this.applyDiscount.click();
    }

    async verifyDiscount(){
        const subtotalString= await this.page.locator(".product-price").first().textContent();
        const totalString = await this.page.locator(".order-total").textContent();
        const subtotal=parseInt(subtotalString);
        const total=parseInt(totalString);
        const expected = subtotal * 0.8;

        console.log(subtotal +"    "+ total+"     "+expected);
        await expect(expected).toBe(total);
    }

    async checkout(){
        await this.checkoutBtn.click();
    }

    async verifyTermsofService(){

        const bool= await this.page.locator(".ui-dialog").isVisible();
        await expect(bool).toBeTruthy();

        const msg= await this.page.locator("#terms-of-service-warning-box p").textContent();
        await expect(msg).toContain("accept the terms of service");
        
        const x=await this.page.locator(".ui-button-icon-primary");
        await x.click();
    }

    async checkTermsofService(){
        await this.termsofservice.click();
    }
}

module.exports = { CartPage };