import { Meta, StoryFn } from "@storybook/react";

import FilledArrowBtn, { HorizontalDirection } from "./FilledArrowBtn";

export default {
  title: "atoms/filledArrowBtn/FilledArrowBtn",
  component: FilledArrowBtn,
} as Meta<typeof FilledArrowBtn>;

const Template: StoryFn<typeof FilledArrowBtn> = (args) => (
  <FilledArrowBtn {...args} />
);

export const LeftPrimary = Template.bind({});
LeftPrimary.args = {
  direction: HorizontalDirection.LEFT,
  isPrimary: true,
};

export const LeftDeselected = Template.bind({});
LeftDeselected.args = {
  direction: HorizontalDirection.LEFT,
  isPrimary: false,
};

export const RightPrimary = Template.bind({});
RightPrimary.args = {
  direction: HorizontalDirection.RIGHT,
  isPrimary: true,
};

export const RightDeselected = Template.bind({});
RightDeselected.args = {
  direction: HorizontalDirection.RIGHT,
  isPrimary: false,
};
