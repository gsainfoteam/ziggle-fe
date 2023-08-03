import { Meta, StoryFn } from "@storybook/react";
import Text from "src/atoms/text/Text";
import colorSet from "src/styles/colorSet";
import Font from "src/styles/font";

import CheckboxWithLabel from "./CheckboxWithLabel";

export default {
  title: "molecules/checkboxWithLabel/CheckboxWithLabel",
  component: CheckboxWithLabel,
} as Meta<typeof CheckboxWithLabel>;

const Template: StoryFn<typeof CheckboxWithLabel> = (args) => (
  <CheckboxWithLabel {...args} />
);

export const Default = Template.bind({});
Default.args = {
  id: "checkbox1",
  checked: false,
  onChange: () => {
    console.log("changed");
  },
  children: (
    <Text font={Font.Medium} size={"1.125rem"} color={colorSet.primary}>
      {"리마인드 되었습니다!"}
    </Text>
  ),
};
