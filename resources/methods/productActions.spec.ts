import {expect, Page} from "@playwright/test";
import { MainPageLocators } from "../locators/mainpagelocators.spec";

export class productActions {
    readonly mainPageLocators: MainPageLocators;
    readonly page: Page;
    
    constructor(page: Page) {
        this.page = page;
        this.mainPageLocators = new MainPageLocators(page);
    }

    async selectProduct(productName: string) {
        const productCard = this.mainPageLocators.productName.filter({ hasText: productName });
        await expect(productCard).toBeVisible();
        await productCard.click();
    }

    async selectCategory(categoryName: string) {
        const categoryButton = this.mainPageLocators.productCategory.locator('a', { hasText: categoryName });
        await expect(categoryButton).toBeVisible();
        await categoryButton.click();
    }

    async addToCart() {
        const addToCartButton = this.page.locator('a', { hasText: "Add to cart" });
        await expect(addToCartButton).toBeVisible();
        await addToCartButton.click();
    }

    async popUpAddToCart() {
        await this.page.on("dialog", async (dialog) => {
            await expect(dialog.message()).toBe("Product added.");
            await dialog.accept();
        });
    }
}