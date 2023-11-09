'use client';

import LogEvents from '@/api/log/log-events';
import sendLog from '@/api/log/send-log';
import { useTranslation } from '@/app/i18next/client';
import { Locale } from '@/app/i18next/settings';

export default function WritePage() {
  const { t } = useTranslation();

  return (
    <main className="flex flex-col items-center md:py-12">
      <input
        className="text-4xl font-bold mt-16 mb-4 p-0 content outline-none"
        type="text"
        placeholder={t('write.writeTitle')}
        onBlur={(e) => {
          sendLog(LogEvents.noticeWritingPageTypeTitle, {
            title: e.target.value,
          });
        }}
      />
    </main>
  );
}
