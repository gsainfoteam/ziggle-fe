import { Meta, StoryFn } from "@storybook/react";

import Text from "./Text";

export default {
  title: "atoms/text/Text",
  component: Text,
} as Meta<typeof Text>;

const Template: StoryFn<typeof Text> = (args) => <Text {...args} />;

export const Default = Template.bind({
  children: "Default",
});

Default.args = {
  children: "Default",
};
