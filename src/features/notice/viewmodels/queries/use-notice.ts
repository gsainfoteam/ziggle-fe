import { api } from '@/common/lib';

import { ApiPaths } from '../../models';

export const getNotice = (id: number) => {
  return api.GET(ApiPaths.NoticeController_getNotice, {
    params: { path: { id } },
  });
};
