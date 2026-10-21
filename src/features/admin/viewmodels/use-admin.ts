import { useMutation, useQueryClient } from '@tanstack/react-query';

import { $api, api } from '@/common/lib';
import { useUser } from '@/features/auth';

import { ApiPaths, type Category } from '../models';

export const useAdminAccess = () => {
  const query = useUser();
  return { ...query, user: query.data, isAdmin: query.data?.isAdmin === true };
};

export const useAdminNotices = ({
  page,
  search,
  category,
}: {
  page: number;
  search?: string;
  category?: Category;
}) => {
  const { isAdmin } = useAdminAccess();
  return $api.useQuery(
    'get',
    ApiPaths.NoticeController_getNoticeList,
    {
      params: {
        query: {
          limit: 20,
          offset: page * 20,
          'order-by': 'recent',
          search: search || undefined,
          category,
          lang: 'ko',
        },
      },
    },
    { enabled: isAdmin, retry: false },
  );
};

export const useAdminNotice = (id: number) => {
  const { isAdmin } = useAdminAccess();
  return $api.useQuery(
    'get',
    ApiPaths.NoticeController_getNotice,
    {
      params: { path: { id }, query: { lang: 'ko' } },
    },
    { enabled: isAdmin && Number.isSafeInteger(id) && id > 0, retry: false },
  );
};

export const useSetAdmin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      uuid,
      isAdmin,
    }: {
      uuid: string;
      isAdmin: boolean;
    }) => {
      const { data, error } = await api.PATCH(
        ApiPaths.UserController_setAdmin,
        {
          params: { path: { uuid } },
          body: { isAdmin },
        },
      );
      if (error) throw error;
      if (!data) throw new Error('Empty response');
      return data;
    },
    onSettled: () =>
      queryClient.invalidateQueries({
        queryKey: ['get', ApiPaths.UserController_getUserInfo],
      }),
  });
};

export const isValidUserUuid = (value: string) =>
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
    value,
  );
export const getAdminErrorStatus = (error: unknown) =>
  error && typeof error === 'object' && 'statusCode' in error
    ? Number(error.statusCode)
    : undefined;
