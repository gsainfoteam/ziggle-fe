import { AuthOptions, DefaultSession } from 'next-auth';

import api from '..';

export interface User {
  uuid: string;
  email: string;
  name: string;
  studentNumber: string;
}

declare module 'next-auth' {
  interface Session {
    user: User & DefaultSession['user'];
  }
}

export const authOptions: AuthOptions = {
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
      checks: ['state'],
      client: { id_token_signed_response_alg: 'ES256' },
      profile: async (profile, token) => {
        const { data: user } = await api.get<User>('/user/info', {
          headers: { Authorization: `Bearer ${token.access_token}` },
        });
        return {
          id: user.uuid,
          ...user,
        };
      },
    },
  ],
};
