import type { Viewport } from 'next';
import { ToastContainer } from 'react-toastify';

import { PropsWithLng } from '@/app/i18next';
import Footer from '@/app/components/layout/Footer';
import Navbar from '@/app/components/layout/Navbar';

import '@/app/initDayjs';
import { primary } from '../../const';
import InitClient from './InitClient';

import '@/app/globals.css';

export const viewport: Viewport = {
  themeColor: primary,
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
