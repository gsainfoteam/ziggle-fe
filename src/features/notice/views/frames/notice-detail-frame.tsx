import { useLoaderData } from '@tanstack/react-router';

import { useTranslation } from 'react-i18next';

import { Loading } from '@/common/components';

import { useNotice } from '../../viewmodels';
import { Actions } from '../components/actions';
import { AdditionalNotices } from '../components/additional-notices';
import { Content } from '../components/content';
import ImageStack from '../components/image-stack';
import { SendPushAlarm } from '../components/send-push-notification';
import NoticeInfo from '../notice-info';

export function NoticeDetailFrame() {
  const { notice: preloadedNotice, numId } = useLoaderData({
    from: '/_layout/_sidebar/notice/$id',
  });
  const { data: notice } = useNotice(numId);
  const efficientNotice = notice ?? preloadedNotice;
  const { i18n } = useTranslation();

  if (!efficientNotice) return <Loading />;

  const additionalContents = Object.values(
    efficientNotice.additionalContents.reduce<
      Record<number, (typeof efficientNotice.additionalContents)[number]>
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
          <div className="hidden md:block">
            {efficientNotice.imageUrls.length > 0 && (
              <ImageStack
                sources={efficientNotice.imageUrls}
                alt={efficientNotice.title}
              />
            )}
          </div>

          <div className="flex flex-col gap-[18px] md:w-[60%]">
            <SendPushAlarm {...efficientNotice} />

            <NoticeInfo
              {...efficientNotice}
              currentDeadline={efficientNotice.currentDeadline}
            />

            {/* MOBILE VIEW IMAGE STACK */}
            <div className="md:hidden">
              {efficientNotice.imageUrls.length > 0 && (
                <ImageStack
                  width={900}
                  sources={efficientNotice.imageUrls}
                  alt={efficientNotice.title}
                />
              )}
            </div>

            <Content content={efficientNotice.content} />

            <Actions notice={efficientNotice} />

            <AdditionalNotices
              additionalContents={additionalContents}
              notice={efficientNotice}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
