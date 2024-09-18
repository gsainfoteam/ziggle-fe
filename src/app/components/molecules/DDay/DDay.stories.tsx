import { Meta, StoryFn } from '@storybook/react';
import dayjs from 'dayjs';

import { fallbackLng } from '@/app/i18next/settings';

import DDay from '.';

export default {
  title: 'molecules/DDay',
  component: DDay,
} as Meta<typeof DDay>;

const Template: StoryFn<typeof DDay> = (args) => {
  return <DDay {...args} lng={fallbackLng} />;
};

export const Today = Template.bind({});
Today.args = { deadline: dayjs() };

export const Yesterday = Template.bind({});
Yesterday.args = { deadline: dayjs().subtract(1, 'd') };

export const Tomorrow = Template.bind({});
Tomorrow.args = { deadline: dayjs().add(1, 'd') };
