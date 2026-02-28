import { useTranslation } from 'react-i18next';

import { $api, api } from '@/common/lib';

import { ApiPaths } from '../../models';

export const useNotice = (id: number) => {
  const { i18n } = useTranslation();
  return $api.useQuery('get', ApiPaths.NoticeController_getNotice, {
    params: { path: { id }, query: { lang: i18n.language } },
  });
};

export const getNotice = (id: number, lang?: string) => {
  return api.GET(ApiPaths.NoticeController_getNotice, {
    params: { path: { id }, query: { lang } },
  });
};
