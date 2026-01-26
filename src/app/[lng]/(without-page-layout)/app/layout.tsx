import { redirect } from 'next/navigation';

import { ziggleApi } from '@/api';
import { auth } from '@/api/auth/auth';
import InitClient from '@/app/components/layout/InitClient';
import { PropsWithLng } from '@/app/i18next';

interface UserInfo {
  uuid: string;
  email: string;
  name: string;
  studentNumber: string;
  consent: boolean;
}

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
  const { data } = await ziggleApi.get<UserInfo>('/user/info');
  if (!data.consent) {
    redirect(`/${lng}`);
  }

  return (
    <InitClient emptyLayout lng={lng}>
      {children}
    </InitClient>
  );
}
