import { Locator, Page } from '@playwright/test';

export class NavigationBar {
  readonly page: Page;
  readonly storeLogo: Locator;
  readonly homeLink: Locator;
  readonly contactLink: Locator;
  readonly aboutUsLink: Locator;
  readonly cartLink: Locator;
  readonly loginLink: Locator;
  readonly signUpLink: Locator;
  readonly loggedInUser: Locator;

  constructor(page: Page) {
    this.page = page;
    this.storeLogo = page.locator('#nava');
    this.homeLink = page.getByRole('link', { name: 'Home', exact: true });
    this.contactLink = page.getByRole('link', { name: 'Contact', exact: true });
    this.aboutUsLink = page.getByRole('link', { name: 'About us', exact: true });
    this.cartLink = page.getByRole('link', { name: 'Cart', exact: true });
    this.loginLink = page.getByRole('link', { name: 'Log in', exact: true });
    this.signUpLink = page.getByRole('link', { name: 'Sign up', exact: true });
    this.loggedInUser = page.locator('#nameofuser');
  }

  async openLogin(): Promise<void> {
    await this.loginLink.click();
  }

  async openSignUp(): Promise<void> {
    await this.signUpLink.click();
  }

  async openCart(): Promise<void> {
    await this.cartLink.click();
  }

  async goHome(): Promise<void> {
    await this.homeLink.click();
  }
}
