import { useLoaderData } from '@tanstack/react-router';

import { NoticeEditor } from '../components';

export const WriteFrame = () => {
  const notice = useLoaderData({ from: '/_write/write' });

  return (
    <NoticeEditor
      notice={
        notice
          ? {
              ...notice.notice,
              enTitle: notice.englishNotice?.title,
              enContent: notice.englishNotice?.content,
            }
          : undefined
      }
      isEditMode={!!notice}
    />
  );
};
