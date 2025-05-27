import axios from 'axios';
import dayjs from 'dayjs';

import { ziggleApi } from '..';
import { auth } from '../auth/auth';

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

export const getGroupsToken = async (): Promise<string> => {
  const session = await auth();
  const idpToekn = session?.accessToken;
  const { groupsToken } = await axios
    .post<{ groupsToken: string }>(
      `${process.env.NEXT_PUBLIC_GROUPS_API_URL}/external`,
      {
        idpToekn: idpToekn,
      },
    )
    .then(({ data }) => data);

  return groupsToken;
};

export const getMyGroups = async (): Promise<GroupInfo[]> => {
  const groupsToken = await getGroupsToken();

  return ziggleApi
    .get<GroupInfo[]>('/group/my', {
      headers: {
        'Groups-Token': groupsToken,
      },
    })
    .then(({ data }) => data);
};

export const getGroup = async (uuid: string): Promise<GroupInfo> => {
  return ziggleApi.get<GroupInfo>(`/group/${uuid}`).then(({ data }) => data);
};
