import { AuthOptions } from 'next-auth';
import { OAuthConfig } from 'next-auth/providers/oauth';

import api from '..';

export interface User {
  uuid: string;
  email: string;
  name: string;
  studentNumber: string;
}

export const authOptions: AuthOptions = {
  callbacks: {
    session: async ({ session, token }) => {
      if (token && session.user) {
        session.user.studentNumber = token.studentNumber;
      }
      return session;
    },
    jwt: async ({ token, user }) => {
      if (user) {
        token.studentNumber = user.studentNumber;
      }
      return token;
    },
    signIn: async ({ account }) => {
      await api.get<User>('/user/info', {
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
      checks: ['state'],
      client: { id_token_signed_response_alg: 'ES256' },
      profile: async (profile) => {
        return {
          id: profile.uuid,
          studentNumber: profile.studentId,
          email: profile.email,
          name: profile.name,
          uuid: profile.uuid,
        };
      },
    } as OAuthConfig<{
      uuid: string;
      email: string;
      name: string;
      studentId: string;
      phoneNumber: string;
    }>,
  ],
};
