import { Navigate, Outlet } from '@tanstack/react-router';

import { Footer, Loading } from '@/common/components';
import { useUser } from '@/features/auth';

import { NavbarWrite } from '../components';

export const WriteLayout = () => {
  const { data: user } = useUser();

  if (user === undefined) return <Loading />;
  if (user === null) return <Navigate to="/" />;

  return (
    <div>
      <NavbarWrite />

      <div className="flex md:flex-row">
        <div className="w-0 grow md:mx-5">
          <Outlet />
        </div>
      </div>

      <Footer />
    </div>
  );
};
