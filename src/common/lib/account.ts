import { createAccountClient } from '@infoteam/account-react';

export const account = createAccountClient({
  issuer: import.meta.env.VITE_IDP_ISSUER,
  clientId: import.meta.env.VITE_IDP_CLIENT_ID,
  redirectUri: import.meta.env.VITE_IDP_REDIRECT_URI,
  api: import.meta.env.DEV ? '/api' : import.meta.env.VITE_API_BASE_URL,
});
