import { useEffect, useState } from 'react';

import {
  getAllNotices,
  NoticePaginationParams,
  Notices,
  NoticeSearchParams,
} from '@/api/notice/notice';

export const useGetAllNotices = (
  params: NoticePaginationParams & NoticeSearchParams = {},
) => {
  const [notices, setNotices] = useState<Notices | null>(null);

  useEffect(() => {
    const fetchNotices = async () => {
      const data = await getAllNotices(params);
      setNotices(data);
    };

    fetchNotices();
    console.log('fetch', params);
  }, [JSON.stringify(params)]);

  return notices;
};
