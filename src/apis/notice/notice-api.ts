import { Notice, NoticeDetail } from "../../types/types";
import { apiDeleter, apiGetter, apiPoster } from "../interceptor/interceptor";

interface NoticesResponse {
  list: Notice[];
  total: number;
}

interface FetchOptions {
  offset?: number;
  limit?: number;
  search?: string;
  tags?: string[]; // tag name ex) recruit, event, general, academic ...
  orderBy?: "deadline" | "hot" | "recent";
  my?: "own" | "reminders";
}

export const getAllNotices = async ({
  queryKey,
}: {
  queryKey: [string, FetchOptions];
}): Promise<NoticesResponse> => {
  const [, params] = queryKey;

  const { data } = await apiGetter<NoticesResponse>("/notice/all", params);

  return data;
};

export const getNotice = async ({
  queryKey,
}: {
  queryKey: [string, number];
}): Promise<NoticeDetail> => {
  const [, id] = queryKey;

  const { data } = await apiGetter<NoticeDetail>(`/notice/${id}`);

  return data;
};

export const createNotice = async (props: {
  title: string;
  body: string;
  tags: number[];
  images: string[];
  deadline?: Date;
}) => {
  const { title, body, deadline, tags, images } = props;

  const { data } = await apiPoster("/notice", {
    title,
    body,
    deadline: deadline ? deadline.toISOString() : null,
    tags,
    images,
  });

  return data;
};

export const toggleReminder = async (props: {
  id: number;
  doRemind: boolean;
}) => {
  const { id, doRemind } = props;

  if (doRemind) {
    const { data } = await apiPoster(`/notice/${id}/reminder`);
    return data;
  } else {
    const { data } = await apiDeleter(`/notice/${id}/reminder`);
    return data;
  }
};
