import {expect, Page} from "@playwright/test";
import { MainPageLocators } from "../locators/mainpagelocators.spec";
import { NavigationBarLocators } from "../locators/navigationbarlocators.spec";

export class LogInPage {
    readonly mainPageLocators: MainPageLocators;
    readonly navigationBarLocators: NavigationBarLocators;
    readonly page: Page;
    
    constructor(page: Page) {
        this.page = page;
        this.mainPageLocators = new MainPageLocators(page);
        this.navigationBarLocators = new NavigationBarLocators(page);
    }

    async OpenLogInDialog() {
        await this.navigationBarLocators.loginButton.click();
        await expect(this.mainPageLocators.usernameLoginField).toBeVisible();
    }

    async inputUsernameLogin(username: string) {
        await this.mainPageLocators.usernameLoginField.fill(username);
        await expect(this.mainPageLocators.usernameLoginField).toHaveValue(username);
    }

    async inputPasswordLogin(password: string) {
        await this.mainPageLocators.passwordLoginField.fill(password);
        await expect(this.mainPageLocators.passwordLoginField).toHaveValue(password);
    }

    async applyLogIn(){
        await this.mainPageLocators.LogInButton.click();
    }

    async negativePopUpLogIn() {
        await this.page.on("dialog", async (dialog) => {
            await expect(dialog.message()).toBe("Please fill out Username and Password.");
            await dialog.accept();
        });
    }

    async positivePopUpLogIn() {
        await this.page.on("dialog", async (dialog) => {
            await expect(dialog.message()).toBe("Welcome " + this.mainPageLocators.usernameLoginField);
            await dialog.accept();
        });
    }

    async closeLogInDialog() {
        await this.mainPageLocators.closeDialogButton.click();
        await expect(this.mainPageLocators.usernameLoginField).toBeHidden();
    }

    async closeLogInDialogWithIcon() {
        await this.mainPageLocators.closeIconButton.click();
        await expect(this.mainPageLocators.usernameLoginField).toBeHidden();
    }}