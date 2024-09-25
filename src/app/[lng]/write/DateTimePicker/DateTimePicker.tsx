import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import './DateTimePicker.css';

import { Dayjs } from 'dayjs';
import React from 'react';
import DatePicker from 'react-date-picker';

import TimePicker from './TimePicker';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

interface DateTimePickerProps {
  dateTime: Dayjs;
  setDateTime: React.Dispatch<React.SetStateAction<Dayjs>>;
}

const DateTimePicker = ({ dateTime, setDateTime }: DateTimePickerProps) => {
  const date = dateTime.toDate();
  const setDate = (value: Value) => {
    if (!(value instanceof Date)) return;
    setDateTime((currentDateTime) => {
      return currentDateTime
        .set('date', value.getDate())
        .set('month', value.getMonth())
        .set('year', value.getFullYear());
    });
  };

  const time = dateTime.format('HH:mm');
  const setTime = (value: string) => {
    setDateTime((currentDateTime) => {
      const hour = parseInt(value.substring(0, 2));
      const minute = parseInt(value.substring(3, 5));
      return currentDateTime.set('hour', hour).set('minute', minute);
    });
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

export default DateTimePicker;
