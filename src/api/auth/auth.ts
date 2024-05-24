'use server';

import 'server-only';

import { getServerSession } from 'next-auth';

import api from '..';
import { authOptions } from './config';

export const getToken = (code: string) =>
  api
    .get<{ access_token: string }>('/user/login', {
      params: {
        code,
        ...(process.env.NODE_ENV === 'development' && { type: 'local' }),
      },
    })
    .then(({ data, headers }) => {
      const refreshToken = headers['set-cookie']
        ?.find((cookie) => cookie.startsWith('refresh_token'))
        ?.split(';')[0]
        .split('=')[1]!;
      return { accessToken: data.access_token, refreshToken };
    });

export const auth = async () => {
  return getServerSession(authOptions);
};
