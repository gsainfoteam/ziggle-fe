import { PropsWithLng } from '@/app/i18next';

import ThirdParty from './thirdParty';

type Props = {
  params: PropsWithLng;
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function Home({ params: { lng }, searchParams }: Props) {
  const code = searchParams.code;
  return <ThirdParty code={code as string} lng={lng} />;
}
