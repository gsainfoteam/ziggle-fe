import { Meta, StoryFn } from "@storybook/react";

import Chip, { ChipVariant } from "./Chip";

export default {
  title: "molecules/chip/Chip",
  component: Chip,
} as Meta<typeof Chip>;

const Template: StoryFn<typeof Chip> = (args) => <Chip {...args} />;

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
