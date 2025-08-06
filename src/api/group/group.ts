import axios from 'axios';
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

const groupsBaseUrl = process.env.NEXT_PUBLIC_GROUPS_API_URL;
const clientId = process.env.NEXT_PUBLIC_GROUPS_CLIENT_ID;
const clientSecret = process.env.GROUPS_CLIENT_SECRET;
const basedURL = process.env.NEXT_PUBLIC_GROUPS_REDIRECT_BASE_URL;
export const thirdPartyAuth = async (path: string) => {
  const { data } = await axios.get(
    `${groupsBaseUrl}third-party/authorize?client_id=${clientId}&redirect_uri=${basedURL}${path}`,
  );
};

export const getGroupsToken = async (code: string, path: string) => {
  const { data } = await axios.get(
    `${groupsBaseUrl}third-party/token/authorize?client_id=${clientId}&code=${code}&redirect_uri=${basedURL}${path}&`,
  );
  return;
};

export const getMyGroups = async () => {
  return;
};

export const getGroup = async (uuid: string): Promise<GroupInfo> => {
  return ziggleApi.get<GroupInfo>(`/group/${uuid}`).then(({ data }) => data);
};
