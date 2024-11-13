import { Locale } from '@/app/i18next/settings';

import { ziggleApi } from '..';

export interface GroupInfo {
  uuid: string;
  name: string;
  verified: boolean;
  profileImageUrl: string | null;
}

export const serachGroupsWithName = async (groupName: string, lang: Locale) => {
  return [
    {
      uuid: '1cff6b40-5db2-45de-bb59-0825267052b3',
      name: 'realziggle',
      verified: true,
      profileImageUrl: null,
    },
  ];

  return await ziggleApi
    .get<GroupInfo[]>(`/groups/search?name=${groupName}&lang=${lang}`)
    .then(({ data }) => data);
};
