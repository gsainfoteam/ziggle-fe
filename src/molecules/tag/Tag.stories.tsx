import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import Tag from "./Tag";

export default {
  title: "molecules/tag/Tag",
  component: Tag,
} as ComponentMeta<typeof Tag>;

const Template: ComponentStory<typeof Tag> = (args) => <Tag {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: "Tag",
};
