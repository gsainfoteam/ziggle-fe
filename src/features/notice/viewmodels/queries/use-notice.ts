import { useTranslation } from 'react-i18next';

import { $api, api } from '@/common/lib';

import { ApiPaths } from '../../models';
import { useUser } from '@/features/auth';


export const useNotice = (id: number) => {
  const { data: user } = useUser();
  const { i18n } = useTranslation();
  const queryResult = $api.useQuery(
    'get',
    ApiPaths.NoticeController_getNotice,
    {
      params: { path: { id }, query: { lang: i18n.language } },
    },
    { enabled: user !== null }
  );

  return queryResult;
};

export const getNotice = (id: number, lang?: string) => {
  return api.GET(ApiPaths.NoticeController_getNotice, {
    params: { path: { id }, query: { lang } },
  });
};
