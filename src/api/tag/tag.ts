import { Tag } from '@/app/[lng]/write/TagInput';
import { gql } from '@/generated';

import api from '../index';

export const getAllTags = async () =>
  api.get<Tag[]>('/tag').then(({ data }) => data);

export const searchTags = async (query: string) =>
  api.get<Tag[]>(`/tag?search=${query}`).then(({ data }) => data);
