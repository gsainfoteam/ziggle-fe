import { useNavigate } from '@tanstack/react-router';

import { useTranslation } from 'react-i18next';
import { useAuthContext } from 'react-oauth2-code-pkce';
import { toast } from 'sonner';

import { $api } from '@/common/lib';

import { ApiPaths } from '../../models';
import { useAuthPrompt, useToken } from '../stores';

export const useLogin = ({
  showToast = false,
}: { showToast?: boolean } = {}) => {
  const { t } = useTranslation('auth');
  const { logOut: idpLogOut } = useAuthContext();
  const navigate = useNavigate();

  return $api.useMutation('post', ApiPaths.AuthController_login, {
    onSuccess: (response) => {
      useAuthPrompt.getState().setRequiredConsents(response.consent_required);
      if (response.consent_required) {
        navigate({ to: '/auth/consent' });
      }
      useToken.getState().saveToken(response.access_token);
    },
    onError: async (error) => {
      if (error?.statusCode === 401) {
        idpLogOut();
        navigate({ to: '/' });
        if (showToast) {
          toast.error(t('error.invalidIdpToken'));
        }
      } else {
        idpLogOut();
        navigate({ to: '/' });
        if (showToast) {
          toast.error(t('error.loginFailed'));
        }
      }
    },
  });
};
