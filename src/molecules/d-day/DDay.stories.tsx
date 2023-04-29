import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import DDay from "./DDay";

export default {
  title: "molecules/d-day/DDay",
  component: DDay,
} as ComponentMeta<typeof DDay>;

const Template: ComponentStory<typeof DDay> = (args) => <DDay {...args} />;

export const Default = Template.bind({});
Default.args = {
  dayLeft: 7,
};
