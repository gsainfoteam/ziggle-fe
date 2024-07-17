import { createTranslation, PropsWithLng } from '@/app/i18next';

export default async function Layout({
  children,
  params: { lng },
}: {
  children: React.ReactNode;
  params: PropsWithLng;
}) {
  const { t } = await createTranslation(lng);

  return (
    <main className="flex flex-col items-center py-10">
      <div className="content flex max-w-[600px] flex-col">
        <h1 className="text-4xl font-bold">{t('createGroup.createGroup')}</h1>
        {children}
      </div>
    </main>
  );
}
