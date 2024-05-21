'use client';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import './DateTimePicker.css';

import dayjs from 'dayjs';
import React from 'react';
import { useState } from 'react';
import DatePicker from 'react-date-picker';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const DateTimePicker = () => {
  const [date, onDateChange] = useState<Value>(dayjs().toDate());

  return <DatePicker value={date} onChange={onDateChange} />;
};

export default DateTimePicker;
