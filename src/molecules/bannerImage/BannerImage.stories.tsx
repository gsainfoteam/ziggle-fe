import { Meta, StoryFn } from "@storybook/react";
import dummyBanners from "src/mock/dummy-banners";

import BannerImage from "./BannerImage";

export default {
  title: "molecules/bannerImage/BannerImage",
  component: BannerImage,
} as Meta<typeof BannerImage>;

const Template: StoryFn<typeof BannerImage> = (args) => (
  <BannerImage {...args} />
);

export const Default = Template.bind({});
Default.args = {
  src: dummyBanners[0].imageUrl,
  objectPosition: dummyBanners[0].objectPosition,
};
