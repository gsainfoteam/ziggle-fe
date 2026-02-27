import { $api } from '@/common/lib';

import { ApiPaths } from '../../models';
import { useToken } from '../stores';

export const useUser = () => {
  const { token } = useToken();

  return $api.useQuery(
    'get',
    ApiPaths.UserController_getUserInfo,
    {},
    { enabled: !!token },
  );
};
