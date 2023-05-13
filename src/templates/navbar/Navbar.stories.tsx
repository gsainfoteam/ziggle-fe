import { Meta, StoryFn } from "@storybook/react";

// import colorSet from "src/styles/colorSet";
import Navbar from "./Navbar";

export default {
  title: "templates/navbar/Navbar",
  component: Navbar,
} as Meta<typeof Navbar>;

const Template: StoryFn<typeof Navbar> = (args) => <Navbar {...args} />;

export const Default = Template.bind({});
Default.args = {
  username: "crowntheking",
};
