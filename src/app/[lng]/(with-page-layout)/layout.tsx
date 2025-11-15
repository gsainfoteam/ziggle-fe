import '@/app/components/layout/initDayjs';
import '@/app/globals.css';

import type { Viewport } from 'next';
import { redirect } from 'next/navigation';

import { auth } from '@/api/auth/auth';
import Footer from '@/app/components/layout/Footer';
import InitClient from '@/app/components/layout/InitClient';
import Navbar from '@/app/components/layout/Navbar';
import { PropsWithLng } from '@/app/i18next';

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
  if (!session) {
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
