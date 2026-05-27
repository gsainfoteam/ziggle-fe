import { useNavigate } from '@tanstack/react-router';

import { useTranslation } from 'react-i18next';
import { useAuthContext } from 'react-oauth2-code-pkce';
import { toast } from 'sonner';

import { $api } from '@/common/lib';

import { ApiPaths } from '../../models';
import { useAuthRedirect, useToken } from '../stores';

export const useLogin = ({
  showToast = false,
}: { showToast?: boolean } = {}) => {
  const { t } = useTranslation('auth');
  const { logOut: idpLogOut } = useAuthContext();
  const navigate = useNavigate();

  return $api.useMutation('post', ApiPaths.AuthController_login, {
    onSuccess: (response) => {
      const redirect = useAuthRedirect.getState().redirect ?? '/home';
      useToken.getState().saveToken(response.access_token);
      useAuthRedirect.getState().clearRedirect();
      navigate({ to: redirect });
    },
    onError: async (error) => {
      idpLogOut();
      navigate({ to: '/' });

      switch (error.statusCode) {
        case 401:
          if (showToast) {
            toast.error(t('errors.invalid_idp_token'));
          }
          break;
        default:
          if (showToast) {
            toast.error(t('errors.login_failed'));
          }
      }
    },
  });
};
