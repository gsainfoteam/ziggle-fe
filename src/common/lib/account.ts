import { createAccountClient } from '@infoteam/account-react';

// shortcut: drops what the previous login left in the browser; remove once those sessions have expired.
for (const key of Object.keys(localStorage)) {
  if (key === 'token' || key.startsWith('ROCP_')) localStorage.removeItem(key);
}

export const account = createAccountClient({
  issuer: import.meta.env.VITE_IDP_ISSUER,
  clientId: import.meta.env.VITE_IDP_CLIENT_ID,
  redirectUri: import.meta.env.VITE_IDP_REDIRECT_URI,
  api: import.meta.env.DEV ? '/api' : import.meta.env.VITE_API_BASE_URL,
});
