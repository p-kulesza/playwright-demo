export type GeneratedCredentials = {
  login: string;
  password: string;
};

function randomPart(length: number): string {
  return Math.random().toString(36).slice(2, 2 + length);
}

export function generateCredentials(): GeneratedCredentials {
  return {
    login: `user_${randomPart(8)}`,
    password: `P@ss_${randomPart(12)}`,
  };
}

export const credentials = generateCredentials();
export const login = credentials.login;
export const password = credentials.password;
