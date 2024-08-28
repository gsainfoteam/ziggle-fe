import axios from 'axios';

import { auth } from './auth/auth';

const ziggleApi = axios.create({ baseURL: '/api/bff' });
const vaporApi = axios.create({ baseURL: '/api/vapor-bff' });

ziggleApi.interceptors.request.use(async (config) => {
  if (typeof window !== 'undefined') return config;

  config.baseURL = process.env.NEXT_PUBLIC_API_BASE_URL!;
  const session = await auth();
  if (!session) return config;
  config.headers.Authorization = `Bearer ${session.accessToken}`;
  return config;
});

vaporApi.interceptors.request.use(async (config) => {
  if (typeof window !== 'undefined') return config;

  config.baseURL = process.env.NEXT_VAPOR_API_URL!;
  const session = await auth();
  if (!session) return config;
  config.headers.Authorization = `Bearer ${session.accessToken}`;
  return config;
});

export { vaporApi, ziggleApi };
