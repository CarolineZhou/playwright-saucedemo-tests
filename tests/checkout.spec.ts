import { test, expect } from "../fixtures/testSetup";
import { InventoryPage } from "../pages/InventoryPage";

test("user can checkout 1 product", async ({ loggedInPage }) => {
    const inventoryPage = new InventoryPage(loggedInPage);

    await inventoryPage.addToCart("Sauce Labs Backpack");
    await inventoryPage.goToCart();
    await inventoryPage.checkout();

    await inventoryPage.expectCheckoutSuccess();
});

test("user can checkout 2 products", async ({ loggedInPage }) => {
    const inventoryPage = new InventoryPage(loggedInPage);

    await inventoryPage.addToCart("Sauce Labs Backpack");
    await inventoryPage.addToCart("Sauce Labs Bike Light");
    await inventoryPage.goToCart();
    await inventoryPage.checkout();

    await inventoryPage.expectCheckoutSuccess();
});