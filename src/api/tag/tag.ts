import { Tag } from '@/app/[lng]/write/TagInput';
import { gql } from '@/generated';

import api from '../index';

const CREATE_TAG_MUTATION = gql(`
  mutation CreateTag($name: String!) {
    createTag(name: $name) {
      id
      name
    }
  }
`);

const SEARCH_TAGS_QUERY = gql(`
  query SearchTags($name: String!) {
    searchTags(name: $name) {
      id
      name
    }
  }
`);

export const createTag = async (name: string) => {
  const response = await api.post('/', {
    query: CREATE_TAG_MUTATION,
    variables: { name },
  });
  return response.data.data.createTag;
};

export const getAllTags = async () => {
  api.get<Tag[]>('/tag').then(({ data }) => data);
};
