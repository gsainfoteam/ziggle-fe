import { Meta, StoryFn } from "@storybook/react";
import dummyTags from "src/mock/dummy-tags";

// import colorSet from "src/styles/colorSet";
import SearchResultText from "./SearchResultText";

export default {
  title: "templates/searchResult/SearchResultText",
  component: SearchResultText,
} as Meta<typeof SearchResultText>;

const Template: StoryFn<typeof SearchResultText> = (args) => (
  <SearchResultText {...args} />
);

export const Default = Template.bind({});
Default.args = {
  deadline: "2023.02.28",
  title: "인포팀 신규 부원 모집",
  author: "이정우",
  tags: dummyTags,
  date: "2023.02.13",
  viewCount: 123,
  content:
    "안녕하세요, 하우스연합회입니다. 2023년 3월 1일, 하우스연합회에서 중고장터를 진행합니다❗퇴사자, 잔류자, 신입생 상관없이 판매 물품/무료나눔하고자하는 물품이 있으시다면 자유롭게 등록해주시기 바랍니다! 자세한 일정은 다음...",
  searchQuery: "이",
};
