import { PropsWithLng } from '@/app/i18next';
import InitClient from '@/app/components/layout/InitClient';

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
