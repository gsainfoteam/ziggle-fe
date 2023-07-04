import { Notice } from "../../types/types";
import { apiGetter } from "../interceptor/interceptor";

export const getAllNotices = async ({
  queryKey,
}: {
  queryKey: [string];
}): Promise<Notice[]> => {
  const [,] = queryKey;

  const { data } = await apiGetter<Notice[]>("/notice/all");

  return data;
};

export const getNotice = async ({
  queryKey,
}: {
  queryKey: [string, number];
}): Promise<Notice> => {
  const [, id] = queryKey;

  const { data } = await apiGetter<Notice>(`/notice/${id}`);

  return data;
};
