const { test } = require('@playwright/test');
const { POManager } = require('../page-objects/POManager');
const loginData = JSON.parse(JSON.stringify(require('../data/loginData.json')));

let pomanager;
let homePage;
let loginPage;
let context;
let page;

test.beforeEach(async({browser})=>{
    context = await browser.newContext();
    page = await context.newPage();
    pomanager = new POManager(page);
    homePage = pomanager.getHomePage();
    loginPage = pomanager.getLoginPage();

    await page.goto("https://demowebshop.tricentis.com/");
    await homePage.Login();
})

test.afterEach(async()=>{
    await context.close();
})


// 3- Test logging in with a valid username and a valid password. „Smoke”
test("@Smoke Test Valid Login", async () => {

    await loginPage.enterData(loginData.validEmail,loginData.validPassword);
    await loginPage.login();
    await loginPage.verifyLogin(loginData.validEmail);
    await homePage.Logout();
})

// 4- Test logging in with a valid username and an invalid password. „Regression”
test("@Regression Test Invalid Password Login", async () => {

    await loginPage.enterData(loginData.validEmail,loginData.invalidPassword);
    await loginPage.login();
    await loginPage.invalidPassword();

})

// 5- Test logging in with an invalid username. „Regression”
test("@Regression Test Invalid Email Login", async () => {

    await loginPage.enterData(loginData.invalidEmail,loginData.invalidPassword);
    await loginPage.login();
    await loginPage.invalidEmail();

})