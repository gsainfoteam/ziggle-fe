// the buttons and title bar in the calendar.

import dayjs from 'dayjs';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';
import { ReactHTMLElement } from 'react';

import FastArrow from '@/app/assets/icons/fast-arrow-right.svg';
import NavArrow from '@/app/assets/icons/nav-arrow-right.svg';

dayjs.extend(LocalizedFormat);

interface CalendarNavbarProps {
  value: dayjs.Dayjs;
  viewmode?: string;
  onChange: React.MouseEventHandler;
}

interface TitleStringProps {
  value: dayjs.Dayjs;
  viewmode?: string;
}

// generates current title of calendar e,g, "2018 October" or "2022"
const TitleString = ({ value, viewmode }: TitleStringProps): string => {
  const fmtTable = new Map<string, string>();
  fmtTable.set('monthly', 'YYYY MMMM');
  fmtTable.set('annual', 'YYYY');

  return dayjs(value).format(fmtTable.get(viewmode ? viewmode : 'monthly'));
};

const CalendarNavbar = ({ value, viewmode, onChange }: CalendarNavbarProps) => {
  return (
    <div className="inline-flex items-center justify-between self-stretch p-2.5">
      <div className="flex items-start justify-start gap-5 bg-transparent">
        <button className="relative h-6 w-6" name="decrement-big">
          <FastArrow className="rotate-180" />
        </button>
        <button className="relative h-6 w-6" name="decrement-small">
          <NavArrow className="rotate-180" />
        </button>
      </div>
      <div className="font-['Pretendard Variable'] text-base font-bold text-neutral-800">
        <TitleString value={value} viewmode={viewmode} />
      </div>
      <div className="flex items-start justify-start gap-5 bg-transparent">
        <button className="relative h-6 w-6" name="increment-small">
          <NavArrow />
        </button>
        <button className="relative h-6 w-6" name="increment-big">
          <FastArrow />
        </button>
      </div>
    </div>
  );
};

export default CalendarNavbar;
