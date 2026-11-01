import { createAccountMiddleware } from '@gsainfoteam/account-react/openapi-fetch';
import createFetchClient from 'openapi-fetch';
import createQueryClient from 'openapi-react-query';

import type { paths } from '@/@types/api-schema';

import { account, API_BASE_URL } from './account';

export const api = createFetchClient<paths>({
  baseUrl: API_BASE_URL,
  credentials: 'include',
});
api.use(createAccountMiddleware(account));

export const $api = createQueryClient(api);
