import { ziggleApi } from '..';
import { NoticeDetail } from './notice';

export const getNotice = async (id: number, lang: 'ko' | 'en') => {
  return ziggleApi
    .get<NoticeDetail>(`/notice/${id}?lang=${lang}`)
    .then(({ data }) => ({
      ...data,
      deadline: data.deadline || null,
      currentDeadline: data.currentDeadline || null,
    }));
};
