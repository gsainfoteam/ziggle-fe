import '@/app/components/layout/initDayjs';
import '@/app/globals.css';

import type { Viewport } from 'next';
import { ToastContainer } from 'react-toastify';

import Footer from '@/app/components/layout/Footer';
import InitClient from '@/app/components/layout/InitClient';
import NavbarWrite from '@/app/components/layout/NavbarWrite';
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
        <NavbarWrite lng={lng} />

        <div className="flex md:flex-row">
          <div className="w-0 grow md:mx-5">{children}</div>
        </div>

        <Footer lng={lng} />
      </div>
      <ToastContainer className="w-64" />
    </InitClient>
  );
}
