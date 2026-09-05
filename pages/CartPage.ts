import { Locator, Page } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly placeOrderButton: Locator;
  readonly items: Locator;
  readonly totalPrice: Locator;

  constructor(page: Page) {
    this.page = page;
    this.placeOrderButton = page.getByRole('button', { name: 'Place Order', exact: true });
    this.items = page.locator('#tbodyid tr');
    this.totalPrice = page.locator('#totalp');
  }

  async goto(): Promise<void> {
    await this.page.goto('cart.html');
  }
}
