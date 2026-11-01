import { useEffect, useMemo } from 'react';

import { useAccount } from '@gsainfoteam/account-react';

import { $api } from '@/common/lib';

import { ApiPaths, type User } from '../../models';
import { useAuthPrompt } from '../stores';

export const useUser = () => {
  const { status } = useAccount();
  const setRequiredConsents = useAuthPrompt((s) => s.setRequiredConsents);

  const { data, error, isLoading, ...rest } = $api.useQuery(
    'get',
    ApiPaths.UserController_getUserInfo,
    {},
    { enabled: status === 'authenticated', retry: false },
  );

  useEffect(() => {
    if (data) {
      setRequiredConsents(data.consent ? undefined : true);
      return;
    }
    if (error?.statusCode === 403) setRequiredConsents(true);
  }, [data, error, setRequiredConsents]);

  const user = useMemo<User | null | undefined>(() => {
    if (status === 'loading') return undefined;
    if (status === 'unauthenticated') return null;
    if (isLoading) return undefined;
    if (error) return null;
    return data ?? null;
  }, [data, error, isLoading, status]);

  return {
    ...rest,
    isLoading,
    error,
    data: user,
  };
};
