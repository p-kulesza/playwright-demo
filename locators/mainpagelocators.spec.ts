import { Page, Locator } from "@playwright/test";

export class MainPageLocators {
  readonly page: Page;
  readonly storeLogo: Locator;
  readonly homeButton: Locator;
  readonly contactButton: Locator;
  readonly aboutUsButton: Locator;
  readonly cartButton: Locator;
  readonly loginButton: Locator;
  readonly signUpButton: Locator;
  readonly carouselNextButton: Locator;
  readonly carouselPreviousButton: Locator;
  readonly phonesCategoryButton: Locator;
  readonly laptopsCategoryButton: Locator;
  readonly monitorsCategoryButton: Locator;
  readonly previousButton: Locator;
  readonly nextButton: Locator;
  readonly usernameSignField: Locator;
  readonly passwordSignField: Locator;
  readonly closeButton: Locator;
  readonly signUpButton: Locator;
  readonly usernameLoginField: Locator;
  readonly passwordLoginField: Locator;
  readonly LogInButton: Locator;
  readonly closeIconButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.storeLogo = page.locator("[id='nava']");
    this.homeButton = page.locator('ul [class="nav-link"]', {
      hasText: "Home",
    });
    this.contactButton = page.locator('ul [class="nav-link"]', {
      hasText: "Contact",
    });
    this.aboutUsButton = page.locator('ul [class="nav-link"]', {
      hasText: "About us",
    });
    this.cartButton = page.locator('ul [class="nav-link"]', {
      hasText: "Cart",
    });
    this.loginButton = page.locator('ul [class="nav-link"]', {
      hasText: "Log in",
    });
    this.signUpButton = page.locator('ul [class="nav-link"]', {
      hasText: "Sign up",
    });
    this.carouselNextButton = page.locator("[id='carousel-control-next']");
    this.carouselPreviousButton = page.locator("[id='carousel-control-prev']");
    this.phonesCategoryButton = page.locator('a [class="list-group-item"]', {
      hasText: "Phones",
    });
    this.laptopsCategoryButton = page.locator('a [class="list-group-item"]', {
      hasText: "Laptops",
    });
    this.monitorsCategoryButton = page.locator('a [class="list-group-item"]', {
      hasText: "Monitors",
    });
    this.previousButton = page.locator("[id='prev']");
    this.nextButton = page.locator("[id='next']");
    this.usernameSignField = page.locator("[id='sign-username']");
    this.passwordSignField = page.locator("[id='sign-password']");
    this.closeButton = page.locator("[type='button']", { hasText: "Close" });
  }
}
