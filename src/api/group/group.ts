import { vaporApi } from '..';

export class groupInfo {
  name!: string;
  description!: string;
  createdAt!: Date;
  leaderName!: string;
  memberCount!: number;
  isAdmin!: boolean;
}

export const getGroupContainMe = async (
  query: 'all' | 'included',
): Promise<groupInfo[]> => {
  return vaporApi
    .get('/group', { params: { type: query } })
    .then(({ data }) => data);
};
