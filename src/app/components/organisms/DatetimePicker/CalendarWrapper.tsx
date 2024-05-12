'use client';

import dayjs from 'dayjs';
import React, { useState } from 'react';

import { PropsWithLng } from '@/app/i18next';

import CalendarAnnualView from './calendar/CalendarAnnualView';
import CalendarMonthlyView from './calendar/CalendarMonthlyView';
import CalendarNavbar from './calendar/CalendarNavbar';
import CalendarNoCustom from './calendar/CalendarNoCustom';

interface CalendarWrapperProps {
  value?: dayjs.Dayjs;
  onChange?: React.EventHandler<React.MouseEvent>;
  noCustom?: boolean;
}

const CalendarWrapper = ({
  value,
  onChange,
  noCustom,
  lng,
}: PropsWithLng<CalendarWrapperProps>) => {
  const [viewMode, setViewMode] = useState<string>('monthly');

  return (
    <>
      <div className="inline-flex h-[341px] w-[450px] max-w-full flex-col items-start justify-start rounded-[5px] border border-solid border-primary bg-white px-[15px] py-2.5">
        {noCustom ? (
          <CalendarNoCustom
            value={value}
            onChange={onChange ? onChange : () => undefined}
          />
        ) : (
          <>
            <CalendarNavbar
              value={value ? value : dayjs()}
              onChange={(e: React.MouseEvent<HTMLButtonElement>) => {}}
            />
            {viewMode === 'annual' ? (
              <CalendarAnnualView
                value={value ? value : dayjs()}
                onChange={onChange ? onChange : () => undefined}
              />
            ) : (
              <CalendarMonthlyView
                value={value ? value : dayjs()}
                onChange={onChange ? onChange : () => undefined}
              />
            )}
          </>
        )}
      </div>
    </>
  );
};

export default CalendarWrapper;
