import { Meta, StoryFn } from '@storybook/react';
import dummyTags from 'src/mock/dummy-tags';

// import colorSet from "src/styles/colorSet";
import SearchResultImage from './SearchResultImage';

export default {
  title: 'templates/searchResult/SearchResult',
  component: SearchResultImage,
} as Meta<typeof SearchResultImage>;

const Template: StoryFn<typeof SearchResultImage> = (args) => (
  <SearchResultImage {...args} />
);

export const Default = Template.bind({});
Default.args = {
  deadline: '2023.02.28',
  title: '인포팀 신규 부원 모집',
  author: '이정우',
  tags: dummyTags,
  date: '2023.02.13',
  viewCount: 123,
  thumbnailUrl: 'https://picsum.photos/2000/3000',
  searchQuery: '이',
};
