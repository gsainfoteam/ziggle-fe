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

export const thirdPartyAuth = async () => {
  window.location.href = `${groupsUrl}/thirdParty?client_id=${encodeURI(
    clientId!,
  )}&redirect_uri=${encodeURI(redirectUri!)}`;
};

export const getGroupsToken = async (code: string) => {
  return await axios
    .post(`${groupsAPIUrl}third-party/token`, {
      client_id: clientId,
      code: code,
      redirect_uri: redirectUri,
    })
    .then((res) => res.data)
    .catch((err) => {
      console.error(err);
    });
};

export const getMyGroups = async (accessToken: string) => {
  return axios
    .get(`${groupsAPIUrl}third-party/userinfo`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((res) => res.data)
    .catch((err) => {
      console.error(err);
    });
};

export const getGroup = async (uuid: string): Promise<GroupInfo> => {
  return axios
    .get<GroupInfo>(`${groupsUrl}/group/${uuid}`)
    .then(({ data }) => data);
};
