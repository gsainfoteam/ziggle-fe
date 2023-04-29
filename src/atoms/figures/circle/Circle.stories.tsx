import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import colorSet from "../../../styles/colorSet";
import Circle from "./Circle";

export default {
  title: "atoms/figures/circle/Circle",
  component: Circle,
} as ComponentMeta<typeof Circle>;

const Template: ComponentStory<typeof Circle> = (args) => <Circle {...args} />;

export const Default = Template.bind({});
Default.args = {
  diameter: "30px",
  background: colorSet.primary,
};
