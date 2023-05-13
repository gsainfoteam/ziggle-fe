import { Meta, StoryFn } from "@storybook/react";

import TextZabo from "./TextZabo";

export default {
  title: "organisms/zabo/TextZabo",
  component: TextZabo,
} as Meta<typeof TextZabo>;

const Template: StoryFn<typeof TextZabo> = (args) => <TextZabo {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: "맥북 프로 주인을 찾습니다.",
  content:
    "2월 11일쯤 해동에서 맥북 프로를 분실하신 분을 찾습니다. 24시간 넘게 안 가져가시길래 제가 일단 보관하기로 했고 이렇게 게시글 올립니다. 글 본 분들은 주변에 알려주시고 혹시나 주인분이 보신다면 01044445555로 연락 부탁드립니다.",
  date: "2023.02.13",
  viewCount: 119,
  author: "박시원",
  origin: "height",
  size: 400,
};
