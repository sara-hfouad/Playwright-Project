const { CartPage } = require("./CartPage");
const { CheckoutPage } = require("./CheckoutPage");
const { DesktopsPage } = require("./DesktopsPage");
const { HomePage } = require("./homePage");
const { LoginPage } = require("./LoginPage");
const { RegisterPage } = require("./RegisterPage");

class POManager {

    constructor(page) {
        this.homePage = new HomePage(page);
        this.registerPage = new RegisterPage(page);
        this.loginPage = new LoginPage(page);
        this.cartPage = new CartPage(page);
        this.checkoutPage = new CheckoutPage(page);
        this.desktopsPage=new DesktopsPage(page);
    }

    getHomePage() {
        return this.homePage;
    }

    getRegisterPage() {
        return this.registerPage;
    }

    getLoginPage() {
        return this.loginPage;
    }

    getCartPage() {
        return this.cartPage;
    }

    getCheckoutPage() {
        return this.checkoutPage;
    }

    getDesktopsPage(){
        return this.desktopsPage;
    }
}

module.exports = { POManager };