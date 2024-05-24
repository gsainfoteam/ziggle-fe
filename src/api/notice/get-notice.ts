import api from '..';
import { auth } from '../auth/auth';
import { NoticeDetail } from './notice';

export const getNotice = async (id: number, lang: 'ko' | 'en') => {
  const session = await auth();

  return api
    .get<NoticeDetail>(`/notice/${id}?lang=${lang}`, {
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
      },
    })
    .then(({ data }) => ({
      ...data,
      deadline: data.deadline || null,
      currentDeadline: data.currentDeadline || null,
    }));
};
