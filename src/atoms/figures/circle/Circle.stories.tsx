import { Meta, StoryFn } from "@storybook/react";

import colorSet from "../../../styles/colorSet";
import Circle from "./Circle";

export default {
  title: "atoms/figures/circle/Circle",
  component: Circle,
} as Meta<typeof Circle>;

const Template: StoryFn<typeof Circle> = (args) => <Circle {...args} />;

export const Default = Template.bind({});
Default.args = {
  diameter: "30px",
  background: colorSet.primary,
};
