import { Meta, StoryFn } from "@storybook/react";
import React from "react";

import { NoticeType } from "../../types/types";
import NoticeTypeRadio from "./NoticeTypeRadio";

export default {
  title: "molecules/noticeTypeRadio/NoticeTypeRadio",
  component: NoticeTypeRadio,
} as Meta<typeof NoticeTypeRadio>;

const Template: StoryFn<typeof NoticeTypeRadio> = (args) => {
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
