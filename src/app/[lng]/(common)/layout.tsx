import '@/app/globals.css';
import '@/app/initDayjs';

import type { Viewport } from 'next';
import { ToastContainer } from 'react-toastify';

import Footer from '@/app/components/templates/Footer';
import Navbar from '@/app/components/templates/Navbar';
import Sidebar from '@/app/components/templates/Sidebar';
import { createTranslation, PropsWithLng } from '@/app/i18next';

import InitClient from './InitClient';

export const viewport: Viewport = {
  themeColor: '#eb6263',
};

export default async function Layout({
  children,
  params: { lng },
}: {
  children: React.ReactNode;
  params: PropsWithLng;
}) {
  const { t } = await createTranslation(lng);

  return (
    <InitClient lng={lng}>
      <div>
        <Navbar lng={lng} />

        <div className="flex flex-1 lg:flex-row">
          <Sidebar lng={lng} />

          <div className="flex-1 p-4">
            <main>{children}</main>
            <div className="basis-80" />
            <Footer t={t} />
            <ToastContainer className="w-64" />
          </div>
        </div>
      </div>
    </InitClient>
  );
}
