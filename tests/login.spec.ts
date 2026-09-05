import { expect, test } from './fixtures/test';
import { HomePage } from '../pages/HomePage';
import { LoginModal } from '../pages/components/LoginModal';
import { generateCredentials } from '../resources/credentials';
import { DemoblazeApi } from '../resources/api/DemoblazeApi';

async function openLoginModal(homePage: HomePage): Promise<LoginModal> {
  await homePage.navigation.openLogin();
  return new LoginModal(homePage.page);
}

test('Correct login', async ({ homePage }) => {
  const credentials = generateCredentials();
  const api = new DemoblazeApi();
  await api.createUser(credentials);

  const loginModal = await openLoginModal(homePage);
  const message = await loginModal.login(credentials.login, credentials.password);

  expect(message).toBeNull();
  await expect(homePage.navigation.loggedInUser).toHaveText(`Welcome ${credentials.login}`);
});

test('Login with empty fields', async ({ homePage }) => {
  const loginModal = await openLoginModal(homePage);
  const message = await loginModal.login('', '');

  expect(message).toBe('Please fill out Username and Password.');
});

test('Login with non-existing credentials', async ({ homePage }) => {
  const credentials = generateCredentials();
  const loginModal = await openLoginModal(homePage);
  const message = await loginModal.login(credentials.login, credentials.password);

  expect(message).toBe('User does not exist.');
});

test('Close login dialog', async ({ homePage }) => {
  const loginModal = await openLoginModal(homePage);

  await loginModal.close();

  await expect(loginModal.dialog).toBeHidden();
});
