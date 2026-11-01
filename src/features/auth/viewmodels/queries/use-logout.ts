import { useMutation, useQueryClient } from '@tanstack/react-query';

import { account } from '@/common/lib';

import { useAuthPrompt } from '../stores';

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => account.logout(),
    onSettled: () => {
      useAuthPrompt.getState().setRequiredConsents(undefined);
      queryClient.clear();
    },
  });
};
