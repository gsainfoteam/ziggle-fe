import { Meta, StoryFn } from "@storybook/react";

// import colorSet from "src/styles/colorSet";
import Footer from "./Footer";

export default {
  title: "templates/footer/Footer",
  component: Footer,
} as Meta<typeof Footer>;

const Template: StoryFn<typeof Footer> = () => <Footer />;

export const Default = Template.bind({});
Default.args = {
  username: "crowntheking",
};
