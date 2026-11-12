import { createAccountMiddleware } from '@infoteam/account-react/openapi-fetch';
import createFetchClient from 'openapi-fetch';
import createQueryClient from 'openapi-react-query';

import type { paths } from '@/@types/api-schema';

import { account } from './account';

export const api = createFetchClient<paths>({
  baseUrl: import.meta.env.DEV ? '/api' : import.meta.env.VITE_API_BASE_URL,
  credentials: 'include',
});
api.use(createAccountMiddleware(account));

export const $api = createQueryClient(api);
