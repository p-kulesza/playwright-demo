import {expect, Page} from "@playwright/test";
import { MainPageLocators } from "../locators/mainpagelocators.spec";
import { NavigationBarLocators } from "../locators/navigationbarlocators.spec";
import { CartPageLocators } from "../locators/cartpagelocators.spec";

export class navigation{
    readonly mainPageLocators: MainPageLocators;
    readonly navigationBarLocators: NavigationBarLocators;
    readonly cartPageLocators: CartPageLocators;
    readonly page: Page;
    
    constructor(page: Page) {
        this.page = page;
        this.navigationBarLocators = new NavigationBarLocators(page);
        this.cartPageLocators = new CartPageLocators(page);
        this.mainPageLocators = new MainPageLocators(page);
    }

    async navigateToHome() {
        await this.navigationBarLocators.homeButton.click();
        await expect(this.navigationBarLocators.storeLogo).toBeVisible();
    }

    async navigateToContact() {
        await this.navigationBarLocators.contactButton.click();
        await expect(this.page.locator("[id='exampleModal']")).toBeVisible();
    }

    async navigateToAboutUs() {
        await this.navigationBarLocators.aboutUsButton.click();
        await expect(this.page.locator("[id='videoModal']")).toBeVisible();
    }

    async navigateToCart() {
        await this.navigationBarLocators.cartButton.click();
        await expect(this.cartPageLocators.placeOrderButton).toBeVisible();
    }

    async navigateToNextPage() {
        await this.mainPageLocators.nextButton.click();
        await expect(this.mainPageLocators.previousButton).toBeVisible();
    }

    async navigateToPreviousPage() {
        await this.mainPageLocators.previousButton.click();
        await expect(this.mainPageLocators.nextButton).toBeVisible();
    }
}
