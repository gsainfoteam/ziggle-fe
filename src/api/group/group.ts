import dayjs from 'dayjs';

import { ziggleApi } from '..';

export interface GroupInfo {
  uuid: string;
  name: string;
  description: string;
  createdAt: dayjs.Dayjs | string;
  verifiedAt: dayjs.Dayjs | string | null;
  presidentUuid: string;
  notionPageId: string | null;
  profileImageKey: string | null;
  profileImageUrl: string | null;
  count: number;
}

export interface InviteCode {
  code: string;
}

export const getMyGroups = async (): Promise<GroupInfo[]> => {
  const { groupsToken } = await ziggleApi
    .post<{ groupsToken: string }>('/group/token')
    .then(({ data }) => data);

  return ziggleApi
    .get<GroupInfo[]>('/group/my', {
      headers: {
        'Groups-Token': groupsToken,
      },
    })
    .then(({ data }) => data);
};
