import { useEffect } from 'react';

import {
  appStoreLink,
  playStoreLink,
} from '../components/templates/Footer/Footer';

const RedirectToShop = () => {
  useEffect(() => {
    const userAgent = window.navigator.userAgent;
    const isAndroid = Boolean(userAgent.match(/Android/i));
    const isIos = Boolean(userAgent.match(/iPhone|iPad|iPod/i));

    if (!isAndroid && !isIos) return;

    window.open(isIos ? appStoreLink : playStoreLink);
  }, []);

  return null;
};

export default RedirectToShop;
