import { useTranslation } from 'react-i18next';

import { ITEMS_PER_PAGE } from '@/common/const/notice';
import { $api } from '@/common/lib';

import { ApiPaths, type Category, type Notice } from '../../models';

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
  const efficientPage = Number.isNaN(page) ? 0 : page;
  // TODO: use real type
  const { data, ...rest } = $api.useQuery(
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
    },
  );
  return {
    ...rest,
    data: data as unknown as { list: Notice[]; total: number },
  };
};
