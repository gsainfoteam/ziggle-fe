import { Meta, StoryFn } from "@storybook/react";

import HighlightedText from ".";

export default {
  title: "molecules/HilightedText",
  component: HighlightedText,
} as Meta<typeof HighlightedText>;

export const Default: StoryFn<typeof HighlightedText> = (args) => {
  return <HighlightedText {...args} />;
};

Default.args = {
  children: "헬로우 월드",
  query: "월드",
};
