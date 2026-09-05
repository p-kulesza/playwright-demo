import { Locator, Page } from '@playwright/test';

export class ProductDetailsPage {
  readonly page: Page;
  readonly productName: Locator;
  readonly price: Locator;
  readonly description: Locator;
  readonly addToCartButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productName = page.locator('#tbodyid .name');
    this.price = page.locator('#tbodyid .price-container');
    this.description = page.locator('#more-information');
    this.addToCartButton = page.getByRole('link', { name: 'Add to cart', exact: true });
  }

  async addToCart(): Promise<string> {
    const dialogPromise = this.page.waitForEvent('dialog').then(async (browserDialog) => {
      const message = browserDialog.message();
      await browserDialog.accept();
      return message;
    });
    const responsePromise = this.page.waitForResponse(
      (response) => response.url().includes('/addtocart') && response.request().method() === 'POST',
      { timeout: 15000 },
    ).then(async (response) => {
      if (!response.ok()) {
        throw new Error(`Could not add product to cart. API status: ${response.status()}`);
      }
      await response.finished();
      return 'Product added';
    });
    const resultPromise = Promise.race([dialogPromise, responsePromise]);
    const [, message] = await Promise.all([this.addToCartButton.click(), resultPromise]);
    return message;
  }
}
