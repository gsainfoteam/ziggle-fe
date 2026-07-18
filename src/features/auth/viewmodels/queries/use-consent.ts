import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';

import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

import { $api } from '@/common/lib';

import { ApiPaths } from '../../models';
import { useAuthPrompt } from '../stores';

export const useConsent = () => {
  const { t } = useTranslation('auth');
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = $api.useMutation(
    'post',
    ApiPaths.UserController_setConsent,
    {
      onSuccess: async () => {
        useAuthPrompt.getState().setRequiredConsents(undefined);
        await queryClient.invalidateQueries({
          queryKey: ['get', ApiPaths.UserController_getUserInfo],
        });
        await navigate({ to: '/' });
      },
      onError: () => {
        toast.error(t('errors.consent_failed'));
      },
    },
  );

  return mutation;
};
