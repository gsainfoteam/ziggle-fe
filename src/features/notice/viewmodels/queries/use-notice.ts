import { $api } from '@/common/lib';

import { ApiPaths } from '../../models';

export const useNotice = (id: number) => {
  return $api.useQuery('get', ApiPaths.NoticeController_getNotice, {
    params: { path: { id } },
  });
};
