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
  themeColor: '#ff4500',
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

        <div className="flex md:flex-row">
          <div className="ml-4 mt-6 hidden md:block">
            <Sidebar lng={lng} />
          </div>

          <div className="flex-grow">
            <main>{children}</main>
          </div>
        </div>
        <Footer t={t} />
      </div>
      <ToastContainer className="w-64" />
    </InitClient>
  );
}
