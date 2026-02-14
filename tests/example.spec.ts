import { test } from '@playwright/test';
import { SignUpPage } from '../resources/methods/signUp/singUp.spec'
import { login, password } from '../resources/methods/credentials';

test.beforeEach(async ({ page }) => {
  await page.goto('https://www.demoblaze.com');
});

test('Correct login', async ({ page }) => {
  const signUpPage = new SignUpPage(page);
  await signUpPage.OpenSignUpDialog();
  await signUpPage.inputUsernameSignUp(login);
  await signUpPage.inputPasswordSignUp(password);
  await signUpPage.applySignUp();
  await signUpPage.positivePopUpSignUp();
});

test('Incorrect login with empty username', async ({ page }) => {
  const signUpPage = new SignUpPage(page);
  await signUpPage.OpenSignUpDialog();
  await signUpPage.inputPasswordSignUp(password);
  await signUpPage.negativePopUpSignUp();
});

test('Incorrect login with empty password', async ({ page }) => {
  const signUpPage = new SignUpPage(page);
  await signUpPage.OpenSignUpDialog();
  await signUpPage.inputUsernameSignUp(login);
  await signUpPage.negativePopUpSignUp();
});

test('Incorrect login with empty fields', async ({ page }) => {
  const signUpPage = new SignUpPage(page);
  await signUpPage.OpenSignUpDialog();
  await signUpPage.negativePopUpSignUp();
});
