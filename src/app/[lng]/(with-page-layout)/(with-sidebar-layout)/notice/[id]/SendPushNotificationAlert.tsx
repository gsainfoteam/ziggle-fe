'use client';

import { useSession } from 'next-auth/react';
import { useCallback, useEffect, useState } from 'react';

import { NoticeDetail } from '@/api/notice/notice';
import { calculateRemainingTime } from '@/app/[lng]/write/calculateRemainingTime';
import { PropsWithLng } from '@/app/i18next';
import { useTranslation } from '@/app/i18next/client';

interface SendPushNotificationAlertProps
  extends Pick<NoticeDetail, 'author' | 'createdAt'> {}

const SendPushNotificationAlert = ({
  author,
  createdAt,
  lng,
}: PropsWithLng<SendPushNotificationAlertProps>): JSX.Element | null => {
  const { t } = useTranslation(lng);

  const handleSendPushNotification = useCallback(() => {
    // TODO: Implement push notification sending
  }, []);

  const { data: user } = useSession();
  const isMyNotice = user?.user.uuid === author.uuid;

  const [timeRemaining, setTimeRemaining] = useState({
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining(calculateRemainingTime(createdAt));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const isEditable = timeRemaining.minutes > 0 && timeRemaining.seconds > 0;

  if (!(isMyNotice && isEditable)) return null;

  return (
    <div className="inline-flex h-[55px] items-start justify-start gap-1.5 rounded-[15px] bg-[#fff4f0] px-5 py-[15px] font-normal text-primary">
      {t('zabo.sentPushNotificationAlert.title')}{' '}
      <div
        className="cursor-pointer font-bold underline"
        onClick={handleSendPushNotification}
      >
        {t('zabo.sentPushNotificationAlert.action')}
      </div>
    </div>
  );
};

export default SendPushNotificationAlert;
