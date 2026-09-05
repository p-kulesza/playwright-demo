import { Locator, Page } from '@playwright/test';

export class SignupModal {
  readonly page: Page;
  readonly dialog: Locator;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly closeButton: Locator;
  readonly closeIcon: Locator;

  constructor(page: Page) {
    this.page = page;
    this.dialog = page.locator('#signInModal');
    this.usernameInput = this.dialog.locator('#sign-username');
    this.passwordInput = this.dialog.locator('#sign-password');
    this.submitButton = this.dialog.getByRole('button', { name: 'Sign up', exact: true });
    this.closeButton = this.dialog.locator('.modal-footer').getByRole('button', { name: 'Close', exact: true });
    this.closeIcon = this.dialog.locator('.modal-header button.close');
  }

  async signUp(username: string, password: string): Promise<string> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);

    const dialogPromise = this.page.waitForEvent('dialog').then(async (browserDialog) => {
      const message = browserDialog.message();
      await browserDialog.accept();
      return message;
    });
    const [, message] = await Promise.all([this.submitButton.click(), dialogPromise]);
    return message;
  }

  async close(): Promise<void> {
    await this.closeButton.click();
  }

  async closeWithIcon(): Promise<void> {
    await this.closeIcon.click();
  }
}
