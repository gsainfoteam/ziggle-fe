import { createTranslation, PropsWithLng } from '@/app/i18next';

export default async function Layout({
  children,
  params: { lng },
}: {
  children: React.ReactNode;
  params: PropsWithLng;
}) {
  const { t } = await createTranslation(lng);

  return <div className="w-0 grow md:mx-5">{children}</div>;
}
