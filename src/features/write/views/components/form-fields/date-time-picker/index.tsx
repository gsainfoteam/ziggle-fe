import { type Dayjs } from 'dayjs';

import { cn } from '@/common/utils';

interface DateTimePickerProps {
  dateTime: Dayjs;
  onChange: (dateTime: Dayjs) => void;
  className?: string;
}

const fieldClassName = cn(
  'text-foreground bg-transparent text-sm font-medium [color-scheme:light] outline-none dark:[color-scheme:dark]',
);

export const DateTimePicker = ({
  dateTime,
  onChange,
  className,
}: DateTimePickerProps) => {
  return (
    <div
      className={cn(
        'border-border bg-muted inline-flex shrink-0 items-center gap-1 rounded-xl border px-2.5 py-1.5',
        className,
      )}
    >
      <input
        type="date"
        value={dateTime.format('YYYY-MM-DD')}
        onChange={(e) => {
          const next = e.target.value;
          if (!next) return;
          const [year, month, day] = next.split('-').map(Number);
          onChange(
            dateTime
              .year(year)
              .month(month - 1)
              .date(day),
          );
        }}
        className={cn(fieldClassName, 'min-w-[9.5rem]')}
      />
      <span className="text-border px-0.5" aria-hidden>
        ·
      </span>
      <input
        type="time"
        value={dateTime.format('HH:mm')}
        onChange={(e) => {
          const next = e.target.value;
          if (!next) return;
          const [hour, minute] = next.split(':').map(Number);
          onChange(dateTime.hour(hour).minute(minute).second(0));
        }}
        className={cn(fieldClassName, 'min-w-[6.5rem]')}
      />
    </div>
  );
};
