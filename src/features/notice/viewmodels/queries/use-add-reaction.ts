import { $api } from '@/common/lib';

import { ApiPaths } from '../../models';

export const useAddReaction = () => {
  return $api.useMutation('post', ApiPaths.NoticeController_addReaction);
};
