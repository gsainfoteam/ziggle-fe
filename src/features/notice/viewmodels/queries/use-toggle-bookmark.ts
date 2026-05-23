import { $api } from '@/common/lib';

import { ApiPaths } from '../../models';

export const useToggleBookmark = () => {
  return $api.useMutation('patch', ApiPaths.NoticeController_updateBookmark);
};
