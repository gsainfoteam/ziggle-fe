import dayjs from 'dayjs';

import { vaporApi } from '..';

export interface GroupInfo {
  uuid: string;
  name: string;
  description: string;
  createdAt: dayjs.Dayjs | string;
  presidentUuid: string;
  president: {
    uuid: string;
    name: string;
    email: string;
    createdAt: dayjs.Dayjs | string;
  };
  count: number;
}

export interface InviteCode {
  code: string;
}

export const getGroupContainingMe = async (
  query: 'all' | 'included',
): Promise<GroupInfo[]> => {
  return vaporApi
    .get<GroupInfo[]>('/group', { params: { type: query } })
    .then(({ data }) => data);
};

export const getGroup = async (uuid: string): Promise<GroupInfo> => {
  return vaporApi.get<GroupInfo>(`/group/${uuid}`).then(({ data }) => data);
};

export const generateInviteCode = async (uuid: string): Promise<InviteCode> => {
  return vaporApi
    .get<InviteCode>(`/group/${uuid}/invite`)
    .then(({ data }) => data);
};
