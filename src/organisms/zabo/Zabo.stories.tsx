import { Meta, StoryFn } from "@storybook/react";

import Zabo from "./Zabo";

export default {
  title: "organisms/zabo/Zabo",
  component: Zabo,
} as Meta<typeof Zabo>;

const Template: StoryFn<typeof Zabo> = (args) => <Zabo {...args} />;

export const Default = Template.bind({});
Default.args = {
  thumbnailUrl: "https://picsum.photos/200/300",
  title: "23년도 인포팀 신규 부원 모집",
  date: "2023.02.13",
  viewCount: 110,
  author: "이정우",
  organization: "INFOTEAM",
};
