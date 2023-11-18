import { StoryFn } from '@storybook/react';
import dayjs from 'dayjs';

import ZaboCarousel from '.';

export default {
  title: 'temlates/ZaboCarousel',
  component: ZaboCarousel,
};

export const Default: StoryFn<typeof ZaboCarousel> = (args) => (
  <ZaboCarousel {...args} />
);
Default.args = {
  notices: [
    {
      id: 1,
      imageUrl: 'https://picsum.photos/200/300',
      title: '23년도 인포팀 신규 부원 모집',
      createdAt: dayjs('2023-02-14T11:57:18.740Z'),
      views: 110,
      author: '이정우',
      body: '',
      tags: [],
    },
    {
      id: 2,
      title: '23년도 인포팀 신규 부원 모집',
      body: '인포팀에서는 23년도 신규 부원을 모집합니다. 많은 지원 바랍니다.',
      createdAt: dayjs('2023-02-14T11:57:18.740Z'),
      views: 110,
      author: '이정우',
      tags: [],
      imageUrl: null,
    },
    {
      id: 3,
      imageUrl: 'https://picsum.photos/400/300',
      title: '23년도 인포팀 신규 부원 모집',
      createdAt: dayjs('2023-02-14T11:57:18.740Z'),
      views: 110,
      author: '이정우',
      tags: [],
      body: '',
    },
    {
      id: 4,
      title: '23년도 인포팀 신규 부원 모집',
      body: '인포팀에서는 23년도 신규 부원을 모집합니다. 많은 지원 바랍니다.',
      createdAt: dayjs('2023-02-14T11:57:18.740Z'),
      views: 110,
      author: '이정우',
      tags: [],
      imageUrl: null,
    },
    {
      id: 5,
      imageUrl: 'https://picsum.photos/200/100',
      title: '23년도 인포팀 신규 부원 모집',
      createdAt: dayjs('2023-02-14T11:57:18.740Z'),
      views: 110,
      author: '이정우',
      tags: [],
      body: '',
    },
    {
      id: 6,
      title: '23년도 인포팀 신규 부원 모집',
      body: '인포팀에서는 23년도 신규 부원을 모집합니다. 많은 지원 바랍니다.',
      createdAt: dayjs('2023-02-14T11:57:18.740Z'),
      views: 110,
      author: '이정우',
      tags: [],
      imageUrl: null,
    },
    {
      id: 7,
      imageUrl: 'https://picsum.photos/200/300',
      title: '23년도 인포팀 신규 부원 모집',
      createdAt: dayjs('2023-02-14T11:57:18.740Z'),
      views: 110,
      author: '이정우',
      tags: [],
      body: '',
    },
    {
      id: 8,
      title: '23년도 인포팀 신규 부원 모집',
      body: '인포팀에서는 23년도 신규 부원을 모집합니다. 많은 지원 바랍니다.',
      createdAt: dayjs('2023-02-14T11:57:18.740Z'),
      views: 110,
      author: '이정우',
      tags: [],
      imageUrl: null,
    },
  ],
  height: 300,
};
