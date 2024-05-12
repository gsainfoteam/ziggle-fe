import { Meta, StoryFn } from '@storybook/react';
import dayjs from 'dayjs';

import DateTimePicker from './DateTimePicker';

export default {
  title: 'organisms/DateTimePicker',
  component: DateTimePicker,
} as Meta<typeof DateTimePicker>;

const Template: StoryFn<typeof DateTimePicker> = (args) => (
  <DateTimePicker {...args} />
);

export const Default = Template.bind({});
Default.args = {
  value: dayjs(),
};
