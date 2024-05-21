'use client';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import './DateTimePicker.css';

import dayjs from 'dayjs';
import React from 'react';
import { useState } from 'react';
import DatePicker from 'react-date-picker';

import TimePicker from './TimePicker';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const DateTimePicker = () => {
  const [date, onDateChange] = useState<Value>(dayjs().toDate());

  return (
    <div className="flex">
      <DatePicker value={date} onChange={onDateChange} />
      <TimePicker />
    </div>
  );
};

export default DateTimePicker;
