import { redirect } from 'next/navigation';

import { PropsWithLng } from '@/app/i18next';

export default async function Home({
  params: { lng },
}: {
  params: PropsWithLng;
}) {
  redirect(`/${lng}/home`);
}
