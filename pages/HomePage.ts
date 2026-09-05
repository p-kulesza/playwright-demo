import { Locator, Page } from '@playwright/test';
import { NavigationBar } from './components/NavigationBar';
import { ProductDetailsPage } from './ProductDetailsPage';

export class HomePage {
  readonly page: Page;
  readonly navigation: NavigationBar;
  readonly productCards: Locator;
  readonly categoryLinks: Locator;

  constructor(page: Page) {
    this.page = page;
    this.navigation = new NavigationBar(page);
    this.productCards = page.locator('#tbodyid .card-title');
    this.categoryLinks = page.locator('#itemc');
  }

  async goto(): Promise<void> {
    let lastError: unknown;

    for (let attempt = 1; attempt <= 3; attempt += 1) {
      try {
        await this.page.goto('/', { waitUntil: 'domcontentloaded', timeout: 15000 });
        return;
      } catch (error) {
        lastError = error;
      }
    }

    throw lastError;
  }

  async selectProduct(productName: string): Promise<ProductDetailsPage> {
    await this.productCards.filter({ hasText: productName }).click();
    return new ProductDetailsPage(this.page);
  }

  async selectCategory(categoryName: string): Promise<void> {
    await this.categoryLinks.filter({ hasText: categoryName }).click();
  }
}
