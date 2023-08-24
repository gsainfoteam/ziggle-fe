import { Meta, StoryFn } from "@storybook/react";
import dummyZabos from "src/mock/dummy-zabos";

// import colorSet from "src/styles/colorSet";
import ZaboCarousel from "./ZaboCarousel";

export default {
  title: "templates/zaboCarousel/ZaboCarousel",
  component: ZaboCarousel,
} as Meta<typeof ZaboCarousel>;

const Template: StoryFn<typeof ZaboCarousel> = (args) => (
  <ZaboCarousel {...args} />
);

export const Default = Template.bind({});
Default.args = {
  carouselTitle: "🌟 마감임박",
  manyZabos: dummyZabos,
  //   carouselBGColor: colorSet.secondary,
};

export const NoZabos = Template.bind({});
NoZabos.args = {
  carouselTitle: "🌟 마감임박",
  manyZabos: [],
  //   carouselBGColor: colorSet.secondary,
};
