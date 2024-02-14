import { cookies } from 'next/headers';

import api from '..';
import { NoticeDetail } from './notice';

export const getNotice = async (id: number) => {
  return api
    .get<NoticeDetail>(`/notice/${id}`, {
      headers: {
        Authorization: `Bearer ${cookies().get('access_token')?.value}`,
      },
    })
    .then(({ data }) => ({
      ...data,
      deadline: data.deadline || null,
      currentDeadline: data.currentDeadline || null,
    }));
};
