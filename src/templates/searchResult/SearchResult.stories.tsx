import { Meta, StoryFn } from "@storybook/react";

// import colorSet from "src/styles/colorSet";
import SearchResult from "./SearchResult";

export default {
  title: "templates/searchResult/SearchResult",
  component: SearchResult,
} as Meta<typeof SearchResult>;

const Template: StoryFn<typeof SearchResult> = (args) => (
  <SearchResult {...args} />
);

export const Default = Template.bind({});
Default.args = {};
