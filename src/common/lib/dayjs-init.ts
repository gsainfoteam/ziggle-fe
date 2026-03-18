import dayjs from 'dayjs';
import ko from 'dayjs/locale/ko';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';
import relativeTime from 'dayjs/plugin/relativeTime';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

import { i18n, type Language } from './i18n';

dayjs.extend(LocalizedFormat);
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(relativeTime);
dayjs.locale(ko);
dayjs.tz.setDefault('Asia/Seoul');

const loaderMap: Record<Language, () => Promise<ILocale>> = {
  ko: () => import('dayjs/locale/ko'),
  en: () => import('dayjs/locale/en'),
};

i18n.on('languageChanged', async (lng: Language) => {
  try {
    const prevLocale = dayjs.locale();
    dayjs.locale(lng);
    const loader = loaderMap[lng];
    if (!loader) throw new Error(`Unsupported language: ${lng}`);
    const locale = await loader();
    dayjs.locale(locale);
    if (prevLocale !== lng) {
      i18n.changeLanguage(lng);
    }
  } catch {
    dayjs.locale(ko);
  }
});
