import { useEffect } from 'react';
import Swal from 'sweetalert2';

import {
  appStoreLink,
  playStoreLink,
} from '../../components/templates/Footer/Footer';
import { PropsWithLng } from '../../i18next';
import { useTranslation } from '../../i18next/client';

const InstallApp = ({ lng }: PropsWithLng) => {
  const { t } = useTranslation(lng);

  useEffect(() => {
    const userAgent = window.navigator.userAgent;
    const isAndroid = Boolean(userAgent.match(/Android/i));
    const isIos = Boolean(userAgent.match(/iPhone|iPad|iPod/i));
    if (!isAndroid && !isIos) return;
    Swal.fire({
      title: t('installApp.title'),
      text: t('installApp.text'),
      icon: 'info',
      confirmButtonText: t('installApp.open'),
      cancelButtonText: t('installApp.cancel'),
      showCancelButton: true,
      allowOutsideClick: false,
    }).then((result) => {
      if (!result.isConfirmed) return;
      window.open(window.location.origin + '/app');
    });
  }, [t]);

  return null;
};

export default InstallApp;