import type { QueryClient } from '@tanstack/react-query';

import { ApiPaths } from '../../models';

export const invalidateNoticeQueries = async (queryClient: QueryClient) => {
  await queryClient.invalidateQueries({
    queryKey: ['get', ApiPaths.NoticeController_getNoticeList],
  });
  await queryClient.invalidateQueries({
    queryKey: ['get', ApiPaths.NoticeController_getNotice],
  });
};
