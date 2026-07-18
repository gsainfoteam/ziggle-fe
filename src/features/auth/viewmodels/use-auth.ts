import { useCallback, useEffect } from 'react';

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
  const { data: user, refetch } = useUser();
  const { t } = useTranslation('auth');
  const navigate = useNavigate();

  const logIn = useCallback(
    (...args: Parameters<typeof logInMutate>) => {
      if (!idpToken) {
        navigate({ to: '/' });
        if (showToast) {
          toast.error(t('errors.no_idp_token'));
        }
        return;
      }

      return logInMutate(...args);
    },
    [idpToken, navigate, showToast, t, logInMutate],
  );

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
