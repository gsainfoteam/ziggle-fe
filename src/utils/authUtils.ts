import { AuthOptions, getServerSession } from 'next-auth';

export const authOptions: AuthOptions = {
  providers: [
    {
      id: 'idp',
      name: 'GIST IDP', // 이름은 바꾸셔도 됩니다 (어차피 보이는 이름은 아님)
      type: 'oauth',
      clientId: process.env.NEXT_PUBLIC_IDP_CLIENT_ID!,
      clientSecret: process.env.NEXT_PUBLIC_IDP_CLIENT_SECRET!, //TODO : 이거 어떻게 하죠?
      wellKnown:
        'https://api.stg.idp.gistory.me/.well-known/openid-configuration',
      authorization: {
        params: { scope: 'openid profile email student_id offline_access' },
      },
      idToken: true,
      checks: ['state'],
      client: {
        id_token_signed_response_alg: 'ES256',
        redirect_uri: process.env.NEXT_PUBLIC_IDP_REDIRECT_URI!,
      },
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
        };
      },

      // TODO : response_type=code, promt=consent가 원래 코드엔 있었는데 뭔지 모르겠어요ㅠㅠ
    },
  ],
};

// 나중에 쓸 수도 있을 것 같아서 남겨둡니다.
export const getServerAuthSession = () => {
  return getServerSession(authOptions);
};
