'use server';

import 'server-only';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import api from '..';

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

interface UserResponse {
  uuid: string;
  email: string;
  name: string;
  studentNumber: string;
}

export const auth = async () => {
  const cookieStore = cookies();
  const accessToken = cookieStore.get('access_token');
  if (!accessToken) return null;
  try {
    const { data: user } = await api.get<UserResponse>('/user/info', {
      headers: { Authorization: `Bearer ${accessToken.value}` },
    });
    return user;
  } catch (e) {
    return null;
  }
};

export const logout = async () => {
  const cookieStore = cookies();
  const accessToken = cookieStore.get('access_token');
  if (!accessToken) return;
  await api.post(
    '/user/logout',
    { access_token: accessToken.value },
    {
      headers: {
        Cookie: `refresh_token=${cookieStore.get('refresh_token')?.value}`,
      },
    },
  );
  cookieStore.delete('refresh_token');
  cookieStore.delete('access_token');
  redirect('/');
};

export const withdraw = async () => {
  redirect(process.env.NEXT_PUBLIC_IDP_BASE_URL!);
};
