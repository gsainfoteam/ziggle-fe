import { useQueryClient } from '@tanstack/react-query';

import { $api } from '@/common/lib';

import { invalidateNoticeQueries } from './invalidate-notice-queries';
import { ApiPaths } from '../../models';

export const useDeleteNotice = () => {
  const queryClient = useQueryClient();

  return $api.useMutation('delete', ApiPaths.NoticeController_deleteNotice, {
    onSuccess: () => invalidateNoticeQueries(queryClient),
  });
};
