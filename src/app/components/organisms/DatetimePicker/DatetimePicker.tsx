'use client';

import dayjs from 'dayjs';
import React, { useRef, useState } from 'react';

import { PropsWithLng } from '@/app/i18next';

import CalendarWrapper from './CalendarWrapper';
import TimeDial from './TimeDial';

interface DateTimePickerProps {
  value: dayjs.Dayjs;
}

// TODO : wrap calendar and time dial into a properly working hunk
const DateTimePicker = ({ value, lng }: PropsWithLng<DateTimePickerProps>) => {
  const displayCalendar = useRef(false);
  const displayTimeDial = useRef(false);

  const [day, setDay] = useState(dayjs()); //placeholder

  const CalendarSpan = (c: boolean) =>
    c ? (
      <CalendarWrapper
        onChange={/* TODO : add EventHandler*/ () => undefined}
        lng={lng}
      />
    ) : undefined;

  return (
    <>
      <div className="flex justify-center justify-items-stretch gap-2 bg-transparent">
        <div className="flex items-center rounded-[10px] border border-primary bg-white p-2.5">
          <input
            className="bg-transparent text-sm text-primary"
            type="date"
            name="dateField"
            onClick={() => {
              displayCalendar.current = true;
            }}
          />
        </div>
        <div className="flex items-center rounded-[10px] border border-primary bg-white p-2.5">
          <input
            className="bg-transparent text-sm text-primary"
            type="time"
            name="timeField"
            onClick={() => {
              displayTimeDial.current = true;
            }}
          />
        </div>
      </div>
      {CalendarSpan(displayCalendar.current)}
    </>
  );
};

export default DateTimePicker;
