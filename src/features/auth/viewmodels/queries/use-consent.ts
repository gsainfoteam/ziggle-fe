import { useNavigate } from '@tanstack/react-router';

import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

import { $api } from '@/common/lib';

import { ApiPaths } from '../../models';
import { useAuthPrompt, useToken } from '../stores';

export const useConsent = () => {
  const { t } = useTranslation('auth');
  const navigate = useNavigate();
  const pendingToken = useAuthPrompt((state) => state.pendingToken);

  const mutation = $api.useMutation('post', ApiPaths.UserController_setConsent, {
    onSuccess: () => {
      useToken.getState().saveToken(pendingToken);
      useAuthPrompt.getState().setPendingToken(null);
      useAuthPrompt.getState().setRequiredConsents(undefined);
      navigate({ to: '/' });
    },
    onError: () => {
      toast.error(t('errors.consent_failed'));
    },
  });

  const submitConsent = () => {
    if (!pendingToken) return;
    mutation.mutate({
      headers: { Authorization: `Bearer ${pendingToken}` },
    });
  };

  return { ...mutation, submitConsent };
};
