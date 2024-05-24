'use client';

import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const LoginPage = async () => {
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    if (status === 'unauthenticated') {
      void signIn('idp');
    } else if (status === 'authenticated') {
      void router.push('/');
    }
  }, [status]);

  return <div></div>; // 또는 로딩 스피너 (jwt 존재 여부만 확인해서 얼마 안 걸릴것 같긴한데...)
};

export default LoginPage;
