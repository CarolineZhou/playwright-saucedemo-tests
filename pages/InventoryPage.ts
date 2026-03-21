import { Page, expect } from "@playwright/test";

export class InventoryPage {
    constructor(private page: Page) {}

    async addToCart(productName: string) {
        const product = this.page.locator(".inventory_item")
            .filter({
                hasText: productName,
        });

        await product
            .locator("button")
            .click();
    }

    async goToCart() {
        await this.page.click(".shopping_cart_link");
    }

    async checkout() {
        const checkoutButton = this.page.locator('[data-test="checkout"]');
        await checkoutButton.waitFor({ state: "visible" });
        await checkoutButton.click();

        await this.page.fill('[data-test="firstName"]', "Test First Name");
        await this.page.fill('[data-test="lastName"]', "Test Last Name");
        await this.page.fill('[data-test="postalCode"]', "123456");

        await this.page.click('[data-test="continue"]');
        await this.page.click('[data-test="finish"]');
    }

    async expectCheckoutSuccess() {
        await expect(this.page.locator(".complete-header"))
            .toHaveText("Thank you for your order!");
    }
}