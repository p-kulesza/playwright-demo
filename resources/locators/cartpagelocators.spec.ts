import {Page, Locator} from "@playwright/test";

export class CartPageLocators {
    readonly page: Page
    readonly placeOrderButton: Locator;
    readonly nameField: Locator;
    readonly itemPriceField: Locator;
    readonly totalPriceField: Locator;
    readonly deleteItemButton: Locator;
    readonly nameFieldOrder: Locator;
    readonly countryFieldOrder: Locator;
    readonly cityFieldOrder: Locator;
    readonly creditCardFieldOrder: Locator;
    readonly monthFieldOrder: Locator;
    readonly yearFieldOrder: Locator;
    readonly purchaseButtonOrder: Locator;
    readonly closeButtonOrder: Locator;

    constructor(page: Page) {
        this.page = page;
        this.placeOrderButton = page.locator('button', { hasText: "Place Order" });
    }}