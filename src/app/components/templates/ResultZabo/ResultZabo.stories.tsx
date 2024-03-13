import { Meta, StoryFn } from '@storybook/react';
import dayjs from 'dayjs';

import ResultZabo from './ResultZabo';

export default {
  title: 'templates/ResultZabo/ResultZabo',
  component: ResultZabo,
} as Meta<typeof ResultZabo>;

const Template: StoryFn<typeof ResultZabo> = (args) => <ResultZabo {...args} />;

export const Default = Template.bind({});
Default.args = {
  imageUrls: ['https://picsum.photos/200/300'],
  title: '23년도 인포팀 신규 부원 모집',
  content: '인포팀에서는 23년도 신규 부원을 모집합니다. 많은 지원 바랍니다.',
  createdAt: '2023-02-14T11:57:18.740Z',
  views: 110,
  author: { name: '인포팀', uuid: 'info' },
  deadline: dayjs().add(1, 'd'),
};
