import { useTranslation } from 'react-i18next';

import { ITEMS_PER_PAGE } from '@/common/const/notice';
import { $api } from '@/common/lib';

import { ApiPaths, type Category } from '../../models';
import { useUser } from '@/features/auth';
import { MOCK_NOTICES } from '../mocks/mock-notices';

export const useNotices = ({
  limit = ITEMS_PER_PAGE,
  page = 0,
  orderBy = 'recent',
  my,
  category,
  search,
  tags,
}: {
  limit?: number;
  page?: number;
  orderBy?: 'recent' | 'deadline' | 'hot';
  my?: 'own' | 'reminders';
  category?: Category;
  search?: string;
  tags?: string[];
}) => {
  const { i18n } = useTranslation();
  const { data: User } = useUser();

  const efficientPage = Number.isNaN(page) ? 0 : page;
  const queryResult = $api.useQuery(
    'get',
    ApiPaths.NoticeController_getNoticeList,
    {
      params: {
        query: {
          limit,
          offset: limit * efficientPage,
          'order-by': orderBy,
          my,
          category,
          lang: i18n.language,
          search,
          tags,
        },
      },
      enabled: User !== null,
    },
  );
  if (User === null) {
    return {
      ...queryResult,
      data: MOCK_NOTICES,
      status: 'success',
      isSuccess: true,
      isPending: false,
      isLoading: false,
      isError: false,
      error: null,
    } as unknown as typeof queryResult;
  }

  return queryResult;
};
