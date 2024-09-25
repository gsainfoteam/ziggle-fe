import '@/app/components/layout/initDayjs';

import { Meta, StoryFn } from '@storybook/react';
import dayjs from 'dayjs';

import { fallbackLng, Locale } from '@/app/i18next/settings';

import DDay from '.';

export default {
  title: 'shared/DDay',
  component: DDay,
} as Meta<typeof DDay>;

const Template: StoryFn<typeof DDay> = (args) => {
  return <DDay {...args} />;
};

const args = {
  deadline: dayjs(),
  lng: fallbackLng as Locale,
};

export const Today = Template.bind({});
Today.args = { ...args, deadline: dayjs() };

export const Yesterday = Template.bind({});
Yesterday.args = { ...args, deadline: dayjs().subtract(1, 'd') };

export const Tomorrow = Template.bind({});
Tomorrow.args = { ...args, deadline: dayjs().add(1, 'd') };
