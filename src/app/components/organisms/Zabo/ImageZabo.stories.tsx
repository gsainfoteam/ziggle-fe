import { Meta, StoryFn } from '@storybook/react';
import dayjs from 'dayjs';

import { useTranslation } from '@/app/i18next/client';
import { fallbackLng } from '@/app/i18next/settings';

import Zabo from '.';

export default {
  title: 'organisms/zabo/ImageZabo',
  component: Zabo,
} as Meta<typeof Zabo>;

const Template: StoryFn<typeof Zabo> = (args) => {
  const { t } = useTranslation(fallbackLng);
  return <Zabo {...args} t={t} />;
};
const args = {
  imageUrls: ['https://picsum.photos/200/300'],
  title: '23년도 인포팀 신규 부원 모집',
  content: '인포팀에서는 23년도 신규 부원을 모집합니다. 많은 지원 바랍니다.',
  createdAt: '2023-02-14T11:57:18.740Z',
  views: 110,
  author: { name: '인포팀', uuid: 'info' },
  deadline: dayjs().add(1, 'd'),
  reactions: [
    { emoji: '🔥', count: 10, isReacted: false },
    { emoji: '😭', count: 5, isReacted: true },
    { emoji: '😧', count: 2, isReacted: false },
    { emoji: '🤔', count: 1, isReacted: false },
    { emoji: '😮', count: 0, isReacted: false },
  ],
};

export const Height = Template.bind({});
Height.args = { ...args, height: 300 };

export const Width = Template.bind({});
Width.args = { ...args, width: 300 };
