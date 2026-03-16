import { useEffect, useMemo } from 'react';

import { useTranslation } from 'react-i18next';

import { $api, api } from '@/common/lib';

import { ApiPaths } from '../../models';
import { useUser } from '@/features/auth';

import { toast } from 'sonner';

export const useNotice = (id: number) => {
  const { data: user } = useUser();
  const { i18n } = useTranslation();
  const { t } = useTranslation('notice');

  const { data, error, isError, isLoading } = $api.useQuery(
    'get',
    ApiPaths.NoticeController_getNotice,
    {
      params: { path: { id }, query: { lang: i18n.language } },
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

export const getNotice = (id: number, lang?: string) => {
  return api.GET(ApiPaths.NoticeController_getNotice, {
    params: { path: { id }, query: { lang } },
  });
};
