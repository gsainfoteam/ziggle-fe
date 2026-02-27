import { useEffect, useState } from 'react';

import { Navigate, Outlet, useSearch } from '@tanstack/react-router';

import { Loading } from '@/common/components';

import { useAuth, useAuthRedirect } from '../../viewmodels';

function Redirect() {
  const { redirect: redirectSearch } = useSearch({ from: '/_auth' });
  const redirectCache = useAuthRedirect((state) => state.redirect);
  const [redirect] = useState(redirectSearch ?? redirectCache ?? '/home');

  useEffect(() => {
    useAuthRedirect.getState().clearRedirect();
  }, []);

  return <Navigate to={redirect} />;
}

export function AuthLayout() {
  const { user } = useAuth();

  if (user === undefined) return <Loading />;
  if (user !== null) return <Redirect />;
  return <Outlet />;
}
