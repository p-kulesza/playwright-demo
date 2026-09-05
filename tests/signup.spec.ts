import { expect, test } from './fixtures/test';
import { HomePage } from '../pages/HomePage';
import { SignupModal } from '../pages/components/SignupModal';
import { generateCredentials } from '../resources/credentials';
import { DemoblazeApi } from '../resources/api/DemoblazeApi';

async function openSignupModal(homePage: HomePage): Promise<SignupModal> {
  await homePage.navigation.openSignUp();
  return new SignupModal(homePage.page);
}

test('Correct signup', async ({ homePage }) => {
  const credentials = generateCredentials();
  const signupModal = await openSignupModal(homePage);
  const message = await signupModal.signUp(credentials.login, credentials.password);

  expect(message).toBe('Sign up successful.');
});

test('Close signup dialog with close button', async ({ homePage }) => {
  const signupModal = await openSignupModal(homePage);

  await signupModal.close();

  await expect(signupModal.dialog).toBeHidden();
});

test('Close signup dialog with close icon', async ({ homePage }) => {
  const signupModal = await openSignupModal(homePage);

  await signupModal.closeWithIcon();

  await expect(signupModal.dialog).toBeHidden();
});

test('Signup with existing credentials', async ({ homePage }) => {
  const credentials = generateCredentials();
  const api = new DemoblazeApi();
  await api.createUser(credentials);

  const signupModal = await openSignupModal(homePage);
  const message = await signupModal.signUp(credentials.login, credentials.password);

  expect(message).toBe('This user already exist.');
});
