import { PropsWithLng } from '@/app/i18next';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
  params: PropsWithLng;
}) {
  return <div className="w-0 grow md:mx-5">{children}</div>;
}
