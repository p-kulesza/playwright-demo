import { test } from '@playwright/test';
import { LogInPage } from '../resources/methods/logIn.spec' 
import { login, password } from '../resources/credentials';

test.beforeEach(async ({ page }) => {
  await page.goto('https://www.demoblaze.com');
});

test('Correct login', async ({ page }) => {
    const logInPage = new LogInPage(page);
    await logInPage.OpenLogInDialog();
    await logInPage.inputUsernameLogin(login);
    await logInPage.inputPasswordLogin(password);
    await logInPage.applyLogIn();
    await logInPage.positivePopUpLogIn();
});

test('Incorrect login with empty username', async ({ page }) => {
    const logInPage = new LogInPage(page);
    await logInPage.OpenLogInDialog();
    await logInPage.inputPasswordLogin(password);
    await logInPage.negativePopUpLogIn();
});

test('Incorrect login with empty password', async ({ page }) => {
    const logInPage = new LogInPage(page);
    await logInPage.OpenLogInDialog();
    await logInPage.inputUsernameLogin(login);
    await logInPage.negativePopUpLogIn();
});

test('Incorrect login with empty fields', async ({ page }) => {
    const logInPage = new LogInPage(page);
    await logInPage.OpenLogInDialog();
    await logInPage.negativePopUpLogIn();
});

test('Log in with non-existing credentials', async ({ page }) => {
    const logInPage = new LogInPage(page);
    await logInPage.OpenLogInDialog();
    await logInPage.inputUsernameLogin("login");
    await logInPage.inputPasswordLogin("password");
    await logInPage.applyLogIn();
    await logInPage.negativePopUpLogIn();
});

test('Log in with special characters in username and password', async ({ page }) => {
    const logInPage = new LogInPage(page);
    await logInPage.OpenLogInDialog();
    await logInPage.inputUsernameLogin("!@#$%^&*()_+");
    await logInPage.inputPasswordLogin("!@#$%^&*()_+");
    await logInPage.applyLogIn();
    await logInPage.negativePopUpLogIn();
});

test('Log in with SQL injection in username and password', async ({ page }) => {
    const logInPage = new LogInPage(page);
    await logInPage.OpenLogInDialog();
    await logInPage.inputUsernameLogin("' OR '1'='1");
    await logInPage.inputPasswordLogin("' OR '1'='1");
    await logInPage.applyLogIn();
    await logInPage.negativePopUpLogIn();
});

test('Log in with long username and password', async ({ page }) => {
    const logInPage = new LogInPage(page);
    await logInPage.OpenLogInDialog();
    const longUsername = 'a'.repeat(256);
    const longPassword = 'b'.repeat(256);
    await logInPage.inputUsernameLogin(longUsername);
    await logInPage.inputPasswordLogin(longPassword);
    await logInPage.applyLogIn();
    await logInPage.negativePopUpLogIn();
});