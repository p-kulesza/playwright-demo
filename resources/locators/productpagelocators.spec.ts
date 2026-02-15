import {Page, Locator} from "@playwright/test";

export class NavigationBarLocators {
    readonly page: Page;
    readonly addToCartButton: Locator;
    readonly productName: Locator;
    readonly priceContainer: Locator;
    readonly productDescription: Locator;

    constructor(page: Page) {
        this.page = page;
        this.addToCartButton = page.locator('a', { hasText: "Add to cart" });        
        this.productName = page.locator('[class="name"]');
        this.priceContainer = page.locator('[class="price-container"]');
        this.productDescription = page.locator('[id="more-information"]');
}}
