'use client';

import { useSession } from 'next-auth/react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import Swal from 'sweetalert2';

import { NoticeDetail } from '@/api/notice/notice';
import { sendNoticeAlarm } from '@/api/notice/send-alarm';
import { PropsWithLng } from '@/app/i18next';
import { useTranslation } from '@/app/i18next/client';

import { getTimeDiff } from './getTimeDiff';

interface SendPushAlarmProps
  extends Pick<NoticeDetail, 'id' | 'author' | 'publishedAt'> {}

const SendPushAlarm = ({
  id,
  author,
  publishedAt,
  lng,
}: PropsWithLng<SendPushAlarmProps>): JSX.Element | null => {
  const { t } = useTranslation(lng);

  const [isManuallyAlarmed, setIsManuallyAlarmed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendPushNotification = useCallback(async () => {
    if (isLoading) return;
    const result = await Swal.fire({
      text: t('write.alerts.sendPushNotice'),
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: t('alertResponse.confirm'),
      cancelButtonText: t('alertResponse.cancel'),
    });

    if (!result.isConfirmed) return;
    setIsLoading(true);

    try {
      Swal.fire({
        text: t('write.alerts.sendingAlarmNotice'),
        icon: 'info',
        showConfirmButton: false,
        allowOutsideClick: false,
      });

      const newNotice = await sendNoticeAlarm({ id }).catch(() => null);

      if (!newNotice) throw new Error('No newNotice returned');

      setIsManuallyAlarmed(true);

      Swal.fire({
        text: t('write.alerts.sendPushNoticeSuccess'),
        icon: 'success',
        confirmButtonText: t('alertResponse.confirm'),
      });
    } catch (error) {
      Swal.fire({
        text: t('write.alerts.sendPushNoticeFail'),
        icon: 'error',
        confirmButtonText: t('alertResponse.confirm'),
      });
    } finally {
      setIsLoading(false);
    }
  }, [t, id, isLoading]);

  const { data: user } = useSession();
  const isMyNotice = user?.user.uuid === author.uuid;

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
      className={`transform transition-all duration-1000 ease-in-out ${
        showComponent ? 'max-h-screen' : 'max-h-0 overflow-hidden'
      }`}
    >
      <div
        className={`inline-flex w-full items-start justify-start gap-1.5 rounded-[15px] bg-[#fff4f0] px-5 py-[15px] font-normal text-primary`}
      >
        <span>{t('zabo.sentPushNotificationAlert.title')} </span>
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
          {t('zabo.sentPushNotificationAlert.action')}
        </span>
      </div>
    </div>
  );
};

export default SendPushAlarm;
