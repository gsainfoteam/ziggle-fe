import { getServerSession, NextAuthOptions } from 'next-auth';
import { JWT } from 'next-auth/jwt';

import { ziggleApi } from '..';

export const auth = async () => {
  return getServerSession(config);
};

export interface User {
  uuid: string;
  email: string;
  name: string;
  studentNumber: string;
}

export const config = {
  callbacks: {
    session: async ({ session, token }) => {
      if (token && session.user) {
        session.user.studentNumber = token.studentNumber;
        session.user.uuid = token.uuid;
        session.accessToken = token.accessToken;
      }
      return session;
    },
    jwt: async ({ token, user, account }) => {
      if (user) {
        token.studentNumber = user.studentNumber;
        token.uuid = user.uuid;
      }
      if (account) {
        token.accessToken = account.access_token!;
        token.accessTokenExpires = account.expires_at! * 1000;
        token.refreshToken = account.refresh_token!;
      }

      if (Date.now() < token.accessTokenExpires) {
        return token;
      }
      return refreshAccessToken(token);
    },
    signIn: async ({ account }) => {
      await ziggleApi.get<User>('/user/info', {
        headers: { Authorization: `Bearer ${account?.access_token}` },
      });
      return true;
    },
  },
  session: {
    strategy: 'jwt',
  },
  providers: [
    {
      id: 'idp',
      name: 'GSA Infoteam',
      type: 'oauth',
      clientId: process.env.NEXT_PUBLIC_IDP_CLIENT_ID!,
      clientSecret: process.env.IDP_CLIENT_SECRET,
      wellKnown: 'https://api.idp.gistory.me/.well-known/openid-configuration',
      authorization: {
        params: {
          scope: 'openid profile email student_id offline_access',
          prompt: 'consent',
        },
      },
      idToken: true,
      checks: ['state', 'pkce', 'nonce'],
      client: { id_token_signed_response_alg: 'ES256' },
      profile: async (profile: {
        sub: string;
        aud: string;
        nonce: string;
        scope: string;
        name: string;
        email: string;
        student_id: string;
        iss: string;
      }) => {
        return {
          id: profile.sub,
          studentNumber: profile.student_id,
          email: profile.email,
          name: profile.name,
          uuid: profile.sub,
        };
      },
    },
  ],
} satisfies NextAuthOptions;

const refreshAccessToken = async (token: JWT) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}user/refresh`,
    {
      method: 'POST',
      headers: { Cookie: `refresh_token=${token.refreshToken}` },
    },
  );
  const data = await response.json();
  if (!response.ok) throw data;
  return {
    ...token,
    accessToken: data.access_token,
    accessTokenExpires: Date.now() + data.expires_in * 1000,
    refreshToken: data.refresh_token,
  };
};
