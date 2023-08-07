import { Meta, StoryFn } from "@storybook/react";

import Image from "./Image";

export default {
  title: "atoms/image/Image",
  component: Image,
} as Meta<typeof Image>;

const Template: StoryFn<typeof Image> = (args) => <Image {...args} />;

export const Default = Template.bind({});
Default.args = {
  src: "https://picsum.photos/1000",
  width: 200,
  height: 300,
};
