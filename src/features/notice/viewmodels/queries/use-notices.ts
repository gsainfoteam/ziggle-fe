import { ITEMS_PER_PAGE } from '@/common/const/notice';
import { $api } from '@/common/lib';

import { ApiPaths, type Category, type Notice } from '../../models';

export const useNotices = ({
  page = 0,
  orderBy = 'recent',
  my,
  category,
}: {
  page?: number;
  orderBy?: 'recent' | 'deadline' | 'hot';
  my?: 'own' | 'reminders';
  category?: Category;
}) => {
  const efficientPage = Number.isNaN(page) ? 0 : page;
  // TODO: use real type
  const { data, ...rest } = $api.useQuery(
    'get',
    ApiPaths.NoticeController_getNoticeList,
    {
      params: {
        query: {
          limit: ITEMS_PER_PAGE,
          offset: ITEMS_PER_PAGE * efficientPage,
          'order-by': orderBy,
          my,
          category,
        },
      },
    },
  );
  return {
    ...rest,
    data: data as unknown as { list: Notice[]; total: number },
  };
};
