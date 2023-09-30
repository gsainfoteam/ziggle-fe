import { Meta, StoryFn } from '@storybook/react';
import dayjs from 'dayjs';

import { useTranslation } from '@/app/i18next/client';

import ImageZabo from './ImageZabo';

export default {
  title: 'organisms/zabo/ImageZabo',
  component: ImageZabo,
} as Meta<typeof ImageZabo>;

const Template: StoryFn<typeof ImageZabo> = (args) => {
  const { t } = useTranslation();
  return <ImageZabo {...args} t={t} />;
};
const args = {
  thumbnailUrl: 'https://picsum.photos/200/300',
  title: '23년도 인포팀 신규 부원 모집',
  content: '인포팀에서는 23년도 신규 부원을 모집합니다. 많은 지원 바랍니다.',
  date: dayjs('2023-02-14T11:57:18.740Z'),
  views: 110,
  author: '이정우',
};

export const Height = Template.bind({});
Height.args = { ...args, height: 300 };

export const Width = Template.bind({});
Width.args = { ...args, width: 300 };
