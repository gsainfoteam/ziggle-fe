import { Meta, StoryFn } from '@storybook/react';
import dayjs, { Dayjs } from 'dayjs';
import { useState } from 'react';

import DateTimePicker from './DateTimePicker';

export default {
  title: 'organisms/DateTimePicker',
  component: DateTimePicker,
} as Meta<typeof DateTimePicker>;

const Template: StoryFn<typeof DateTimePicker> = () => {
  const [dateTime, setDateTime] = useState<Dayjs>(dayjs());

  return <DateTimePicker dateTime={dateTime} setDateTime={setDateTime} />;
};

export const Default = Template.bind({});
