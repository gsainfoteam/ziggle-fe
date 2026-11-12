import { Navigate, Outlet, useSearch } from '@tanstack/react-router';

import { Loading } from '@/common/components';

import { useUser } from '../../viewmodels';

function Redirect() {
  const { redirect } = useSearch({ from: '/_auth' });

  return <Navigate to={redirect ?? '/home'} />;
}

export function AuthLayout() {
  const { data: user } = useUser();

  if (user === undefined) return <Loading />;
  if (user !== null) return <Redirect />;
  return <Outlet />;
}
