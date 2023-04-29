import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import Button from "./Button";

export default {
  title: "atoms/button/Button",
  component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Default = Template.bind({});

Default.args = {
  children: "Button",
};

export const Outlined = Template.bind({});
Outlined.args = {
  children: "Button",
  variant: "outlined",
};

export const Contained = Template.bind({});
Contained.args = {
  children: "Button",
  variant: "contained",
};
