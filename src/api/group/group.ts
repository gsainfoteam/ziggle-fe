import { vaporApi } from '..';

export interface groupInfo {
  name: string;
  description: string;
  createdAt: Date;
  leaderName: string;
  memberCount: number;
  isAdmin: boolean;
}

export const getGroupContainingMe = async (
  query: 'all' | 'included',
): Promise<groupInfo[]> => {
  return vaporApi
    .get('/group', { params: { type: query } })
    .then(({ data }) => data);
};
