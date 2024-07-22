import { UUID } from 'crypto';

import { vaporApi } from '..';

export class groupInfo {
  name!: string;
  description!: string;
  createdAt!: Date;
}

export const getGroupContainMe = async (
  query: 'all' | 'included',
): Promise<groupInfo[]> => {
  return vaporApi
    .get('/group', { params: { type: query } })
    .then(({ data }) => data);
};

export interface GetGroupByNameResponse {
  name: string;
  description: string;
  createdAt: Date;
  presidentUuid: string;
}

export const getGroupByName = async (
  groupName: string,
): Promise<GetGroupByNameResponse | null> => {
  return vaporApi
    .get(`/group/${groupName}`)
    .then(({ data }) => data)
    .catch((err) => {
      if (err.response && err.response.status === 404) {
        return null;
      }
    });
};
