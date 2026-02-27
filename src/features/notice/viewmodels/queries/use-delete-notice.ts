import { $api } from '@/common/lib';

import { ApiPaths } from '../../models';

export const useDeleteNotice = () => {
  return $api.useMutation('delete', ApiPaths.NoticeController_deleteNotice);
};
