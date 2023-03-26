const { test } = require('@playwright/test');
const { POManager } = require('../page-objects/POManager');
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
let context;
let page;

test.beforeEach(async({browser})=>{
    context = await browser.newContext();
    page = await context.newPage();
    pomanager = new POManager(page);
    homePage = pomanager.getHomePage();
    loginPage = pomanager.getLoginPage();
    cartPage = pomanager.getCartPage();
    checkoutPage=pomanager.getCheckoutPage();

    await page.goto("https://demowebshop.tricentis.com/");
    await homePage.Login();
    await loginPage.enterData(validEmail, validPassword);
    await loginPage.login();
})

test.afterEach(async()=>{
    await homePage.Logout();
    await context.close();
})


// 6- After logging in add a new product to cart and verify that it was added successfully. „Smoke”
test("@Smoke Test Add Product to Cart", async () => {
    // await page.pause();
    await homePage.addProducttoCart(productName);
    await homePage.gotoCart();
    await cartPage.verifyProductInCart(productName);
})

// 7- Add discount code “AutomationDiscount2” and verify that it gives 20% discount. ” Regression”
test("@Regression Test Discount Code", async () => {
    await homePage.addProducttoCart(productName);
    await homePage.gotoCart();
    await cartPage.addDiscountCode(discountCode);
    await cartPage.verifyDiscount();
})

// 8- Create a test case to verify that “Terms of service” is mandatory and it is not possible to 
// checkout before agreeing to the Terms of Service by checking the checkbox. ”Regression”
test("@Regression Test Terms of service", async () => {

    await homePage.addProducttoCart(productName);
    await homePage.gotoCart();
    await cartPage.addDiscountCode(discountCode);
    // await page.pause();
    await cartPage.checkout();
    await cartPage.verifyTermsofService();
    await cartPage.checkTermsofService();
    await cartPage.checkout();
})

// 9- Create a test case to verify that after proceeding to the checking out process it is not 
// possible to proceed without filling the mandatory data in the Billing Address “Regression”
test("@Regression Test Billing Address", async () => {

    // await homePage.addProducttoCart(productName);
    await homePage.gotoCart();
    await cartPage.addDiscountCode(discountCode);
    await cartPage.checkTermsofService();
    await cartPage.checkout();

    // await page.pause();

    // if the account already has a saved billing address, uncomment line 86 to select and enter a new address
    // if this is the first time for the account to enter the billing address then comment it
    await checkoutPage.newAddress();
    
    await checkoutPage.billing();
    await checkoutPage.verifyBillingRequired();
    await checkoutPage.fillBillingData(billingAddressData.country, billingAddressData.city, billingAddressData.address, billingAddressData.zip, billingAddressData.phone);
    await checkoutPage.billing();
})
