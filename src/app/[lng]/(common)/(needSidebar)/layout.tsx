import Sidebar from '@/app/components/templates/Sidebar';
import { createTranslation, PropsWithLng } from '@/app/i18next';

export default async function Layout({
  children,
  params: { lng },
}: {
  children: React.ReactNode;
  params: PropsWithLng;
}) {
  return (
    <>
      <div className="ml-4 mt-6 hidden md:block">
        <Sidebar lng={lng} />
      </div>

      <div className="w-0 grow md:mx-5">{children}</div>
    </>
  );
}
