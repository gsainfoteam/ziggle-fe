import { useEffect } from 'react';

import { $api } from '@/common/lib';

import { ApiPaths } from '../../models';
import { useAuthPrompt, useToken } from '../stores';

export const useUser = () => {
  const { token } = useToken();
  const setRequiredConsents = useAuthPrompt((s) => s.setRequiredConsents);

  const { data, error, ...rest } = $api.useQuery(
    'get',
    ApiPaths.UserController_getUserInfo,
    {},
    { enabled: !!token, retry: false },
  );

  useEffect(() => {
    if (error != null) {
      setRequiredConsents(true);
    }
  }, [error, setRequiredConsents]);

  return {
    ...rest,
    error,
    data: token ? (data ?? null) : null,
  };
};
