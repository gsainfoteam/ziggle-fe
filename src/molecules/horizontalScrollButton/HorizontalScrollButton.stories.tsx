import { Meta, StoryFn } from "@storybook/react";

import HorizontalScrollButton from "./HorizontalScrollButton";

export default {
  title: "molecules/horizontalScrollButton/HorizontalScrollButton",
  component: HorizontalScrollButton,
} as Meta<typeof HorizontalScrollButton>;

const Template: StoryFn<typeof HorizontalScrollButton> = (args) => (
  <HorizontalScrollButton {...args}>
    <HorizontalScrollButton.Left disabled />
    <HorizontalScrollButton.Right />
  </HorizontalScrollButton>
);

export const Default = Template.bind({});
