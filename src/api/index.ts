import axios from 'axios';

import { auth } from './auth/auth';

const api = axios.create({ baseURL: '/api/bff' });

api.interceptors.request.use(async (config) => {
  if (typeof window !== 'undefined') return config;

  config.baseURL = process.env.NEXT_PUBLIC_API_BASE_URL!;
  const session = await auth();
  if (!session) return config;
  config.headers.Authorization = `Bearer ${session.accessToken}`;
  return config;
});

export default api;
