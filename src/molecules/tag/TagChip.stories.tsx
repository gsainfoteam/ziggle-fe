import { Meta, StoryFn } from "@storybook/react";

import Tag from "./TagChip";

export default {
  title: "molecules/tag/Tag",
  component: Tag,
} as Meta<typeof Tag>;

const Template: StoryFn<typeof Tag> = (args) => <Tag {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: "Tag",
};
