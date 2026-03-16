import { useTranslation } from 'react-i18next';

import { $api, api } from '@/common/lib';

import { ApiPaths } from '../../models';
import { useUser } from '@/features/auth';

import { MOCK_NOTICE } from '../mocks/mock-notice';

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

  if (user === null) {
    return {
      ...queryResult,
      data: MOCK_NOTICE[0], // 순수 데이터를 여기에 쏙!
      status: 'success',
      isPending: false,
      isLoading: false,
      isSuccess: true,
      isError: false,
      error: null,
    } as unknown as typeof queryResult;
  }

  return queryResult;
};

export const getNotice = (id: number, lang?: string) => {
  return api.GET(ApiPaths.NoticeController_getNotice, {
    params: { path: { id }, query: { lang } },
  });
};
