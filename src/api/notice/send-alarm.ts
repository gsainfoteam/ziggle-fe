import { ziggleApi } from '..';
import type { Notice } from './notice';

export const sendNoticeAlarm = ({ id }: Pick<Notice, 'id'>) =>
  ziggleApi.post(`/notice/${id}/alarm`).then((res) => res.data);
