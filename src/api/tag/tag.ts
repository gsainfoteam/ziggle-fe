import { Tag } from '@/app/[lng]/write/TagInput';

import { ziggleApi } from '..';

export const getAllTags = async () =>
  ziggleApi.get<Tag[]>('/tag').then(({ data }) => data);

export const searchTags = async (query: string) =>
  ziggleApi.get<Tag[]>(`/tag?search=${query}`).then(({ data }) => data);

export const getOneTag = async (name: string) =>
  ziggleApi
    .get<Tag>(`/tag?name=${name}`)
    .then(({ data }) => {
      if (!data) return null;
      return data;
    })
    .catch((err) => {
      if (err.response && err.response.status === 404) return null;
      throw err;
    });

export const createTag = async (name: string) =>
  ziggleApi.post<Tag>('/tag', { name }).then(({ data }) => data);
