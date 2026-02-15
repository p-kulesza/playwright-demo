import {Page, Locator} from "@playwright/test";

export class NavigationBarLocators {
    readonly page: Page;
    readonly storeLogo: Locator;
    readonly homeButton: Locator;
    readonly contactButton: Locator;
    readonly aboutUsButton: Locator;
    readonly cartButton: Locator;
    readonly loginButton: Locator;
    readonly signUpButton: Locator;

    constructor(page: Page) {
    this.page = page;
    this.storeLogo = page.locator("[id='nava']");
    this.homeButton = page.locator('ul [class="nav-link"]', {hasText: "Home",});
    this.contactButton = page.locator('ul [class="nav-link"]', {hasText: "Contact",});
    this.aboutUsButton = page.locator('ul [class="nav-link"]', {hasText: "About us",});   
    this.cartButton = page.locator('ul [class="nav-link"]', {hasText: "Cart",});
    this.loginButton = page.locator('ul [class="nav-link"]', {hasText: "Log in",});
    this.signUpButton = page.locator('ul [class="nav-link"]', {hasText: "Sign up",});
    }}