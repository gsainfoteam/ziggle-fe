import { $api } from '@/common/lib';

import { ApiPaths } from '../../models';

export const useSearchTags = ({ keyword }: { keyword: string }) => {
  const { data, ...rest } = $api.useQuery(
    'get',
    ApiPaths.TagController_findAll,
    { params: { query: { search: keyword } } },
    { enabled: !!keyword },
  );
  return {
    ...rest,
    // TODO: ??
    data: data as unknown as NonNullable<typeof data>[] | undefined,
  };
};
