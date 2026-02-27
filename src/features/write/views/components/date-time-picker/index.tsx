import './date-time-picker.css';

import { type Dayjs } from 'dayjs';
import DatePicker from 'react-date-picker';

import { TimePicker } from './time-picker';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

interface DateTimePickerProps {
  dateTime: Dayjs;
  onChange: (dateTime: Dayjs) => void;
}

export const DateTimePicker = ({ dateTime, onChange }: DateTimePickerProps) => {
  const date = dateTime.toDate();
  const setDate = (value: Value) => {
    if (!(value instanceof Date)) return;
    const newDateTime = dateTime
      .set('date', value.getDate())
      .set('month', value.getMonth())
      .set('year', value.getFullYear());
    onChange(newDateTime);
  };

  const time = dateTime.format('HH:mm');
  const setTime = (value: string) => {
    const [hour, minute] = value.split(':').map(Number);
    const newDateTime = dateTime.set('hour', hour).set('minute', minute);
    onChange(newDateTime);
  };

  return (
    <div className="flex">
      <DatePicker
        value={date}
        onChange={setDate}
        locale={'en'}
        format="y-MM-dd"
      />
      <TimePicker time={time} setTime={setTime} />
    </div>
  );
};
