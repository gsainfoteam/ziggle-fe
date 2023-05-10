import { Meta, StoryFn } from "@storybook/react";

import TagSelect from "./TagSelect";

export default {
  title: "organisms/tagSelect/TagSelect",
  component: TagSelect,
} as Meta<typeof TagSelect>;

const Template: StoryFn<typeof TagSelect> = (args) => <TagSelect {...args} />;

export const Default = Template.bind({});
Default.args = {
  tags: ["태그1", "태그2", "태그3"],
};
