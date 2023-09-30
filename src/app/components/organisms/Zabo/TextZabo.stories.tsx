import { Meta, StoryFn } from '@storybook/react';
import dayjs from 'dayjs';

import TextZabo from './TextZabo';
import { useTranslation } from '@/app/i18next/client';

export default {
  title: 'organisms/zabo/TextZabo',
  component: TextZabo,
} as Meta<typeof TextZabo>;

const Template: StoryFn<typeof TextZabo> = (args) => {
  const { t } = useTranslation();
  return <TextZabo {...args} t={t} />;
};

const args = {
  title: '23년도 인포팀 신규 부원 모집',
  content: '인포팀에서는 23년도 신규 부원을 모집합니다. 많은 지원 바랍니다.',
  date: dayjs('2023-02-14T11:57:18.740Z'),
  views: 110,
  author: '이정우',
  // organization: "INFOTEAM",
};

export const Height = Template.bind({});
Height.args = { ...args, height: 300 };

export const Width = Template.bind({});
Width.args = { ...args, width: 300 };
