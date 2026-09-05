import { Locator, Page } from '@playwright/test';

export class LoginModal {
  readonly page: Page;
  readonly dialog: Locator;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly closeButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.dialog = page.locator('#logInModal');
    this.usernameInput = this.dialog.locator('#loginusername');
    this.passwordInput = this.dialog.locator('#loginpassword');
    this.submitButton = this.dialog.getByRole('button', { name: 'Log in', exact: true });
    this.closeButton = this.dialog.locator('.modal-footer').getByRole('button', { name: 'Close', exact: true });
  }

  async login(username: string, password: string): Promise<string | null> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);

    const dialogPromise = this.page.waitForEvent('dialog').then(async (browserDialog) => {
      const message = browserDialog.message();
      await browserDialog.accept();
      return message;
    });
    const loginSuccessPromise = this.page.locator('#nameofuser')
      .waitFor({ state: 'visible' })
      .then(() => null);
    const resultPromise = Promise.race([dialogPromise, loginSuccessPromise]);
    const [, message] = await Promise.all([this.submitButton.click(), resultPromise]);
    return message;
  }

  async close(): Promise<void> {
    await this.closeButton.click();
  }
}
