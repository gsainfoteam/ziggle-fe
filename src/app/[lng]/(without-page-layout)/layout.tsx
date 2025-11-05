import { auth } from '@/api/auth/auth';
import InitClient from '@/app/components/layout/InitClient';
import { PropsWithLng } from '@/app/i18next';

export default async function Layout({
  children,
  params: { lng },
}: {
  children: React.ReactNode;
  params: PropsWithLng;
}) {
  return (
    <InitClient emptyLayout lng={lng}>
      {children}
    </InitClient>
  );
}
