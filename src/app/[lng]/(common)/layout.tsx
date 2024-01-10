import '@/app/globals.css';
import '@/app/initDayjs';

import { ToastContainer } from 'react-toastify';

import Footer from '@/app/components/templates/Footer';
import Navbar from '@/app/components/templates/Navbar';
import { createTranslation, PropsWithLng } from '@/app/i18next';

import InitClient from './InitClient';

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
      <Navbar lng={lng} />
      <main className="flex-1">{children}</main>
      <div className="basis-80" />
      <Footer t={t} />
      <ToastContainer className="w-64" />
    </InitClient>
  );
}
