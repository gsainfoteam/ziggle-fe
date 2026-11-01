import { createAccountClient } from '@gsainfoteam/account-react';

const getRequiredEnv = (key: string): string => {
  const value = import.meta.env[key];
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
};

export const API_BASE_URL = import.meta.env.DEV
  ? '/api'
  : getRequiredEnv('VITE_API_BASE_URL');

// created at import time, before the router: on the IdP callback it rewrites the URL that the router reads when it is created
export const account = createAccountClient({
  issuer: getRequiredEnv('VITE_IDP_ISSUER'),
  clientId: getRequiredEnv('VITE_IDP_CLIENT_ID'),
  api: API_BASE_URL,
});
