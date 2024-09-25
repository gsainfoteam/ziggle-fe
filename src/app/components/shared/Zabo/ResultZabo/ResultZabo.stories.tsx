import '@/app/components/layout/initDayjs';

import { Meta, StoryFn } from '@storybook/react';
import dayjs from 'dayjs';

import { fallbackLng, Locale } from '@/app/i18next/settings';

import ResultZabo from './ResultZabo';

export default {
  title: 'shared/ResultZabo',
  component: ResultZabo,
} as Meta<typeof ResultZabo>;

const args = {
  id: 0,
  title: 'Title of the Result Zabo',
  deadline: dayjs().add(1, 'day'),
  currentDeadline: dayjs().add(1, 'day'),
  langs: ['ko'],
  content: 'This is the content of the Result Zabo. ',
  author: {
    name: 'Author',
    uuid: '2a7314f4-792e-47e9-abf5-41e584db0fb9',
  },
  createdAt: dayjs().subtract(1, 'day'),
  tags: ['tag1', 'tag2'],
  views: 314,
  imageUrls: [
    'https://picsum.photos/200/300',
    'https://picsum.photos/200/300',
    'https://picsum.photos/200/300',
    'https://picsum.photos/200/300',
    'https://picsum.photos/200/300',
  ],
  documentUrls: [],
  isReminded: true,
  reactions: [],
  lng: fallbackLng as Locale,
};

const Template: StoryFn<typeof ResultZabo> = (args) => <ResultZabo {...args} />;

export const Default = Template.bind({});
Default.args = { ...args };
