import { $api } from '@/common/lib';

import { ApiPaths } from '../../models';

export const useRefresh = () => {
  return $api.useMutation('post', ApiPaths.AuthController_refreshToken);
};
