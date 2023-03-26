class DesktopsPage{

    constructor(page){
        this.products=page.locator(".item-box");    
        this.page=page;
    }

    async chooseProduct(){
        await this.products.last().waitFor();
        await this.products.last().click();
    }

    async addToCart(){
        await this.page.locator(".add-to-cart-button").waitFor();
        await this.page.locator(".option-list").first().locator("input").click();
        await this.page.locator(".add-to-cart-button").click();
    }

}

module.exports={DesktopsPage};