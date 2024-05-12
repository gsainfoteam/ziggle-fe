// has same features, but this is a regular picker

import dayjs from 'dayjs';
import React, { useState } from 'react';

interface CalendarNoCustomProps {
  value?: dayjs.Dayjs;
  onChange: React.EventHandler<any>;
}

const CalendarNoCustom = ({ value, onChange }: CalendarNoCustomProps) => {
  return (
    <div className="radius-[7px] border border-solid border-primary bg-white">
      <input
        className="bg-transparent"
        type="datetime-local"
        name="datetime-noCustom"
        value={value ? dayjs(value).format('YYYY-MM-DDThh:mm:ss') : undefined}
        onChange={onChange}
      />
    </div>
  );
};

export default CalendarNoCustom;
