import { Meta, StoryFn } from "@storybook/react";

import Input from "./Input";

export default {
  title: "atoms/input/Input",
  component: Input,
} as Meta<typeof Input>;

const Template: StoryFn<typeof Input> = (args) => <Input {...args} />;

export const Default = Template.bind({});
