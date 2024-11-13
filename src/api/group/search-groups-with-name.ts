import { ziggleApi } from '..';

export interface GroupInfo {
  uuid: string;
  name: string;
  verified: boolean;
  profileImageUrl: object;
}

export const serachGroupsWithName = async (groupName: string) => {
  return await ziggleApi
    .get<GroupInfo>(`/groups/search?name=${groupName}`)
    .then(({ data }) => data);
};
