import { $api } from '@/common/lib';

import { ApiPaths } from '../../models';

export const useWithdraw = () => {
  return $api.useMutation('delete', ApiPaths.UserController_deleteUser);
};
