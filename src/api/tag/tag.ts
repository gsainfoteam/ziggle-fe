import { Tag } from '@/app/[lng]/(common)/(common)/write/TagInput';

import api from '../index';

export const getAllTags = async () =>
  api.get<Tag[]>('/tag').then(({ data }) => data);

export const searchTags = async (query: string) =>
  api.get<Tag[]>(`/tag?search=${query}`).then(({ data }) => data);

export const getOneTag = async (name: string) =>
  api
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
  api.post<Tag>('/tag', { name }).then(({ data }) => data);
