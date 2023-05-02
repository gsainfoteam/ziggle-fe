import { Meta, StoryFn } from "@storybook/react";

import Search from "./Search";

export default {
  title: "molecules/search/Search",
  component: Search,
} as Meta<typeof Search>;

const Template: StoryFn<typeof Search> = (args) => <Search {...args} />;

export const Default = Template.bind({});
Default.args = {
  placeholder: "공지 제목이나 태그로 검색",
};
