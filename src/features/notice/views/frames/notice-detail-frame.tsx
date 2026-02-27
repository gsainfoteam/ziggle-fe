import { notFound, useParams } from '@tanstack/react-router';

import { useTranslation } from 'react-i18next';

import { useNotice } from '../../viewmodels';
import NoticeInfo from '../notice-info';

export function NoticeDetailFrame() {
  const { id } = useParams({ from: '/_layout/_sidebar/notice/$id' });
  const { data: notice } = useNotice(Number.parseInt(id));
  const { t, i18n } = useTranslation();

  if (!notice) return notFound();

  const title = notice.title;

  const additionalContents = Object.values(
    notice.additionalContents.reduce<
      Record<number, (typeof notice.additionalContents)[number]>
    >(
      (prev, curr) => ({
        ...prev,
        [curr.id]: prev[curr.id]?.lang === i18n.language ? prev[curr.id] : curr,
      }),
      {},
    ),
  );

  return (
    <div className="flex justify-center">
      <div className="content mt-8 md:mt-12 md:w-[900px] md:min-w-[600px]">
        <div className="flex gap-5">
          {/* DESKTOP VIEW IMAGE STACK */}
          {/* <div className="hidden md:block">
            {notice.imageUrls.length > 0 && (
              <ImageStack sources={notice.imageUrls} alt={title} />
            )}
          </div> */}

          <div className="flex flex-col gap-[18px] md:w-[60%]">
            {/* <SendPushAlarm {...notice} /> */}

            <NoticeInfo {...notice} currentDeadline={notice.currentDeadline} />

            {/* MOBILE VIEW IMAGE STACK */}
            <div className="md:hidden">
              {/* {notice.imageUrls.length > 0 && (
                <ImageStack
                  width={900}
                  sources={notice.imageUrls}
                  alt={title}
                />
              )} */}
            </div>

            <Content content={notice.content} />

            {/* <Actions notice={notice} /> */}

            {/* <AdditionalNotices
              additionalContents={additionalContents}
              notice={notice}
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
}
