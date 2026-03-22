import { test } from "../fixtures/testSetup";
import { CartPage } from "../pages/CartPage";
import { InventoryPage } from "../pages/InventoryPage";
import { cart_items } from "../utils/cart_test_data";

test("verify the detail of two products in cart", async({ loggedInPage }) => {
    const inventoryPage = new InventoryPage(loggedInPage);

    await inventoryPage.addToCart("Sauce Labs Backpack");
    await inventoryPage.addToCart("Sauce Labs Bike Light");
    await inventoryPage.goToCart();

    const cartPage = new CartPage(loggedInPage);
    await cartPage.validateItemsInCart(cart_items);
});