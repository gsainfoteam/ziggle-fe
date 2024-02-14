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
      title: '인포팀 신규 부원 모집',
      deadline: dayjs('2023-02-14T11:57:18.740Z'),
      currentDeadline: null,
      imageUrls: ['https://picsum.photos/200/300'],
      documentUrls: [],
      langs: ['ko'],
      content:
        '인포팀에서는 23년도 신규 부원을 모집합니다. 많은 지원 바랍니다.',
      createdAt: dayjs('2023-02-14T11:57:18.740Z'),
      views: 110,
      author: { name: '인포팀', uuid: 'info' },
      tags: [],
      isReminded: false,
      reactions: [],
    },
  ],
  height: 300,
};
