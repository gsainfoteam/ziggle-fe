import '@/app/components/layout/initDayjs';
import '@/app/globals.css';

import type { Viewport } from 'next';
import { redirect } from 'next/navigation';

import { ziggleApi } from '@/api';
import { auth } from '@/api/auth/auth';
import Footer from '@/app/components/layout/Footer';
import InitClient from '@/app/components/layout/InitClient';
import Navbar from '@/app/components/layout/Navbar';
import { PropsWithLng } from '@/app/i18next';

interface UserInfo {
  uuid: string;
  email: string;
  name: string;
  studentNumber: string;
  consent: boolean;
}

export const viewport: Viewport = {
  themeColor: '#ff4500',
};

export default async function Layout({
  children,
  params: { lng },
}: {
  children: React.ReactNode;
  params: PropsWithLng;
}) {
  const session = await auth();
  const { data } = await ziggleApi.get<UserInfo>('/user/info');
  if (!session || !data.consent) {
    redirect(`/${lng}`);
  }
  return (
    <InitClient lng={lng}>
      <div>
        <Navbar lng={lng} />
        <div className="mb-96 flex">{children}</div>
        <Footer lng={lng} />
      </div>
    </InitClient>
  );
}
