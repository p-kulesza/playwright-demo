import { test } from '@playwright/test';
import { SignUpPage } from '../resources/methods/signUp/singUp.spec'
import { login, password } from '../resources/credentials';

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

test('Close sign up dialog with close button', async ({ page }) => {
  const signUpPage = new SignUpPage(page);
  await signUpPage.OpenSignUpDialog();
  await signUpPage.closeSignUpDialog();
});

test('Close sign up dialog with close icon', async ({ page }) => {
  const signUpPage = new SignUpPage(page);
  await signUpPage.OpenSignUpDialog();
  await signUpPage.closeSignUpDialogWithIcon();
});

test('Sign up with existing credentials', async ({ page }) => {
  const signUpPage = new SignUpPage(page);
  await signUpPage.OpenSignUpDialog();
  await signUpPage.inputUsernameSignUp("login");
  await signUpPage.inputPasswordSignUp("password");
  await signUpPage.applySignUp();
  await signUpPage.negativePopUpSignUp();
}); 

test('Sign up with special characters in username and password', async ({ page }) => {
  const signUpPage = new SignUpPage(page);
  await signUpPage.OpenSignUpDialog();
  await signUpPage.inputUsernameSignUp("!@#$%^&*()_+");
  await signUpPage.inputPasswordSignUp("!@#$%^&*()_+");
  await signUpPage.applySignUp();
  await signUpPage.positivePopUpSignUp();
});

test('Sign up with long username and password', async ({ page }) => {
  const signUpPage = new SignUpPage(page);
  await signUpPage.OpenSignUpDialog();
  const longUsername = 'a'.repeat(256);
  const longPassword = 'b'.repeat(256);
  await signUpPage.inputUsernameSignUp(longUsername);
  await signUpPage.inputPasswordSignUp(longPassword);
  await signUpPage.applySignUp();
  await signUpPage.positivePopUpSignUp();
});

test('Sign up with SQL injection in username and password', async ({ page }) => {
  const signUpPage = new SignUpPage(page);
  await signUpPage.OpenSignUpDialog();
  const sqlInjection = "' OR '1'='1";
  await signUpPage.inputUsernameSignUp(sqlInjection);
  await signUpPage.inputPasswordSignUp(sqlInjection);
  await signUpPage.applySignUp();
  await signUpPage.positivePopUpSignUp();
});

test('Sign up with XSS attack in username and password', async ({ page }) => {
  const signUpPage = new SignUpPage(page);
  await signUpPage.OpenSignUpDialog();
  const xssAttack = "<script>alert('XSS');</script>";
  await signUpPage.inputUsernameSignUp(xssAttack);
  await signUpPage.inputPasswordSignUp(xssAttack);
  await signUpPage.applySignUp();
  await signUpPage.positivePopUpSignUp();
});