import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import Search from "./Search";

export default {
  title: "molecules/search/Search",
  component: Search,
} as ComponentMeta<typeof Search>;

const Template: ComponentStory<typeof Search> = (args) => <Search {...args} />;

export const Default = Template.bind({});
Default.args = {
  placeholder: "공지 제목이나 태그로 검색",
};
