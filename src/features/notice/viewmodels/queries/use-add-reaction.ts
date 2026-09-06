import { useQueryClient } from '@tanstack/react-query';

import { $api } from '@/common/lib';

import { invalidateNoticeQueries } from './invalidate-notice-queries';
import { ApiPaths } from '../../models';

export const useAddReaction = () => {
  const queryClient = useQueryClient();

  return $api.useMutation('post', ApiPaths.NoticeController_addReaction, {
    onSuccess: () => invalidateNoticeQueries(queryClient),
  });
};
