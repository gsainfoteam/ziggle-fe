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
      <div className="ml-4 mt-6 hidden md:block">
        <Sidebar lng={lng} />
      </div>

      <div className="w-0 grow md:mx-5">{children}</div>
    </>
  );
}
