import { Locale } from '@/app/i18next/settings';

import { ziggleApi } from '..';
import { GroupInfo } from './group';

export const searchGroupWithName = async (groupName: string, lang: Locale) => {
  return await ziggleApi
    .get<{ list: GroupInfo[] }>(
      `/group/search?query=${encodeURIComponent(groupName)}&lang=${lang}`,
    )
    .then(({ data: { list } }) => list);
};
