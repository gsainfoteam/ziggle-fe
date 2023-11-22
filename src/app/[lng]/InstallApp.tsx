import { useEffect } from 'react';
import Swal from 'sweetalert2';

import {
  appStoreLink,
  playStoreLink,
} from '../components/templates/Footer/Footer';
import { PropsWithLng } from '../i18next';
import { useTranslation } from '../i18next/client';

const InstallApp = ({ lng }: PropsWithLng) => {
  const userAgent = window.navigator.userAgent;
  const isAndroid = Boolean(userAgent.match(/Android/i));
  const isIos = Boolean(userAgent.match(/iPhone|iPad|iPod/i));
  const { t } = useTranslation(lng);

  useEffect(() => {
    if (!isAndroid && !isIos) return;
    Swal.fire({
      title: t('installApp.title'),
      text: t('installApp.text'),
      icon: 'info',
      confirmButtonText: t('installApp.install'),
    }).then((result) => {
      if (!result.isConfirmed) return;
      window.open(isIos ? appStoreLink : playStoreLink);
    });
  }, [isAndroid, isIos, t]);

  return null;
};

export default InstallApp;
