import { Notice } from "../../types/types";
import { apiGetter, apiPatcher, apiPoster } from "../interceptor/interceptor";

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

export const createNotice = async (
  title: string,
  body: string,
  deadline: Date,
  tags: string[],
  images: string[],
) => {
  const { data } = await apiPoster("/notice", {
    title,
    body,
    deadline: deadline.toISOString(),
    tags,
    images,
  });
};

export const updateNotice = async (props: {
  id: number;
  title: string;
  body: string;
  deadline: Date;
}) => {
  const { id, title, body, deadline } = props;

  const { data } = await apiPatcher(`/notice/${id}`, {
    title,
    body,
    deadline: deadline.toISOString(),
  });

  return data;
};

export const updateNoticeTags = async (props: {
  id: number;
  tags: string[];
}) => {
  const { id, tags } = props;

  const { data } = await apiPatcher(`/notice/${id}/tags`, {
    tags,
  });

  return data;
};

export const updateNoticeImages = async (props: {
  id: number;
  images: string[];
}) => {
  const { id, images } = props;

  const { data } = await apiPatcher(`/notice/${id}/images`, {
    images,
  });

  return data;
};

export const addToReminderList = async (props: { id: number }) => {
  const { id } = props;

  const { data } = await apiPatcher(`/notice/${id}/reminder`, {});

  return data;
};
