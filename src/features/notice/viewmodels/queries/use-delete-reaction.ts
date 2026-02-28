import { $api } from '@/common/lib';

import { ApiPaths } from '../../models';

export const useDeleteReaction = () => {
  return $api.useMutation('delete', ApiPaths.NoticeController_deleteReaction);
};
