import { Meta, StoryFn } from '@storybook/react';

import DateTimePicker from './DateTimePicker';

export default {
  title: 'organisms/DateTimePicker',
  component: DateTimePicker,
} as Meta<typeof DateTimePicker>;

const Template: StoryFn<typeof DateTimePicker> = () => <DateTimePicker />;

export const Default = Template.bind({});
