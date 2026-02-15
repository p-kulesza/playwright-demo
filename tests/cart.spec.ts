import { test } from "@playwright/test";
import { navigation } from "../resources/methods/nagivation.spec";
import { productActions } from "../resources/methods/productActions.spec";

test.beforeEach(async ({ page }) => {
    await page.goto('https://www.demoblaze.com');
});

test('Add product to cart', async ({ page }) => {
    const navigationBar = new navigation(page)
    const productActionsPage = new productActions(page);
    await navigationBar.navigateToHome();
    await productActionsPage.selectProduct("Samsung galaxy s6");
    await productActionsPage.popUpAddToCart();
    await productActionsPage.addToCart();
    await navigationBar.navigateToCart();
});

//randomize items w/ csv