import { Meta, StoryFn } from "@storybook/react";

// import colorSet from "src/styles/colorSet";
import AcademicTable, { AcademicTableType } from "./AcademicTable";

export default {
  title: "templates/academicTable/AcademicTable",
  component: AcademicTable,
} as Meta<typeof AcademicTable>;

const Template: StoryFn<typeof AcademicTable> = (args) => (
  <AcademicTable {...args} />
);

export const DefaultRow = Template.bind({});
DefaultRow.args = {
  type: AcademicTableType.Default,
  title: "[학사]2023년 1학기 국가근로장학생(교내근로) 희망근로지 신청 안내 ",
  tags: ["납입금", "장학"],
  deadline: "2023.03.31",
  date: "2023.03.13",
};

export const TitleRow = Template.bind({});
TitleRow.args = {
  type: AcademicTableType.Title,
};
