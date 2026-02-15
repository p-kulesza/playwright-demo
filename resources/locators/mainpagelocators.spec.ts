import { Page, Locator } from "@playwright/test";

export class MainPageLocators {
  readonly page: Page;
  readonly carouselNextButton: Locator;
  readonly carouselPreviousButton: Locator;
  readonly phonesCategoryButton: Locator;
  readonly laptopsCategoryButton: Locator;
  readonly monitorsCategoryButton: Locator;
  readonly previousButton: Locator;
  readonly nextButton: Locator;
  readonly usernameSignField: Locator;
  readonly passwordSignField: Locator;
  readonly closeDialogButton: Locator;
  readonly signUpDialogButton: Locator;
  readonly usernameLoginField: Locator;
  readonly passwordLoginField: Locator;
  readonly LogInButton: Locator;
  readonly closeIconButton: Locator;
  readonly productName: Locator;
  readonly productCategory: Locator;

  constructor(page: Page) {
    this.page = page;
    this.carouselNextButton = page.locator("[id='carousel-control-next']");
    this.carouselPreviousButton = page.locator("[id='carousel-control-prev']");
    this.phonesCategoryButton = page.locator('a [class="list-group-item"]', {hasText: "Phones",});
    this.laptopsCategoryButton = page.locator('a [class="list-group-item"]', {hasText: "Laptops",});
    this.monitorsCategoryButton = page.locator('a [class="list-group-item"]', {hasText: "Monitors",});
    this.previousButton = page.locator("[id='prev']");
    this.nextButton = page.locator("[id='next']");
    this.usernameSignField = page.locator("[id='sign-username']");
    this.passwordSignField = page.locator("[id='sign-password']");
    this.closeDialogButton = page.locator("[type='button']", { hasText: "Close" }).nth(1);
    this.signUpDialogButton = page.locator("[onclick='register()']", { hasText: "Sign up" });
    this.usernameLoginField = page.locator("[id='loginusername']");
    this.passwordLoginField = page.locator("[id='loginpassword']");
    this.LogInButton = page.locator("[type='button']", { hasText: "Log in" });
    this.closeIconButton = page.locator("[class='modal-header'] [class='close']").nth(1);
    this.productName = page.locator("[class='card-title']");
    this.productCategory = page.locator('[class="list-group"]');
  }
}
