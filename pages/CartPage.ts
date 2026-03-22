import { Page, expect } from "@playwright/test";

type item = {
    product_name: string,
    quantity: number,
    per_item_price: string
};

export class CartPage {
    constructor(private page: Page) {}

    async validateItemsInCart(itemsList: item[]) {
        const tableOfItemsInCart = this.page.locator(".cart_list")
        await expect(tableOfItemsInCart).toBeVisible();

        const allItemsInCart = tableOfItemsInCart.locator(".cart_item");

        const count = await allItemsInCart.count();
        const expectedCount = itemsList.length;
        if (count == expectedCount) {
            for (let i = 0; i < count; i++) {
                const item = allItemsInCart.nth(i);
                const name = item.locator(".inventory_item_name");
                await name.isVisible();
                await expect(name).toHaveText(itemsList[i].product_name);

                const quantity = item.locator(".cart_quantity");
                await quantity.isVisible();
                await expect(quantity).toHaveText(itemsList[i].quantity.toString())

                const itemPrice = item.locator(".inventory_item_price");
                await itemPrice.isVisible();
                await expect(itemPrice).toHaveText(itemsList[i].per_item_price)
            };
        }else{
            return false;
        }
    }
}