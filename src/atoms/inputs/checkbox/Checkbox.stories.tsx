import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import Checkbox from "./Checkbox";

export default {
  title: "atoms/inputs/checkbox/Checkbox",
  component: Checkbox,
} as ComponentMeta<typeof Checkbox>;

const Template: ComponentStory<typeof Checkbox> = (args) => {
  const [checked, setChecked] = React.useState(false);

  return (
    <Checkbox
      {...args}
      checked={checked}
      onChange={(event) => setChecked(event.target.checked)}
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  label: "Checkbox",
};
