import { Meta, StoryFn } from "@storybook/react";

import DDay from "./DDay";

export default {
  title: "molecules/d-day/DDay",
  component: DDay,
} as Meta<typeof DDay>;

const Template: StoryFn<typeof DDay> = (args) => <DDay {...args} />;

export const Default = Template.bind({});
Default.args = {
  deadline: "2023-09-01T00:00:00.000Z",
};
