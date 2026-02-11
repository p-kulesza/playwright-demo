import { expect, Page } from "@playwright/test";
import { MainPageLocators } from "../../locators/mainpagelocators.spec";

export class SignUpPage {
  readonly mainPageLocators: MainPageLocators;
  readonly page: Page;

    constructor(page: Page) {
        this.page = page;
        this.mainPageLocators = new MainPageLocators(page);
    }

    async OpenSignUpDialog() {
        await this.mainPageLocators.signUpButton.click();
        await expect(this.mainPageLocators.usernameSignField).toBeVisible();
    }

    async signUpFully(username: string, password: string) {
        await this.mainPageLocators.usernameSignField.fill(username);
        await this.mainPageLocators.passwordSignField.fill(password);
    }

    async signUpWithEmptyUsername(password: string) {
        await this.mainPageLocators.passwordSignField.fill(password);
        await expect (this.mainPageLocators.usernameSignField).toBeEmpty();
    }

    async signUpWithEmptyPassword(username: string) {
        await this.mainPageLocators.usernameSignField.fill(username);
        await expect (this.mainPageLocators.passwordSignField).toBeEmpty();
    }

    async closeSignUpDialog() {
        await this.mainPageLocators.closeDialogButton.click();
        await expect(this.mainPageLocators.usernameSignField).toBeHidden();
        await expect(this.mainPageLocators.passwordSignField).toBeHidden();
        await expect(this.mainPageLocators.signUpDialogButton).toBeHidden();
        await expect(this.mainPageLocators.closeDialogButton).toBeHidden();
    }

    async closeSignUpDialogWithIcon() {
        await this.mainPageLocators.closeIconButton.click();
        await expect(this.mainPageLocators.usernameSignField).toBeHidden();
        await expect(this.mainPageLocators.passwordSignField).toBeHidden();
        await expect(this.mainPageLocators.signUpDialogButton).toBeHidden();
        await expect(this.mainPageLocators.closeDialogButton).toBeHidden();
    }

    async signUp(){
        await this.mainPageLocators.signUpDialogButton.click();
        await expect(this.mainPageLocators.usernameSignField).toBeHidden();
        await expect(this.mainPageLocators.passwordSignField).toBeHidden();
        await expect(this.mainPageLocators.signUpDialogButton).toBeHidden();
        await expect(this.mainPageLocators.closeDialogButton).toBeHidden();
    }

    async signUpWithEmptyFields() {
        await this.mainPageLocators.signUpButton.click();
        await this.mainPageLocators.signUpDialogButton.click();
    }

    async validationCommentSignUpDialog() {
        await this.page.on("dialog", async (dialog) => {
            await expect(dialog.message()).toBe("Please fill out Username and Password.");
            await dialog.accept();
        });
    }

    async successfulCommentSignUpDialog() {
        await this.page.on("dialog", async (dialog) => {
            await expect(dialog.message()).toBe("Successfully signed up.");
            await dialog.accept();
        });
    }   
    }