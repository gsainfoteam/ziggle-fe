import { useQueryClient } from '@tanstack/react-query';

import { $api } from '@/common/lib';

import { invalidateNoticeQueries } from './invalidate-notice-queries';
import { ApiPaths } from '../../models';

export const useToggleBookmark = () => {
  const queryClient = useQueryClient();

  return $api.useMutation('patch', ApiPaths.NoticeController_updateBookmark, {
    onSuccess: () => invalidateNoticeQueries(queryClient),
  });
};
