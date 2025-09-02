import axios from 'axios';
import dayjs from 'dayjs';
import { redirect } from 'next/dist/server/api-utils';

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

const groupsAPIUrl = process.env.NEXT_PUBLIC_GROUPS_API_URL;
const groupsUrl = process.env.NEXT_PUBLIC_GROUPS_URL;
const clientId = process.env.NEXT_PUBLIC_GROUPS_CLIENT_ID;
const redirectUri = process.env.NEXT_PUBLIC_GROUPS_REDIRECT_URI;

export const thirdPartyAuth = async (path: string) => {
  localStorage.setItem('returnTo', path);
  window.location.href = `${groupsUrl}/thirdParty?client_id=${clientId}&redirect_uri=${redirectUri}`;
};

export const getGroupsToken = async (code: string) => {
  return await axios
    .post(`${groupsAPIUrl}third-party/token`, {
      client_id: clientId,
      code: code,
      redirect_uri: redirectUri,
    })
    .then((res) => res)
    .catch((err) => console.error(err));
};

export const getMyGroups = async () => {
  return;
};

export const getGroup = async (uuid: string): Promise<GroupInfo> => {
  return axios
    .get<GroupInfo>(`${groupsUrl}/group/${uuid}`)
    .then(({ data }) => data);
};
