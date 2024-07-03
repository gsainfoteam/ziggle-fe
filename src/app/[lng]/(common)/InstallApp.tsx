import { useEffect } from 'react';
import Swal from 'sweetalert2';

import { languages } from '@/app/i18next/settings';
import { IS_MOBILE_INSTALL_APP_ALERT_DISMISSED } from '@/utils/constants';

import { PropsWithLng } from '../../i18next';
import { useTranslation } from '../../i18next/client';

const InstallApp = ({ lng }: PropsWithLng) => {
  const { t } = useTranslation(lng);

  useEffect(() => {
    const userAgent = window.navigator.userAgent;
    const isAndroid = Boolean(userAgent.match(/Android/i));
    const isIos = Boolean(userAgent.match(/iPhone|iPad|iPod/i));
    if (!isAndroid && !isIos) return;
    if (localStorage.getItem(IS_MOBILE_INSTALL_APP_ALERT_DISMISSED)) return;
    Swal.fire({
      title: t('installApp.title'),
      text: t('installApp.text'),
      icon: 'info',
      confirmButtonText: t('installApp.open'),
      cancelButtonText: t('installApp.cancel'),
      showCancelButton: true,
      allowOutsideClick: false,
    }).then((result) => {
      if (result.dismiss) {
        localStorage.setItem(IS_MOBILE_INSTALL_APP_ALERT_DISMISSED, 'true');
      }
      if (!result.isConfirmed) return;
      const link = new URL(window.location.origin);
      link.pathname = '/app';
      link.searchParams.set(
        'redirect',
        languages.reduce(
          (prev, curr) => prev.replace(`/${curr}`, ''),
          window.location.pathname,
        ),
      );
      window.open(link);
    });
  }, [t]);

  return null;
};

export default InstallApp;
