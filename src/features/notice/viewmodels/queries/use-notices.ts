import { useEffect, useMemo } from 'react';

import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

import { ITEMS_PER_PAGE } from '@/common/const/notice';
import { $api } from '@/common/lib';
import { useUser } from '@/features/auth';

import { ApiPaths, type Category } from '../../models';

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
  const { data: user } = useUser();
  const { i18n } = useTranslation();
  const { t } = useTranslation('notice');

  const efficientPage = Number.isNaN(page) ? 0 : page;
  const { data, error, isError, isLoading } = $api.useQuery(
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
    {
      enabled: user !== null,
      retry(count, error) {
        if (error?.statusCode === 404 || error?.statusCode === 400)
          return false;
        return count < 3;
      },
    },
  );
  useEffect(() => {
    if (!isError) return;
    if (error?.statusCode === 401) {
      toast.error(t('errorHandling.unauthorized.message'));
    } else if (error?.statusCode === 404) {
      // handling in view
    } else {
      toast.error(t('errorHandling.fetchError.message'));
    }
  }, [error, isError, t]);

  const isNotFound = useMemo(
    () => error?.statusCode === 404,
    [error?.statusCode],
  );
  return { data, isLoading, isNotFound };
};
