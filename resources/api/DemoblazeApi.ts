import { APIRequestContext, request } from '@playwright/test';
import { GeneratedCredentials } from '../credentials';

export class DemoblazeApi {
  async createUser(credentials: GeneratedCredentials): Promise<void> {
    const context = await request.newContext({
      baseURL: 'https://api.demoblaze.com',
      extraHTTPHeaders: { 'Content-Type': 'application/json' },
      ignoreHTTPSErrors: true,
    });

    try {
      const response = await context.post('/signup', {
        data: { username: credentials.login, password: encodePassword(credentials.password) },
      });

      if (!response.ok()) {
        throw new Error(`Could not create test user. API status: ${response.status()}`);
      }

      // Consume the response before disposing the context so the setup request is fully settled.
      await response.text();
    } finally {
      await context.dispose();
    }
  }
}

function encodePassword(password: string): string {
  return Buffer.from(password, 'utf8').toString('base64');
}
