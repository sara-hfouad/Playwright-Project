const { test } = require('@playwright/test');
const { POManager } = require('../page-objects/POManager');
const creditCardData = JSON.parse(JSON.stringify(require('../data/creditCardData.json')));
const billingAddressData = JSON.parse(JSON.stringify(require('../data/billingAddressData.json')));


const validEmail = "testemail13@gmail.com";
const validPassword = "password13";
const productName = "14.1-inch Laptop";
const discountCode = "AutomationDiscount2";

const newEmail = "testtestemail122@gmail.com";
const newPassword = "password12";

let pomanager;
let homePage;
let loginPage;
let cartPage;
let checkoutPage;
let desktopsPage;
let context;
let page;

test.beforeEach(async ({ browser }) => {
    context = await browser.newContext();
    page = await context.newPage();
    pomanager = new POManager(page);
    homePage = pomanager.getHomePage();
    loginPage = pomanager.getLoginPage();
    cartPage = pomanager.getCartPage();
    checkoutPage = pomanager.getCheckoutPage();
    desktopsPage = pomanager.getDesktopsPage();

    await page.goto("https://demowebshop.tricentis.com/");
    await homePage.Login();
    await loginPage.enterData(validEmail, validPassword);
    await loginPage.login();
})

test.afterEach(async () => {
    await homePage.Logout();
    await context.close();

})


// 10- Create one End to End Scenario to login and then navigate to (Computers > Desktops) add 
// the “Simple Computer” to the shopping card and then checkout and verify that the order has 
// been successfully processed. “Smoke”
test("@Smoke Test End to End", async () => {

    // add product to cart
    await homePage.gotoDesktops();
    await desktopsPage.chooseProduct();
    await desktopsPage.addToCart();

    // add discount and go to checkout
    await homePage.gotoCart();
    await cartPage.addDiscountCode(discountCode);
    await cartPage.checkTermsofService();
    await cartPage.checkout();


    // fill required data and confirm order
    // if the account already has a saved billing address, uncomment line 68 to select and enter a new address
    // if this is the first time for the account to enter the billing address then comment it
    await checkoutPage.newAddress();

    await checkoutPage.fillBillingData(billingAddressData.country, billingAddressData.city, billingAddressData.address, billingAddressData.zip, billingAddressData.phone);
    await checkoutPage.billing();
    await checkoutPage.shipping();
    await checkoutPage.shippingMethod();
    await checkoutPage.paymentMethod();
    await checkoutPage.paymentInfo(creditCardData.name, creditCardData.number, creditCardData.month, creditCardData.year, creditCardData.code);
    await checkoutPage.confirmOrder();

    // verify that the order has been successfully processed 
    await checkoutPage.verifyOrder();
})

