import api from '..';

export const getToken = (code: string) =>
  api
    .get<{ access_token: string }>('/user/login', {
      params: { code, type: 'local' },
    })
    .then(({ data, headers }) => {
      const refreshToken = headers['set-cookie']
        ?.find((cookie) => cookie.startsWith('refresh_token'))
        ?.split(';')[0]
        .split('=')[1]!;
      return { accessToken: data.access_token, refreshToken };
    });