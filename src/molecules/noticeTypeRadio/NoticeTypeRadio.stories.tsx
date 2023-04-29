import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import { NoticeType } from "../../types/types";
import NoticeTypeRadio from "./NoticeTypeRadio";

export default {
  title: "molecules/noticeTypeRadio/NoticeTypeRadio",
  component: NoticeTypeRadio,
} as ComponentMeta<typeof NoticeTypeRadio>;

const Template: ComponentStory<typeof NoticeTypeRadio> = (args) => {
  const [selected, setSelected] = React.useState<NoticeType>(
    NoticeType.RECRUIT,
  );

  return (
    <NoticeTypeRadio
      {...args}
      selected={selected}
      onChange={(type: NoticeType) => setSelected(type)}
    />
  );
};

export const Default = Template.bind({});
