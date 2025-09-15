import axios from 'axios';
import dayjs from 'dayjs';

export interface GroupInfoForUser {
  Role: [
    {
      RoleExternalPermission: [
        {
          clientUuid: string;
          permission: string;
          roleId: number;
          roleGroupUuid: string;
        },
      ];
      name: string;
      id: number;
      groupUuid: string;
      permissions: ['MEMBER_UPDATE'];
    },
  ];
  name: string;
  description: string;
  uuid: string;
  createdAt: Date;
  verifiedAt: Date;
  presidentUuid: string;
  deletedAt: Date;
  notionPageId: string;
  profileImageKey: string | null;
}

export type UserInfo = GroupInfoForUser[];

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

export type ThirdPartyGroup = {
  uuid: string;
  name: string;
  profileImageUrl: string | null;
};

interface TokenResponse {
  access_token: string;
  expires_in: number;
  token_type: string;
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
  return axios
    .post<TokenResponse>(`${groupsAPIUrl}third-party/token`, {
      client_id: clientId,
      code,
      redirect_uri: redirectUri,
    })
    .then((res) => res.data.access_token)
    .catch((err) => {
      console.error(err);
      return null;
    });
};

export const getUserInfo = async (accessToken: string) => {
  return axios
    .get<UserInfo>(`${groupsAPIUrl}third-party/userinfo`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((res) => res.data)
    .catch((err) => {
      console.error(err);
      return null;
    });
};

export const getGroup = async (uuid: string): Promise<GroupInfo> => {
  return axios
    .get<GroupInfo>(`${groupsUrl}/group/${uuid}`)
    .then(({ data }) => data);
};
