import { useCallback, useEffect, useMemo } from 'react';

import { useNavigate } from '@tanstack/react-router';

import { useTranslation } from 'react-i18next';
import { useAuthContext } from 'react-oauth2-code-pkce';
import { toast } from 'sonner';

import { useLogin, useLogout, useUser } from './queries';
import { useToken } from './stores';

export const useAuth = ({
  showToast = false,
}: { showToast?: boolean } = {}) => {
  const {
    token: idpToken,
    logIn: idpLogIn,
    logOut: idpLogOut,
  } = useAuthContext();
  const { mutate: logInMutate, ...logInMutation } = useLogin({ showToast });
  const { mutate: logOut, ...logOutMutation } = useLogout({ showToast });
  const { token } = useToken();
  const { data, isLoading, error, refetch } = useUser();
  const { t } = useTranslation('auth');
  const navigate = useNavigate();

  const logIn = useCallback(
    (...args: Parameters<typeof logInMutate>) => {
      if (!idpToken) {
        navigate({ to: '/' });
        if (showToast) {
          toast.error(t('error.noIdpToken'));
        }
        return;
      }

      return logInMutate(...args);
    },
    [idpToken, navigate, showToast, t, logInMutate],
  );

  const user = useMemo(() => {
    if (!token) return null;
    if (isLoading) return undefined;
    if (error) return null;
    return data;
  }, [data, error, isLoading, token]);

  useEffect(() => {
    if (token) {
      refetch();
    }
  }, [refetch, token]);

  return {
    user,
    refetch,
    idpLogIn,
    idpLogOut,
    logIn,
    logOut,
    logInMutation,
    logOutMutation,
  };
};
