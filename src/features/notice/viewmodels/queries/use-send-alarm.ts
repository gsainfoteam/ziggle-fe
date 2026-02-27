import { $api } from '@/common/lib';

import { ApiPaths } from '../../models';

export const useSendAlarm = () => {
  return $api.useMutation('post', ApiPaths.NoticeController_sendNotice);
};
