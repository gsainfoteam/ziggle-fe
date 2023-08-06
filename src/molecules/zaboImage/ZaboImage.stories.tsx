import { Meta, StoryFn } from "@storybook/react";

import ZaboImage from "./ZaboImage";

export default {
  title: "molecules/zaboImage/ZaboImage",
  component: ZaboImage,
} as Meta<typeof ZaboImage>;

const Template: StoryFn<typeof ZaboImage> = (args) => <ZaboImage {...args} />;

export const Default = Template.bind({});
Default.args = {
  src: "https://picsum.photos/2000/000",
  origin: "height",
  size: 300,
  isHover: false,
};
