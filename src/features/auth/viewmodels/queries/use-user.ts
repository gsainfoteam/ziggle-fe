import { useEffect, useMemo } from 'react';

import { $api } from '@/common/lib';

import { ApiPaths } from '../../models';
import { useAuthPrompt, useToken } from '../stores';

const CONSENT_REQUIRED_MESSAGE = 'Consent required';

const needsConsent = (
  error: { statusCode?: number; message?: string } | null | undefined,
) => error?.statusCode === 403 || error?.message === CONSENT_REQUIRED_MESSAGE;

export const useUser = () => {
  const { token } = useToken();
  const setRequiredConsents = useAuthPrompt((s) => s.setRequiredConsents);

  const { data, error, isLoading, ...rest } = $api.useQuery(
    'get',
    ApiPaths.UserController_getUserInfo,
    {},
    { enabled: !!token, retry: false },
  );

  useEffect(() => {
    if (data) {
      setRequiredConsents(data.consent ? undefined : true);
      return;
    }
    if (needsConsent(error)) setRequiredConsents(true);
  }, [data, error, setRequiredConsents]);

  const user = useMemo(() => {
    if (!token) return null;
    if (isLoading) return undefined;
    if (error) return null;
    return data ?? null;
  }, [data, error, isLoading, token]);

  return {
    ...rest,
    isLoading,
    error,
    data: user,
  };
};
