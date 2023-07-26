import { Meta, StoryFn } from "@storybook/react";

import SearchBar from "./SearchBar";

export default {
  title: "molecules/searchBar/SearchBar",
  component: SearchBar,
} as Meta<typeof SearchBar>;

const Template: StoryFn<typeof SearchBar> = (args) => <SearchBar {...args} />;

export const Default = Template.bind({});
Default.args = {
  placeholder: "공지 제목이나 태그로 검색",
};
