import { Locale } from '@/app/i18next/settings';

import { ziggleApi } from '..';

export interface GroupInfo {
  uuid: string;
  name: string;
  verified: boolean;
  profileImageUrl: string | null;
}

export const serachGroupsWithName = async (groupName: string, lang: Locale) => {
  return await ziggleApi
    .get<GroupInfo[]>(`/groups/search?name=${groupName}&lang=${lang}`)
    .then(({ data }) => data);
};
