import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import 'react-datetime-picker/dist/DateTimePicker.css';

import { useLoaderData } from '@tanstack/react-router';

import { NoticeEditor } from '../components';

export const WriteFrame = () => {
  const notice = useLoaderData({ from: '/_write/write' });

  return (
    <main className="flex flex-col items-center py-12">
      <div className="content flex max-w-[600px] flex-col">
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
      </div>
    </main>
  );
};
