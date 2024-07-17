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
