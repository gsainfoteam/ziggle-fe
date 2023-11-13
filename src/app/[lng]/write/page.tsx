'use client';

import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';

import { useState } from 'react';
import DateTimePicker from 'react-datetime-picker';

import LogEvents from '@/api/log/log-events';
import sendLog from '@/api/log/send-log';
import Checkbox from '@/app/components/atoms/Checkbox/Checkbox';
import { useTranslation } from '@/app/i18next/client';
import { Locale } from '@/app/i18next/settings';

// for react-datetime-picker
type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function WritePage() {
  const { t } = useTranslation();

  const [hasDeadline, setHasDeadline] = useState(false);
  const [deadline, onDeadlineChange] = useState<Value>(new Date());

  return (
    <main className="flex flex-col items-center md:py-12">
      <div className="flex flex-col content">
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
        <div className="flex items-center gap-1">
          <Checkbox
            checked={hasDeadline}
            onChange={(e) => {
              setHasDeadline(e.target.checked);
              sendLog(LogEvents.noticeWritingPageCheckDeadline, {
                hasDeadline: e.target.checked,
              });
            }}
          >
            <div className="font-medium text-lg">
              {t('write.setupDeadline')}
            </div>
          </Checkbox>

          <DateTimePicker onChange={onDeadlineChange} value={deadline} />
        </div>
      </div>
    </main>
  );
}
