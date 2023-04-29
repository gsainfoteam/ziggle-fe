import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import HorizontalScrollButton from "./HorizontalScrollButton";

export default {
  title: "molecules/horizontalScrollButton/HorizontalScrollButton",
  component: HorizontalScrollButton,
} as ComponentMeta<typeof HorizontalScrollButton>;

const Template: ComponentStory<typeof HorizontalScrollButton> = (args) => (
  <HorizontalScrollButton {...args}>
    <HorizontalScrollButton.Left disabled />
    <HorizontalScrollButton.Right />
  </HorizontalScrollButton>
);

export const Default = Template.bind({});
