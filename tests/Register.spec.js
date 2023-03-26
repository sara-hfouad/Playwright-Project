const { test } = require('@playwright/test');
const { POManager } = require('../page-objects/POManager');
const registerData=JSON.parse(JSON.stringify(require('../data/registerData.json')));
const loginData = JSON.parse(JSON.stringify(require('../data/loginData.json')));

let pomanager;
let homePage;
let registerPage;
let context;
let page;

test.beforeEach(async({browser})=>{
    context = await browser.newContext();
    page = await context.newPage();
    pomanager = new POManager(page);
    homePage = pomanager.getHomePage();
    registerPage = pomanager.getRegisterPage();

    await page.goto("https://demowebshop.tricentis.com/");
    await homePage.Register();
})

test.afterEach(async()=>{
    await context.close();
})

// 1- Register 3 new customers with a valid email – You can use any random data- 
// but use parameterization and do not create 3 separate tests. “Smoke”
for(const data of registerData){
    test(`@Smoke Test Valid Register ${data.firstName}`, async ({ page }) => {
        await registerPage.enterData(data.gender,data.firstName,data.lastName,data.email,data.password);
        await registerPage.register();
        await registerPage.logout();

    })
}

// 2- Test registering an already existing customer – Use same data you used in registering a new customer-. “Regression”.
test("@Regression Test Invalid Register", async () => {

    await registerPage.enterData(registerData[0].gender,registerData[0].firstName,registerData[0].lastName,registerData[0].email,registerData[0].password);
    await registerPage.register();
    await registerPage.InvalidEmail();

})