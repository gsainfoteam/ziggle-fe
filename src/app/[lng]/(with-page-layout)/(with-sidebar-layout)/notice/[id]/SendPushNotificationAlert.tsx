'use client';

import { useSession } from 'next-auth/react';
import { useCallback, useEffect, useState } from 'react';
import Swal from 'sweetalert2';

import { NoticeDetail } from '@/api/notice/notice';
import { sendNoticeAlarm } from '@/api/notice/send-alarm';
import { calculateRemainingTime } from '@/app/[lng]/write/calculateRemainingTime';
import { PropsWithLng } from '@/app/i18next';
import { useTranslation } from '@/app/i18next/client';

interface SendPushNotificationAlertProps
  extends Pick<NoticeDetail, 'id' | 'author' | 'publishedAt'> {}

const SendPushNotificationAlert = ({
  id,
  author,
  publishedAt,
  lng,
}: PropsWithLng<SendPushNotificationAlertProps>): JSX.Element | null => {
  const { t } = useTranslation(lng);

  const handleSendPushNotification = useCallback(async () => {
    const result = await Swal.fire({
      text: t('write.alerts.sendPushNotice'),
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: t('alertResponse.confirm'),
      cancelButtonText: t('alertResponse.cancel'),
    });

    if (!result.isConfirmed) return;

    Swal.fire({
      text: t('write.alerts.sendingAlarmNotice'),
      icon: 'info',
      showConfirmButton: false,
      allowOutsideClick: false,
    });

    const newNotice = await sendNoticeAlarm({ id }).catch(() => null);

    if (!newNotice) {
      Swal.fire({
        text: t('write.alerts.sendPushNoticeFail'),
        icon: 'error',
        confirmButtonText: t('alertResponse.confirm'),
      });
      return;
    }

    // update notice data with newNotice or refetch it
    // so that SendPushNotificationAlert will be hidden
  }, [t, id]);

  const { data: user } = useSession();
  const isMyNotice = user?.user.uuid === author.uuid;

  const [timeRemaining, setTimeRemaining] = useState(
    calculateRemainingTime(publishedAt),
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining(calculateRemainingTime(publishedAt));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const isEditable = timeRemaining.minutes > 0 && timeRemaining.seconds > 0;

  if (!(isMyNotice && isEditable)) return null;

  return (
    <div className="inline-flex w-full items-start justify-start gap-1.5 rounded-[15px] bg-[#fff4f0] px-5 py-[15px] font-normal text-primary">
      <span>{t('zabo.sentPushNotificationAlert.title')} </span>
      <span
        className="cursor-pointer font-bold underline"
        onClick={handleSendPushNotification}
      >
        {t('zabo.sentPushNotificationAlert.action')}
      </span>
    </div>
  );
};

export default SendPushNotificationAlert;
