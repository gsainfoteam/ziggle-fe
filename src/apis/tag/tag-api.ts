import { Tag } from "src/types/types";

import { apiGetter, apiPoster } from "../interceptor/interceptor";

export const createTag = async (props: { name: string }) => {
  const { name } = props;

  const { data } = await apiPoster<Tag>("/tag", {
    name,
  });

  return data;
};

export const getAllTags = async ({ queryKey }: { queryKey: [string] }) => {
  const [,] = queryKey;

  const { data } = await apiGetter<Tag[]>("/tag");

  return data;
};

export const getTagByName = async ({
  queryKey,
}: {
  queryKey: [string, string];
}) => {
  const [, name] = queryKey;

  const { data } = await apiGetter<Tag>(`/tag/one`, { name });

  return data;
};

export const searchTags = async ({
  queryKey,
}: {
  queryKey: [string, string];
}) => {
  const [, name] = queryKey;

  const { data } = await apiGetter<Tag[]>("/tag/search", { name });

  return data;
};
