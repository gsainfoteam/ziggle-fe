import { Meta, StoryFn } from "@storybook/react";

import ImageZabo from "./ImageZabo";

export default {
  title: "organisms/zabo/Zabo",
  component: ImageZabo,
} as Meta<typeof ImageZabo>;

const Template: StoryFn<typeof ImageZabo> = (args) => <ImageZabo {...args} />;

export const Default = Template.bind({});
Default.args = {
  thumbnailUrl: "https://picsum.photos/200/300",
  title: "23년도 인포팀 신규 부원 모집",
  date: "2023-02-14T11:57:18.740Z",
  viewCount: 110,
  author: "이정우",
  organization: "INFOTEAM",
  origin: "height",
  size: 300,
};
