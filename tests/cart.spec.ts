import { expect, test } from './fixtures/test';
import { CartPage } from '../pages/CartPage';

test('Add product to cart', async ({ homePage }) => {
  const productDetailsPage = await homePage.selectProduct('Samsung galaxy s6');
  const message = await productDetailsPage.addToCart();

  expect(message).toBe('Product added');

  await homePage.navigation.openCart();
  const cartPage = new CartPage(homePage.page);
  await expect(cartPage.placeOrderButton).toBeVisible();
});
