import { useCallback, useEffect, useMemo, useState } from 'react';

import dayjs, { type Dayjs } from 'dayjs';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

import { cn } from '@/common/utils';
import { useUser } from '@/features/auth';

import { useSendAlarm } from '../../viewmodels';

import type { NoticeDetail } from '../../models';

interface SendPushAlarmProps extends Pick<
  NoticeDetail,
  'id' | 'author' | 'publishedAt'
> {}

const CLIENT_SERVER_TIME_OFFSET_SECONDS = 10;
const getTimeDiff = (createdAt: Dayjs | string) => {
  const currentTime = dayjs();
  const diffInSeconds = dayjs(createdAt)
    .subtract(CLIENT_SERVER_TIME_OFFSET_SECONDS, 'second')
    .diff(currentTime, 'second');
  const minutes = Math.floor(diffInSeconds / 60);
  const seconds = diffInSeconds % 60;
  return { minutes, seconds };
};

export const SendPushAlarm = ({
  id,
  author,
  publishedAt,
}: SendPushAlarmProps) => {
  const { t } = useTranslation('notice');

  const [isManuallyAlarmed, setIsManuallyAlarmed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { mutateAsync: sendNoticeAlarm } = useSendAlarm();

  const handleSendPushNotification = useCallback(async () => {
    if (isLoading) return;
    // common:alert_response.confirm / common:alert_response.cancel
    const result = confirm(t('detail.push_notification.confirm'));
    if (!result) return;
    setIsLoading(true);

    try {
      const newNotice = await toast
        .promise(sendNoticeAlarm({ params: { path: { id } } }), {
          loading: t('detail.push_notification.toasts.loading'),
          success: t('detail.push_notification.toasts.success'),
          error: t('detail.push_notification.toasts.fail'),
        })
        .unwrap();

      if (!newNotice) throw new Error('No newNotice returned');

      setIsManuallyAlarmed(true);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, t, sendNoticeAlarm, id]);

  const { data: user } = useUser();
  const isMyNotice = user?.uuid === author.uuid;

  const MINUTE = 60000;
  const TEN_SECONDS = 10000;
  const ONE_SECOND = 1000;

  const getIntervalDuration = (minutes: number, seconds: number) => {
    if (minutes > 1) return MINUTE;
    if (seconds > 15) return TEN_SECONDS;
    return ONE_SECOND;
  };

  const [timeRemaining, setTimeRemaining] = useState(getTimeDiff(publishedAt));
  useEffect(() => {
    let isSubscribed = true;
    if (
      isManuallyAlarmed ||
      timeRemaining.minutes < 0 ||
      timeRemaining.seconds < 0
    ) {
      return;
    }

    const intervalDuration = getIntervalDuration(
      timeRemaining.minutes,
      timeRemaining.seconds,
    );

    const interval = setInterval(() => {
      if (isSubscribed) {
        const newTimeRemaining = getTimeDiff(publishedAt);
        if (
          newTimeRemaining.minutes !== timeRemaining.minutes ||
          newTimeRemaining.seconds !== timeRemaining.seconds
        ) {
          setTimeRemaining(newTimeRemaining);
        }
      }
    }, intervalDuration);

    return () => {
      isSubscribed = false;
      clearInterval(interval);
    };
  }, [timeRemaining, publishedAt, isManuallyAlarmed]);

  const isEditable = timeRemaining.minutes >= 0 && timeRemaining.seconds >= 0;

  const showComponent = useMemo(
    () => isMyNotice && isEditable && !isManuallyAlarmed,
    [isMyNotice, isEditable, isManuallyAlarmed],
  );

  return (
    <div
      className={cn(
        'transform transition-all duration-1000 ease-in-out',
        showComponent ? 'max-h-screen' : 'max-h-0 overflow-hidden',
      )}
    >
      <div className="text-primary bg-secondary inline-flex w-full items-start justify-start gap-1.5 rounded-[15px] px-5 py-[15px] font-normal">
        <span>{t('detail.push_notification.title')} </span>
        <span
          className="cursor-pointer font-bold underline"
          onClick={handleSendPushNotification}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              handleSendPushNotification();
            }
          }}
        >
          {t('detail.push_notification.action')}
        </span>
      </div>
    </div>
  );
};
