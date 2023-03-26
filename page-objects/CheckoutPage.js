const { expect } = require("@playwright/test");

class CheckoutPage {

    constructor(page) {
        this.page = page;
        this.billingAddress = page.locator("#billing-buttons-container input");
        this.shippingAddress = page.locator("#shipping-buttons-container input");
        this.shippingmethod = page.locator("#shipping-method-buttons-container input");
        this.paymentmethod = page.locator("#payment-method-buttons-container input");
        this.paymentinfo = page.locator("#payment-info-buttons-container input");
        this.confirm = page.locator("#confirm-order-buttons-container input");

        this.country = page.locator("#BillingNewAddress_CountryId");
        this.city = page.locator("#BillingNewAddress_City");
        this.address = page.locator("#BillingNewAddress_Address1");
        this.zip = page.locator("#BillingNewAddress_ZipPostalCode");
        this.phone = page.locator("#BillingNewAddress_PhoneNumber");

        this.creditCard = page.locator(".payment-details input").nth(2);
        this.creditCardType = page.locator("#CreditCardType");
        this.cardHolderName = page.locator("#CardholderName");
        this.cardNumber = page.locator("#CardNumber");
        this.expireMonth = page.locator("#ExpireMonth");
        this.expireYear = page.locator("#ExpireYear");
        this.cardCode = page.locator("#CardCode");
    }

    async billing() {
        await this.billingAddress.click();
    }

    async shipping() {
        await this.shippingAddress.click();
    }

    async shippingMethod() {
        await this.shippingmethod.click();
    }

    async paymentMethod() {

        await this.creditCard.click();
        await this.paymentmethod.click();
    }

    async paymentInfo(name, number, month, year, code) {
        await this.creditCardType.selectOption("Visa");
        await this.cardHolderName.type(name);
        await this.cardNumber.type(number);
        await this.expireMonth.selectOption(month);
        await this.expireYear.selectOption(year);
        await this.cardCode.type(code);

        await this.paymentinfo.click();
    }

    async confirmOrder() {
        await this.confirm.click();
    }

    async verifyOrder(){
        await this.page.locator(".details").waitFor();
        const msg= await this.page.locator(".checkout-page .title").textContent();
        await expect(msg).toContain("Your order has been successfully processed");
    }

    async newAddress() {
        const dropdown = await this.page.locator("#billing-address-select");
        await dropdown.selectOption({ label: "New Address" });
    }

    async verifyBillingRequired() {
        const country = await this.page.locator(".field-validation-error").first().textContent();
        const city = await this.page.locator(".field-validation-error").nth(1).textContent();
        const address = await this.page.locator(".field-validation-error").nth(2).textContent();
        const zip = await this.page.locator(".field-validation-error").nth(3).textContent();
        const phone = await this.page.locator(".field-validation-error").last().textContent();

        await expect(country).toContain("Country is required");
        await expect(city).toContain("City is required");
        await expect(address).toContain("Street address is required");
        await expect(zip).toContain("Zip / postal code is required");
        await expect(phone).toContain("Phone is required");
    }


    async fillBillingData(country, city, address, zip, phone) {
        const countryDropdown = this.page.locator("#BillingNewAddress_CountryId");
        await countryDropdown.selectOption({ label: country });
        await this.city.type(city);
        await this.address.type(address);
        await this.zip.type(zip);
        await this.phone.type(phone);

    }
}

module.exports = { CheckoutPage }