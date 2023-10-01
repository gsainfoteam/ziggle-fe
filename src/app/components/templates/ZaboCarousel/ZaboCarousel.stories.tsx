import { StoryFn } from '@storybook/react';
import dayjs from 'dayjs';

import { useTranslation } from '@/app/i18next/client';

import ZaboCarousel from '.';

export default {
  title: 'temlates/ZaboCarousel',
  component: ZaboCarousel,
};

export const Default: StoryFn<typeof ZaboCarousel> = (args) => {
  const { t } = useTranslation();
  return <ZaboCarousel {...args} t={t} />;
};
Default.args = {
  notices: [
    {
      id: 1,
      thumbnailUrl: 'https://picsum.photos/200/300',
      title: '23년도 인포팀 신규 부원 모집',
      date: dayjs('2023-02-14T11:57:18.740Z'),
      views: 110,
      author: '이정우',
    },
    {
      id: 2,
      title: '23년도 인포팀 신규 부원 모집',
      content:
        '인포팀에서는 23년도 신규 부원을 모집합니다. 많은 지원 바랍니다.',
      date: dayjs('2023-02-14T11:57:18.740Z'),
      views: 110,
      author: '이정우',
    },
    {
      id: 3,
      thumbnailUrl: 'https://picsum.photos/400/300',
      title: '23년도 인포팀 신규 부원 모집',
      date: dayjs('2023-02-14T11:57:18.740Z'),
      views: 110,
      author: '이정우',
    },
    {
      id: 4,
      title: '23년도 인포팀 신규 부원 모집',
      content:
        '인포팀에서는 23년도 신규 부원을 모집합니다. 많은 지원 바랍니다.',
      date: dayjs('2023-02-14T11:57:18.740Z'),
      views: 110,
      author: '이정우',
    },
    {
      id: 5,
      thumbnailUrl: 'https://picsum.photos/200/100',
      title: '23년도 인포팀 신규 부원 모집',
      date: dayjs('2023-02-14T11:57:18.740Z'),
      views: 110,
      author: '이정우',
    },
    {
      id: 6,
      title: '23년도 인포팀 신규 부원 모집',
      content:
        '인포팀에서는 23년도 신규 부원을 모집합니다. 많은 지원 바랍니다.',
      date: dayjs('2023-02-14T11:57:18.740Z'),
      views: 110,
      author: '이정우',
    },
    {
      id: 7,
      thumbnailUrl: 'https://picsum.photos/200/300',
      title: '23년도 인포팀 신규 부원 모집',
      date: dayjs('2023-02-14T11:57:18.740Z'),
      views: 110,
      author: '이정우',
    },
    {
      id: 8,
      title: '23년도 인포팀 신규 부원 모집',
      content:
        '인포팀에서는 23년도 신규 부원을 모집합니다. 많은 지원 바랍니다.',
      date: dayjs('2023-02-14T11:57:18.740Z'),
      views: 110,
      author: '이정우',
    },
  ],
  height: 300,
};
