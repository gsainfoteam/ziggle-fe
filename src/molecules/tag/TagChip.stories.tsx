import { Meta, StoryFn } from "@storybook/react";

import TagChip from "./TagChip";

export default {
  title: "molecules/tag/Tag",
  component: TagChip,
} as Meta<typeof TagChip>;

const Template: StoryFn<typeof TagChip> = (args) => <TagChip {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: "Tag",
};
