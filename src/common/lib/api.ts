import createFetchClient from 'openapi-fetch';
import createQueryClient from 'openapi-react-query';

import { ApiPaths } from '@/@types/api-schema';
import type { paths } from '@/@types/api-schema';
import { useToken } from '@/features/auth';

import type { MaybeOptionalInit, Middleware } from 'openapi-fetch';

let refreshPromise: ReturnType<
  typeof api.POST<
    ApiPaths.AuthController_refreshToken,
    MaybeOptionalInit<paths[ApiPaths.AuthController_refreshToken], 'post'>
  >
> | null = null;

const middleware: Middleware = {
  async onRequest({ request }) {
    const token = useToken.getState().token;
    if (token) {
      request.headers.set('Authorization', `Bearer ${token}`);
    }

    return request;
  },
  async onResponse({ request, response, options }) {
    if (response.status == 401) {
      if (
        request.headers.has('x-retry') ||
        request.url.includes(ApiPaths.AuthController_refreshToken)
      ) {
        return response;
      }

      if (!refreshPromise) {
        refreshPromise = api
          .POST(ApiPaths.AuthController_refreshToken)
          .finally(() => (refreshPromise = null));
      }

      const { data } = await refreshPromise;

      if (data) {
        const newToken = data.access_token;
        useToken.getState().saveToken(newToken);

        const retryRequest = new Request(request, {
          headers: new Headers([
            ...Array.from(request.headers.entries()),
            ['Authorization', `Bearer ${newToken}`],
            ['x-retry', 'true'],
          ]),
        });

        return options.fetch(retryRequest);
      } else {
        useToken.getState().saveToken(null);
      }
    }
  },
};

export const api = createFetchClient<paths>({
  baseUrl: import.meta.env.DEV ? '/api' : import.meta.env.VITE_API_BASE_URL,
  credentials: 'include',
});
api.use(middleware);

export const $api = createQueryClient(api);
