import { Meta, StoryFn } from "@storybook/react";

import ImageRenderer from "./ImageRenderer";

export default {
  title: "atoms/imageRenderer/ImageRenderer",
  component: ImageRenderer,
} as Meta<typeof ImageRenderer>;

const Template: StoryFn<typeof ImageRenderer> = (args) => (
  <ImageRenderer {...args} />
);

export const Default = Template.bind({});
Default.args = {
  imageUrl: "https://picsum.photos/200/300",
  origin: "height",
  size: 400,
};
