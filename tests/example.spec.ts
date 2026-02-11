import { test, expect } from '@playwright/test';
import { SignUpPage } from '../resources/methods/signUp/singUp.spec'

test.beforeEach(async ({ page }) => {
  await page.goto('https://www.demoblaze.com');
});

test('Login to DemoBlaze', async ({ page }) => {
  const signUpPage = new SignUpPage(page);
  await signUpPage.OpenSignUpDialog();
  await signUpPage.signUpFully('testuser', 'testpassword');
  await signUpPage.successfulCommentSignUpDialog();
});

test('Login to DemoBlaze with empty username', async ({ page }) => {
  const signUpPage = new SignUpPage(page);
  await signUpPage.OpenSignUpDialog();
  await signUpPage.signUpWithEmptyUsername('testpassword');
  await signUpPage.validationCommentSignUpDialog();
});
