import { useTranslation } from 'react-i18next';
import { useAuthContext } from 'react-oauth2-code-pkce';
import { toast } from 'sonner';

import { $api } from '@/common/lib';

import { ApiPaths } from '../../models';
import { useAuthPrompt, useToken } from '../stores';

export const useLogout = ({
  showToast = false,
}: { showToast?: boolean } = {}) => {
  const { t } = useTranslation('auth');
  const { logOut: idpLogOut } = useAuthContext();

  return $api.useMutation('post', ApiPaths.AuthController_logout, {
    onError: () => {
      if (showToast) {
        toast.error(t('error.logoutFailed'));
      }
    },
    onSettled: () => {
      useToken.getState().saveToken(null);
      useAuthPrompt.getState().setRecentLogout(true);
      useAuthPrompt.getState().setRequiredConsents(undefined);
      idpLogOut();
    },
  });
};
