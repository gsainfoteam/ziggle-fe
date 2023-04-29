import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import Chip, { ChipVariant } from "./Chip";

export default {
  title: "molecules/chip/Chip",
  component: Chip,
} as ComponentMeta<typeof Chip>;

const Template: ComponentStory<typeof Chip> = (args) => <Chip {...args} />;

export const Outlined = Template.bind({});
Outlined.args = {
  label: "🎯 모집",
  variant: ChipVariant.outlined,
};

export const Contained = Template.bind({});
Contained.args = {
  label: "🎯 모집",
  variant: ChipVariant.contained,
};
