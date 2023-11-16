'use server';

import 'server-only';

import { cookies } from 'next/headers';

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
  user_uuid: string;
  user_email_id: string;
  user_name: string;
  user_phone_number: string;
  student_id: string;
}

export const auth = async () => {
  const store = cookies();
  const accessToken = store.get('access_token');
  if (!accessToken) return null;
  try {
    const user = await api.get<UserResponse>('/user/info', {
      headers: { Authorization: `Bearer ${accessToken.value}` },
    });
    return {
      id: user.data.user_uuid,
      email: user.data.user_email_id,
      name: user.data.user_name,
      phone: user.data.user_phone_number,
      studentId: user.data.student_id,
    };
  } catch {
    return null;
  }
};
