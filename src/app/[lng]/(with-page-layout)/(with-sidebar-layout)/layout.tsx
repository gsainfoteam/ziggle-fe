import Sidebar from '@/app/components/layout/Sidebar';
import { PropsWithLng } from '@/app/i18next';

interface LayoutProps {
  children: React.ReactNode;
  params: PropsWithLng;
}

export default async function Layout({
  children,
  params: { lng },
}: LayoutProps) {
  return (
    <>
      <div className="sticky top-20 my-6 ml-4 hidden h-fit self-start md:block">
        <Sidebar lng={lng} />
      </div>

      <div className="w-0 grow md:mx-5">{children}</div>
    </>
  );
}
