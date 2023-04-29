import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import Text from "./Text";

export default {
  title: "atoms/text/Text",
  component: Text,
} as ComponentMeta<typeof Text>;

const Template: ComponentStory<typeof Text> = (args) => <Text {...args} />;

export const Default = Template.bind({
  children: "Default",
});
