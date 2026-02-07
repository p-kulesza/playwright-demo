import { expect, Page } from "@playwright/test";
import { MainPageLocators } from "../locators/mainpagelocators.spec";

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
        expect (this.mainPageLocators.usernameSignField).toBeEmpty();
    }

    async signUpWithEmptyPassword(username: string) {
        await this.mainPageLocators.usernameSignField.fill(username);
        expect (this.mainPageLocators.passwordSignField).toBeEmpty();
    }

    async closeSignUpDialog() {
        await this.mainPageLocators.closeDialogButton.click();
        expect(this.mainPageLocators.usernameSignField).toBeHidden();
        expect(this.mainPageLocators.passwordSignField).toBeHidden();
        expect(this.mainPageLocators.signUpDialogButton).toBeHidden();
        expect(this.mainPageLocators.closeDialogButton).toBeHidden();
    }

    async closeSignUpDialogWithIcon() {
        await this.mainPageLocators.closeIconButton.click();
        expect(this.mainPageLocators.usernameSignField).toBeHidden();
        expect(this.mainPageLocators.passwordSignField).toBeHidden();
        expect(this.mainPageLocators.signUpDialogButton).toBeHidden();
        expect(this.mainPageLocators.closeDialogButton).toBeHidden();
    }

    async signUp(){
        await this.mainPageLocators.signUpDialogButton.click();
        expect(this.mainPageLocators.usernameSignField).toBeHidden();
        expect(this.mainPageLocators.passwordSignField).toBeHidden();
        expect(this.mainPageLocators.signUpDialogButton).toBeHidden();
        expect(this.mainPageLocators.closeDialogButton).toBeHidden();
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