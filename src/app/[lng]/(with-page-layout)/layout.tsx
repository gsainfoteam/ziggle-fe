import '@/app/components/layout/initDayjs';
import '@/app/globals.css';

import type { Viewport } from 'next';
import { ToastContainer } from 'react-toastify';

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
  return (
    <InitClient lng={lng}>
      <div>
        <Navbar lng={lng} />
        <div className="mb-96 flex">{children}</div>
        <Footer lng={lng} />
      </div>
      <ToastContainer className="w-64" />
    </InitClient>
  );
}
