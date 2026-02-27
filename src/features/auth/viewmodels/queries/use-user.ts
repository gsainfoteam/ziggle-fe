import { $api } from '@/common/lib';

import { ApiPaths } from '../../models';
import { useToken } from '../stores';

export const useUser = () => {
  const { token } = useToken();

  const { data, ...rest } = $api.useQuery(
    'get',
    ApiPaths.UserController_getUserInfo,
    {},
    { enabled: !!token },
  );

  return {
    ...rest,
    data: token ? data : null,
  };
};
