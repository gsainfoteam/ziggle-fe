import axios from 'axios';

import { auth } from './auth/auth';

const ziggleApi = axios.create({ baseURL: '/api/bff' }); 
//axios는 토큰 만들어둔거 갖다 쓰는거. fetch쓰면 일일이 method, headers등등 써줘야 하니까 axios로 만들어둔거 쓰기.
//src/api/bff에서 경로 설정해둠.
ziggleApi.interceptors.request.use(async (config) => { //axios interceptors는 response가로채서 토큰 넣기. 
  if (typeof window !== 'undefined') return config;

  config.baseURL = process.env.NEXT_PUBLIC_API_BASE_URL!;
  const session = await auth();
  if (!session) return config;
  config.headers.Authorization = `Bearer ${session.accessToken}`;

  return config;
});

export { ziggleApi };
